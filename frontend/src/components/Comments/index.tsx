import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { Comment } from './Comment'
import './style.css'

export interface IComment {
  id: string
  parentId: string
  children?: IComment[]
  user: string
  text: string
  comment: IComment
}

// interface ICommentObj {
//   comment: IComment
  // isChildren: boolean /* если true, то добавляется отступ margin-left к стилю комментария */
// }

export const Comments: React.FC = () => {
const [allComments, setAllComments] = useState<IComment[]>([])
const [newComments, setNewComments] = useState<IComment[]>([])

const [page, setPage] = React.useState(1);



  /* структурирование комментариев */
  const nestedComments = (commentsArray: any) => {
    const map = Object.create(null);
    commentsArray.forEach((comment: any) => map[comment.id] = {...comment, children: []});
    const nestedComments: any = [];
    commentsArray.forEach((comment: any) => {
      if(comment.parentId) map[comment.parentId].children.push(map[comment.id])
      else nestedComments.push(map[comment.id])
    });
    return nestedComments;
  }




    const getComments = async({ pageParam = 0 }) => { 
      const response = await fetch('/comments?cursor=' + pageParam).then((response: any) =>
      response.json()
    )
    return response
    }

  const {     
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    status } = useInfiniteQuery('COMMENTS', getComments,
        {
          getNextPageParam: (lastPage: any, pages) => {
            console.log(lastPage)
            return page + 1
        }
      }
        // { enabled: false, refetchOnWindowFocus: false, retry: 3 }
      )




  const handleClick = () => {
    setPage(page + 1);
    fetchNextPage()
    // data?.pages.forEach((page, i) => {
    //   setNewComments (nestComments( page.comments))       //II вариант
    //   setAllComments( [...allComments, ...newComments] )  
    // })
    // console.log('1000232323232323233',allComments)
  }



  // console.log(data, ' - DATA ',data?.pages[0].comments, ' - COMMENTS')
  // console.log(data?.pages[2], 'dddd')
  // console.log(data?.pages[3], 'dddd')
  // console.log(data?.pages[4], 'dddd')
  // console.log(data?.pages, 'dddd')

// function ddd() {
  // data?.pages.map((page, i) => {
  // })
// }


  return (
    <>
      {isError && <div>Ошибка загрузки данных!</div>}
      {isLoading ? (
        <div>Загрузка данных...</div>
      ) : (
        /* вывод дерева комментариев - I вариант => */
        <div>
        {
          data?.pages.map((page, i) => {
          //  console.log(page.comments, 'pageeeeee', i)
            // nestComments(page.comments)
            return nestedComments( page.comments).map((comment: any) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  isChildren={false}
                />)
              })
          })
        }
      </div>
        /* <= вывод дерева комментариев - I вариант */

          
        /* вывод дерева комментариев - II вариант => */
        // <div>
        //   {
        //     allComments.map((comment: IComment) => {
        //       return (
        //         <Comment
        //           key={comment.id}
        //           comment={comment}
        //           isChildren={false}
        //         />
        //       )
        //     })
        //   }
        // </div>
        /* <= вывод дерева комментариев - II вариант */

      )}
      <button
        className={
          'button is-normall is-primary is-light is-fullwidth' +
          (isLoading ? ' is-loading' : '')
        }
        onClick={handleClick}
      >
        Загрузить еще...
      </button>
    </>
  )
































  // return (
  //   <>
  //     {isError ? (
  //       <div>Ошибка загрузки данных!</div>
  //     ) : !isLoading ? (
  //       <div>
  //         {
  //           /* вывод дерева комментариев */
  //           data?.pages.map((page: any) => {
  //             return nestComments( page.comments).map((comment: any) => {
  //               return <Comment key={comment.id} comment={comment} />

  //             })
  //           })
  //         }
  //       </div>
  //     ) : (
  //       <div>Загрузка данных...</div>
  //     )}
  //     <button
  //       className={
  //         'button is-normall is-primary is-light is-fullwidth' +
  //         (isLoading ? ' is-loading' : '')
  //       }
  //       onClick={handleClick}
  //     >
  //       Загрузить еще...
  //     </button>
  //   </>
  // )
}







///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////


// const nestComments = (commentList: IComment[]) => {
//   const commentMap: any = {}
//   commentList.forEach(
//     (comment: IComment) => (commentMap[comment.id] = comment)
//   ) //записываем все комментарии в commentMap


//   function findTheSame ({comment}: IComment) {

//     for (let i = 0; i < commentList.length; i++) {
//       // console.log(455, commentList[i])
//       for (let j = 0; j < commentList[i].children?.length!; j++) {
//       // console.log(455, commentList[i].children)
//         for (let k = j; k < commentList[i].children?.length!; k++) {
//             // if (commentList[i].children?[j].id === commentList[i].children?[k].id) {
//             if (commentList[i].children![j].id === commentList[i].children![k].id) {
//               commentList[i].children![k].id = ''
//               console.log('BINGOOOOOO', commentList[i].children![j].id)
//               return true
//             }
//         }
//       }
//     }
//       // if (comment.children) {
//       // console.log(455, commentList[i])
//       // for (let j = 0; j < comment.children?.length; j++) {
//       // console.log(455, commentList[i].children)
//         // for (let k = j; k < comment.children?.length; k++) {
//         //     // if (commentList[i].children?[j].id === commentList[i].children?[k].id) {
//         //     if (comment.children[j].id === comment.children[k].id) {
//         //       console.log('BINGOOOOOO', comment.children[j].id)
//         //       return true
//         //     }
//         // }
//       // }
//     // }
//     return false
//   }

//   commentList.forEach((comment: IComment) => {
//   // console.log('FIRST', commentList)

//     // if (comment.parentId !== null && !comment.children?.includes(comment)) {
//     if (comment.parentId !== null && !comment.children?.includes(comment)) {
//       // console.log(1111111111111, commentMap[comment.parentId], 22222222, comment)
//       const parent: any = commentMap[comment.parentId];
//       /////
//       // if (findTheSame(comment) !== true)
//       // if (comment.children?.includes(comment))
//         (parent.children = parent.children || []).push(comment)
      
//       // console.log(455, parent.children)

//     }
//   })

//       // console.log('SECOND', commentList)

//   // console.log(
//   //   commentList.filter((comment: any) => {
//   //     return comment.parentId === null
//   //   })
//   // )
  
//   // for (let i = 0; i < commentList.length; i++) {
//   //   // console.log(455, commentList[i])
//   //   for (let j = 0; j < commentList[i].children?.length!; j++) {
//   //   // console.log(455, commentList[i].children)
//   //     for (let k = j; k < commentList[i].children?.length!; k++) {
//   //         // if (commentList[i].children?[j].id === commentList[i].children?[k].id) {
//   //         if (commentList[i].children![j].id === commentList[i].children![k].id) {
//   //           console.log(77777, commentList[i].children![j].id)
//   //           commentList[i].children!.splice(j, 1)
//   //           // commentList[i].children![k].id = ''
//   //             // commentList[i].children!.splice(j, 1)
//   //             // delete commentList[i].children![j]


//   //         }
//   //     }
//   //   }
//   // }

//   // commentList.filter((comment: IComment) => {
//   //   // if (comment.children) {
//   //    return comment.children?.filter((child) => {
//   //         return comment.children?.includes(child)
//   //     })
//   //   // }
//   // })

//   return commentList.filter((comment: IComment) => {
//     //возвращаем только те комментарии, в которых ParentId === null 
//     //(коментарии, у которых ParentId !== null , перекочевали во вложенный массив children)
//     return comment.parentId === null
//   })
// }