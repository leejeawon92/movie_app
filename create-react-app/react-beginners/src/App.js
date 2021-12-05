import Button from './Button';
import PropType from 'prop-types';
import styles from './App.module.css'

function App() {
  return (
    <div className="App">
      <h1 className={styles.title}>타이틀!</h1>
      <Button text={'버튼!'}/>
    </div>
  );
}

Button.prototype = {
  text: PropType.string.isRequired,
}

export default App;
