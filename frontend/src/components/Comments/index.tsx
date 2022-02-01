import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { Comment } from './Comment'
import './style.css'

/***** IComment
 ** @param {string} id            идетификатор
 ** @param {string} parentId      идентификатор родителя
 ** @param {IComment[]} children  массив дочерних комментариев (создается и заполняется в nestedComments())
 ** @param {string} user          имя пользователя
 ** @param {string} text          текст комментария
 *
 */

/***** ICommentFull
 ** @param {IComment} comment     комментарий IComment
 ** @param {boolean} isChildren   если равно true, то добавляется отступ margin-left к стилю комментария
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
  isChildren: boolean
}

export const Comments: React.FC = () => {
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
        return lastPage.nextCursor
      },
      keepPreviousData: true,
      retry: 3,
      refetchOnWindowFocus: false,
    }
  )

  const handleClick = () => {
    fetchNextPage()
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
      )}
      <button
        className={
          'button mt-6 is-normall is-primary is-light is-fullwidth' +
          (isLoading ? ' is-loading' : '')
        }
        onClick={handleClick}
      >
        Загрузить еще...
      </button>
    </>
  )
}
