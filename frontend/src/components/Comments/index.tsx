import React, { useState, useEffect } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'

interface IComments {
  id: string
  parentID: string
  user: string
  text: string
}

export const Comments: React.FC = () => {

  const [allComments, setAllComments] = useState<IComments[]>([])
  const [newComments, setNewComments] = useState<IComments[]>([])

  const fetchComments = async () => {
    const response = await fetch('/comments').then((response) => response.json())
    // if (!response.ok) throw new Error('Ошибка загрузки комментариев')
    setNewComments(response.comments)
    setAllComments([...allComments, ...newComments])
  }

  const useComments = () => {
    return useQuery('COMMENTS', fetchComments, { enabled: false, refetchOnWindowFocus: false})
  }

  const query = useComments()

  const handleClick = () => {
    query.refetch()
  }


  return (
    <>
      <ul>
        {query.isSuccess &&
          allComments.map((comment: any) => (
            <li key={comment.id}>
              <span>{comment.user}</span>
              <p>{comment.text}</p>
            </li>
          ))
        }
        {query.isLoading && <div>Загрузка...</div>}
        <button onClick={handleClick}>Загрузить еще...</button>
      </ul>
    </>
  )
}


