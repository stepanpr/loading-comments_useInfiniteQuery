import React, { useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";

export const Comments: React.FC = () => {
  const [allComments, setAllComments] = useState([]);
  const [newComments, setNewComments] = useState([]);

  const useGetComments = () => {
    fetch("/comments")
      .then((response) => response.json())
      .then((response) => setNewComments(response));
    setAllComments([...allComments, ...newComments]);
  };

  // console.log(data)
  return (
    <>
      <ul>
        {allComments.map((item: any) => (
          <li key={item.id}>
            <p>{item.id}</p>
            <p>{item.user}</p>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
      <button onClick={useGetComments}>Load More...</button>
    </>
  );
};










//   const { data, isSuccess, isLoading, error, fetchNextPage } = useInfiniteQuery("comments", ({ pageParam = 1 }) =>
//   fetchComments(pageParam),
//   { getNextPageParam: (lastPage, pages) => lastPage.length + 1 }
//     // fetch("/comments").then((res) => res.json())
//   );
// const { data, isSuccess, isLoading, error } = useQuery('comments', fetchComments)

// const useGetComments = () => {
//     const { data, isSuccess, isLoading, error } = useQuery('comments', async () => {
//         const result = await fetch("/comments").then((res) => res.json()) //.then((res) => setComments(comments))
//         setComments(result)
//         return result
//     })
// }

// return (
//     <>
//     <ul>
//         {
//         comments.map((item: any) =>
//             <li key={item.id}>
//               <p>{item.id}</p>
//               <p>{item.user}</p>
//               <p>{item.text}</p>
//             </li>
//           )
//         }
//         {/* {isSuccess &&
//         data.map((item: any) =>
//             <li key={item.id}>
//               <p>{item.id}</p>
//               <p>{item.user}</p>
//               <p>{item.text}</p>
//             </li>
//           )
//         } */}
//       {/* {isSuccess &&
//         data?.pages.map((page) =>
//             page.map((item: any) => (
//             <li key={item.id}>
//               <p>{item.id}</p>
//               <p>{item.user}</p>
//               <p>{item.text}</p>
//             </li>
//           )))
//         } */}
//       {/* {isLoading && <p>Loading...</p>} */}
//       {/* {error && <p>Error occurred!</p>} */}
//       </ul>
//       <button onClick={handleClick}>Load More...</button>

//     </>
//   );
