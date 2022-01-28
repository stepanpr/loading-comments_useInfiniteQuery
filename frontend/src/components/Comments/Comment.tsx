import React from "react";
import { IComment } from ".";
  /* вывод отдельного комментария */
  export const Comment = ({ comment, isChildren }: any) => {
  const nestedComments = (comment.children || []).map((comment: IComment) => {
    return <Comment key={comment.id} comment={comment} isChildren={true} />
  })

//   if (comment.children?.length! > 0) {
//     // console.log('IiIIIIIIIIIiiiididid LENGTH: ', comment.children?.length!)
//     // console.log(comment.children![1].id)
//     for (let i = 0; i < comment.children?.length!; i++) {
//       // console.log(455, commentList[i])
//       for (let j = i; j < comment.children?.length!; j++) {
//       // console.log(455, commentList[i].children)
//         if (comment.children![i].id === comment.children![j].id) {
//         //   console.log('IiIIIIIIIIIiiiididid', comment.children![i].id)
//           // return null;
//           comment.children!.splice(j, 1)
//           // return null;
//         }
//       }
//     }
//   }
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