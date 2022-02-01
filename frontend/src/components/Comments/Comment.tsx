import React from 'react'
import { IComment, ICommentFull } from '.'

/* вывод отдельного комментария */
export const Comment: React.FC<ICommentFull> = ({
  comment,
  isChildren,
}: ICommentFull) => {
  const nestedComments = (comment.children || []).map((comment: IComment) => {
    return <Comment key={comment.id} comment={comment} isChildren={true} />
  })
  return (
    <div
      className={'comment mt-2 content is-small' + (isChildren ? ' ml-5' : '')}
    >
      <div className="user pl-5">{comment.user}</div>
      <div className="text px-3 py-2">{comment.text}</div>
      {nestedComments}
    </div>
  )
}
