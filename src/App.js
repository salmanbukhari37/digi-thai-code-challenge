import Todo from "components/Todo";
import Styles from "App.module.scss";

function App() {
  return (
    <div className={Styles.MainContainer}>
      <Todo />
    </div>
  );
}

export default App;
