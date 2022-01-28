import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { Comment } from './Comment'
import './style.css'

/***** IComment
 ** id:            идетификатор
 ** parentId:      идентификатор родителя
 ** children[]:    массив дочерних комментариев (создается и заполняется в nestedComments())
 ** user:          имя пользователя
 ** text:          текст комментария
 */

export interface IComment {
  id: string
  parentId: string
  children?: IComment[]
  user: string
  text: string
}

export interface ICommentFull {
  comment: IComment
  isChildren: boolean /* если true, то добавляется отступ margin-left к стилю комментария */
}

export const Comments: React.FC = () => {
  const [page, setPage] = useState(0)

  /* вывод дерева комментариев - II вариант => */
  // const [allComments, setAllComments] = useState<IComment[]>([])
  // const [newComments, setNewComments] = useState<IComment[]>([])
  /* <= вывод дерева комментариев - II вариант */

  const nestedComments = (commentsArray: IComment[]) => {
    const map = Object.create(null)
    commentsArray.forEach(
      (comment: IComment) => (map[comment.id] = { ...comment, children: [] })
    )
    const nestedComments: IComment[] = []
    commentsArray.forEach((comment: IComment) => {
      if (comment.parentId) map[comment.parentId].children.push(map[comment.id])
      else nestedComments.push(map[comment.id])
    })
    return nestedComments
  }

  const getComments = async ({ pageParam = 0 }) => {
    const response = await fetch('/comments?cursor=' + pageParam)
    if (!response.ok) throw new Error('Ошибка соединения')
    return response.json()
  }

  const { data, fetchNextPage, isError, isLoading } = useInfiniteQuery(
    'COMMENTS',
    getComments,
    {
      getNextPageParam: (lastPage, pages) => {
        return page + 1
      },
      keepPreviousData: true,
      retry: 3,
      refetchOnWindowFocus: false,
    }
  )

  const handleClick = () => {
    setPage(page + 1)
    fetchNextPage()
    /* вывод дерева комментариев - II вариант => */
    // data?.pages.forEach((page, i) => {
    //   setNewComments (nestComments( page.comments))
    //   setAllComments( [...allComments, ...newComments] )
    // })
    /* <= вывод дерева комментариев - II вариант */
  }

  return (
    <>
      {isError && <div>Ошибка загрузки данных!</div>}
      {isLoading ? (
        <div>Загрузка данных...</div>
      ) : (
        <div>
          {data?.pages.map((page, i) => {
            return nestedComments(page.comments).map((comment: IComment) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  isChildren={false}
                />
              )
            })
          })}
        </div>

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
}
