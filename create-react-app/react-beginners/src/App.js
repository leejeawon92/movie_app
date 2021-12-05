import { useState } from 'react';

function App() {
  const [toDo, setToDo] = useState('');
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
  }
  const onSubmit = (event) =>{
    event.preventDefault();
    if(toDo ===''){
      return;
    } else {
      setToDo('')
      setToDos((currentArray)=> [...currentArray, toDo]);
    }
  }
  console.log(toDos);
  
  return (
    <div>
      <h1>할일 목록({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} type='text' placeholder="할일목록을 적으세요"></input>
        <button>할일 추가</button>
      </form>
      <hr />
      {toDos.map((item, index) => <li key={index}>{item}</li> )}
    </div>
  );
}
export default App;
