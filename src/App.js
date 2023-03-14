import Todo from "components/Todo";
import {Helmet} from "react-helmet";
import Styles from "App.module.scss";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Book Store App</title>
      </Helmet>
      <div className={Styles.MainContainer}>
        <Todo />
      </div>
    </>
  );
}

export default App;
