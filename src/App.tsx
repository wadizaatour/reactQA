import QuestionList from "./components/questionList/QuestionList";
import "./App.css";
import { setAllQuestionList } from "./redux/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Tooltip from "./components/tooltip/Tooltip";
import Form from "./components/form/Form";
import { getQuestionsList } from "./redux/selectors";

function App() {
  const dispatch = useDispatch();
  const questionsState = useSelector(getQuestionsList);

  useEffect(() => {
    dispatch(setAllQuestionList());
  }, []);

  return (
    <>
      <h1>The awesome Q/A tool</h1>
      <Tooltip text="This is a tooltip">
        <h2 aria-describedby="created-question"> Created Question</h2>
      </Tooltip>
      <QuestionList list={questionsState} />
      <div>
        <Tooltip text="This is a tooltip">
          <h2 aria-describedby="create-new-question"> Create a new question</h2>
        </Tooltip>
      </div>
      <Form type="add" />
    </>
  );
}

export default App;
