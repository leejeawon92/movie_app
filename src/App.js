import React from 'react';

function Food({fav}) {
  return <h1>like {fav}</h1>
}



function App() {
  return (
    <div className="App">
      <Food fav="김치"></Food>
      <Food fav="라면"></Food>
      <Food fav="제육볶음"></Food>
      <Food fav="냉면"></Food>

    </div>
  );
}

export default App;
