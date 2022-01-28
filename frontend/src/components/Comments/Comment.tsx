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
      className={'comment content is-small' + (isChildren ? ' isChildren' : '')}
    >
      <div className="user">{comment.user}</div>
      <div className="text">{comment.text}</div>
      {nestedComments}
    </div>
  )
}
