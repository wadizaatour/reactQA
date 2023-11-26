import Button from "./components/button/button";
import Input from "./components/input/input";
import QuestionList from "./components/questionList/questionList";
import "./App.css";
import { setValue } from "./redux/inputSlice";
import { addQuestion, setAllQuestionList } from "./redux/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import Tooltip from "./components/tooltip/tooltip";
function App() {
  const dispatch = useDispatch();

  const questionsState = useSelector(
    (state: RootState) => state.questions.list
  );
  const intialQuestionState = { question: "", answer: "" };
  const [questionItem, setQuestionItem] = useState(intialQuestionState);

  useEffect(() => {
    dispatch(setAllQuestionList());
  }, []);

  const handleQuestionChange = (question: string) => {
    setQuestionItem({ ...questionItem, question });
  };

  const handleAnswerChange = (answer: string) => {
    setQuestionItem({ ...questionItem, answer });
  };

  const handleAddQuestion = () => {
    const trimmedValue = questionItem.question.trim();
    if (trimmedValue !== "") {
      dispatch(
        addQuestion({ question: trimmedValue, answer: questionItem.answer })
      );
      dispatch(setValue(""));
      setQuestionItem(intialQuestionState);
    }
  };

  return (
    <>
      <h1>The awesome Q/A tool</h1>
      <Tooltip text="This is a tooltip">
        <h2 aria-describedby="created-question"> Created Question</h2>
      </Tooltip>
      <QuestionList list={questionsState}></QuestionList>
      <div>
        <Tooltip text="This is a tooltip">
          <h2 aria-describedby="create-new-question"> Create a new question</h2>
        </Tooltip>
      </div>
      <Input
        type="text"
        label="Question"
        value={questionItem.question}
        placeholder=""
        onChange={handleQuestionChange}
        disabled={false}
      ></Input>
      <Input
        type="text"
        label="Answer"
        value={questionItem.answer}
        placeholder=""
        onChange={handleAnswerChange}
        disabled={false}
      ></Input>
      <Button
        ariaLabel="create question"
        children="Create question"
        color="green"
        onClick={handleAddQuestion}
      />
    </>
  );
}

export default App;
