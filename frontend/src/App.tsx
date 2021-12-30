import React, { useState, useEffect} from 'react';
import './App.css';

function App() {

  const [data, setData] = useState(null)


  useEffect(()=> {
    fetch('/api')
    .then((response) => response.json())
    .then((response) => setData(response.message))
  })

  return (
    <div className="App">
        <p>
          { 
            !data ? "loading..." : data
          }
        </p>
    </div>
  );
}

export default App;
