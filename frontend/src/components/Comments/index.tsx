import { response } from 'express'
import React, { useState } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import './style.css'

interface IComment {
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
  // const [allComments, setAllComments] = useState<IComment[]>([])
  // const [newComments, setNewComments] = useState<IComment[]>([])
  const [page, setPage] = React.useState(1);
  // const [prevId, setPrevId] = useState()


  /* структурирование комментариев */
  const nestComments = (commentList: IComment[]) => {
    const commentMap: any = {}
    commentList.forEach(
      (comment: IComment) => (commentMap[comment.id] = comment)
    ) //записываем все комментарии в commentMap


    function findTheSame ({comment}: IComment) {

      for (let i = 0; i < commentList.length; i++) {
        // console.log(455, commentList[i])
        for (let j = 0; j < commentList[i].children?.length!; j++) {
        // console.log(455, commentList[i].children)
          for (let k = j; k < commentList[i].children?.length!; k++) {
              // if (commentList[i].children?[j].id === commentList[i].children?[k].id) {
              if (commentList[i].children![j].id === commentList[i].children![k].id) {
                commentList[i].children![k].id = ''
                console.log('BINGOOOOOO', commentList[i].children![j].id)
                return true
              }
          }
        }
      }
        // if (comment.children) {
        // console.log(455, commentList[i])
        // for (let j = 0; j < comment.children?.length; j++) {
        // console.log(455, commentList[i].children)
          // for (let k = j; k < comment.children?.length; k++) {
          //     // if (commentList[i].children?[j].id === commentList[i].children?[k].id) {
          //     if (comment.children[j].id === comment.children[k].id) {
          //       console.log('BINGOOOOOO', comment.children[j].id)
          //       return true
          //     }
          // }
        // }
      // }
      return false
    }

    commentList.forEach((comment: IComment) => {
    // console.log('FIRST', commentList)

      // if (comment.parentId !== null && !comment.children?.includes(comment)) {
      if (comment.parentId !== null && !comment.children?.includes(comment)) {
        // console.log(1111111111111, commentMap[comment.parentId], 22222222, comment)
        const parent: any = commentMap[comment.parentId];
        /////
        // if (findTheSame(comment) !== true)
        // if (comment.children?.includes(comment))
          (parent.children = parent.children || []).push(comment)
        
        // console.log(455, parent.children)

      }
    })

        // console.log('SECOND', commentList)

    // console.log(
    //   commentList.filter((comment: any) => {
    //     return comment.parentId === null
    //   })
    // )
    
    // for (let i = 0; i < commentList.length; i++) {
    //   // console.log(455, commentList[i])
    //   for (let j = 0; j < commentList[i].children?.length!; j++) {
    //   // console.log(455, commentList[i].children)
    //     for (let k = j; k < commentList[i].children?.length!; k++) {
    //         // if (commentList[i].children?[j].id === commentList[i].children?[k].id) {
    //         if (commentList[i].children![j].id === commentList[i].children![k].id) {
    //           console.log(77777, commentList[i].children![j].id)
    //           // commentList[i].children![k].id = ''
    //             // commentList[i].children!.splice(j, 1)
    //             // delete commentList[i].children![j]


    //         }
    //     }
    //   }
    // }

    // commentList.filter((comment: IComment) => {
    //   // if (comment.children) {
    //    return comment.children?.filter((child) => {
    //         return comment.children?.includes(child)
    //     })
    //   // }
    // })

    return commentList.filter((comment: IComment) => {
      //возвращаем только те комментарии, в которых ParentId === null 
      //(коментарии, у которых ParentId !== null , перекочевали во вложенный массив children)
      return comment.parentId === null
    })
  }

  /* хук подгрузки коментариев */
  // const useComments = () => {
  //   return useInfiniteQuery(
  //     'COMMENTS',
  //     async ({ pageParam = 0 }) => {
  //       const response = await fetch('/comments?cursor=' + pageParam).then((response: any) =>
  //         response.json()
  //       )
  //       setNewComments(nestComments(response.comments)) // запись структурированых данных
  //       setAllComments([...allComments, ...newComments])
  //       setPrevId(response.previousId)
  //       return newComments
  //     },
  //     {
  //       // getPreviousPageParam: (firstPage: any) => firstPage.previousId ?? false,
  //       // getNextPageParam: (lastPage: any) => lastPage.nextId ?? false,
  //     }
  //     // { enabled: false, refetchOnWindowFocus: false, retry: 3 }
  //   )
  // }


    // const getComments = async ({ pageParam = 0 }) => {
    //   const response = await fetch('/comments?cursor=' + pageParam).then((response: any) =>
    //     response.json()
    //   )
    //   setNewComments(nestComments(response.comments)) // запись структурированых данных
    //   setAllComments([...allComments, ...newComments])
    //   setPrevId(response.nextCursor)
    //   return newComments
    // }

    const getComm = async({ pageParam = 1 }) => { 
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
    status } = useInfiniteQuery('COMMENTS', getComm,
        {
          getNextPageParam: (lastPage: any, pages) => {
            return page + 1
        }
      }
        // { enabled: false, refetchOnWindowFocus: false, retry: 3 }
      )


  // const query = useComments()

  /* подгрузка комментариев при первичном рендеринге */
  // window.onload = () => {
  //   // query.refetch()
  //   fetch('/comments')
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setAllComments(nestComments(response.comments))
  //     })
  // }

  const handleClick = () => {
    setPage(page + 1);
    fetchNextPage()
  }

  /* вывод отдельного комментария */
  function Comment({ comment, isChildren }: any) {
    const nestedComments = (comment.children || []).map((comment: IComment) => {
      // if (comment.children?.length! > 0) {
      //   // console.log(comment.children![1].id)
      //   for (let i = 0; i < comment.children?.length!; i++) {
      //     // console.log(455, commentList[i])
      //     for (let j = i; j < comment.children?.length!; j++) {
      //     // console.log(455, commentList[i].children)
      //       if (comment.children![i].id === comment.children![j].id) {
      //         console.log('ididid', comment.children![i].id)
      //         return null;
      //       }
      //     }
      //   }
      // }
      return <Comment key={comment.id} comment={comment} isChildren={true} />
    })

    return (
      <div
        className={
          'comment content is-small' + (isChildren ? ' isChildren' : '')
        }
      >
        <div className="user">{comment.user}</div>
        <div className="text">{comment.text}</div>
        {/* <div>{prevId}</div>  */}

        {nestedComments}
      </div>
    )
  }


  console.log(data, ' - DATA ',data?.pages[0].comments, ' - COMMENTS')
  // console.log(data?.pages[2], 'dddd')
  // console.log(data?.pages[3], 'dddd')
  // console.log(data?.pages[4], 'dddd')
  // console.log(data?.pages, 'dddd')



  // console.log(data?.pages, 'dddd')

// function ddd () {
//   const t = data?.pages.map
// }


  return (
    <>
      {isError && <div>Ошибка загрузки данных!</div>}
      {isLoading ? (
        <div>Загрузка данных...</div>
      ) : (
        <div>
        {
          data?.pages.map((page, i) => {
          //  console.log(page.comments, 'pageeeeee', i)
            // nestComments(page.comments)
            return nestComments( page.comments).map((comment: any, i) => {
              // console.log(comment, '12121212')
            //   if (comment.children?.length! > 0) {
            //   // console.log(comment.children![1].id)
            //   for (let i = 0; i < comment.children?.length!; i++) {
            //     // console.log(455, commentList[i])
            //     for (let j = i; j < comment.children?.length!; j++) {
            //     // console.log(455, commentList[i].children)
            //       if (comment.children![i].id === comment.children![j].id) {
            //         console.log('ididid', comment.children![i].id)
            //         // comment.children!.splice(j, 1)
            //       }
            //     }
            //   }
            // }

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
        //   <div>
        //   {
        //     data?.pages.map((comment: IComment) => {
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
        // <div>
          
        //   {
        //     /* вывод дерева комментариев */
        //     // allComments.map((comment: IComment) => {
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
