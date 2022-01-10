import React, { useState, useEffect } from 'react';
import { Comments } from './components/Comments'

import './App.css';

const App: React.FC = () => {

  return (
    <div className="App">
      { 
          <Comments />
      }
    </div>
  );
}

export default App;











  // const [data, setData] = useState(null)

  // useEffect(()=> {
    // fetch('/comments')
    // .then((response) => response.json())
    // .then((response) => setData(response[0].id))
  // })

  /* <button onClick={handleClick} >asds</button> */

  // const handleClick = () => {
  //   fetch('/comments')
  //   .then((response) => response.json())
  //   .then((response) => setData(response[0].id))
  // }

  // const fetchComments = async () => {
  //   const res = await fetch('/comments')
  //     .then((response) => response.json())
  //   //  .then((response) => setData(response[0].user))
  //   return JSON.stringify( res)
  // }

// function Example() {
//   const { isLoading, error, data } = useQuery(
//     'repoData',
//     () =>
//       fetch(
//         'https://api.github.com/repos/tannerlinsley/react-query'
//       ).then((response) => response.json())
//   );

//   if (isLoading) return <p>Загрузка...</p>;

//   if (error) return <p>Ошибка: {error.message}</p>;

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//     </div>
//   );
// }