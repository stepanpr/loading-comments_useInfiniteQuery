import React, { useState } from 'react'
import { useQuery } from 'react-query'
// import { useLazyQuery } from '@apollo/client';
import './style.css'

interface IComment {
  id: string
  parentId: string
  children?: []
  user: string
  text: string
  comment: IComment
}

interface ICommentObj {
  comment: IComment
}

export const Comments: React.FC = () => {
  const [allComments, setAllComments] = useState<IComment[]>([])
  const [newComments, setNewComments] = useState<IComment[]>([])

  /* структурирование комментариев */
  const nestComments = (commentList: IComment[]) => {
    const commentMap: any = {}
    commentList.forEach(
      (comment: IComment) => (commentMap[comment.id] = comment)
    ) //записываем все комментарии в commentMap

    commentList.forEach((comment: IComment) => {
      if (comment.parentId !== null) {
        const parent = commentMap[comment.parentId]
        ;(parent.children = parent.children || []).push(comment)
      }
    })

    console.log(commentList.filter((comment: any) => {
      return comment.parentId === null;
    }))
    
    return commentList.filter((comment: IComment) => {
      //всем ParentId присваиваем null
      return comment.parentId === null
    })
  }

  /* хук подгрузки коментариев */
  const useComments = () => {
    return useQuery(
      'COMMENTS',
      async () => {
        const response = await fetch('/comments').then((response: any) =>
          response.json()
        )
        setNewComments(nestComments(response.comments)) // запись структурированых данных
        setAllComments([...allComments, ...newComments])
      },
      { enabled: false, refetchOnWindowFocus: false, retry: 3 }
    )
  }

  const query = useComments()

  /* подгрузка комментариев при первичном рендеринге */
  window.onload = () => {
    query.refetch()
    fetch('/comments')
      .then((response) => response.json())
      .then((response) => {
        setAllComments(nestComments(response.comments))
      })
  }

  const handleClick = () => {
    query.refetch()
  }

  /* вывод отдельного комментария */
  function Comment({ comment }: ICommentObj) {
    const nestedComments = (comment.children || []).map((comment: IComment) => {
      return <Comment key={comment.id} comment={comment} />
    })

    return (
      <div className="comment content is-small">
        <div className="user">{comment.user}</div>
        <div className="text">{comment.text}</div>
        {nestedComments}
      </div>
    )
  }

  return (
    <>
      {query.isError ? (
        <div>Ошибка загрузки данных!</div>
      ) : !query.isLoading ? (
        <div>
          {
            /* вывод дерева комментариев */
            allComments.map((comment: IComment) => {
              return <Comment key={comment.id} comment={comment} />
            })
          }
        </div>
      ) : (
        <div>Загрузка данных...</div>
      )}
      <button
        className={
          'button is-normall is-primary is-light is-fullwidth' +
          (query.isLoading ? ' is-loading' : '')
        }
        onClick={handleClick}
      >
        Загрузить еще...
      </button>
    </>
  )
}
