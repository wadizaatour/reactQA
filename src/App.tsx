import Button from "./components/button/button";
import Input from "./components/input/input";
import "./App.css";
import { setValue } from "./redux/inputSlice";
import {
  addQuestion,
  deleteQuestion,
  deleteAll,
  setAllQuestionList,
  sortQuestionList,
} from "./redux/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import Tooltip from "./components/tooltip/tooltip";
function App() {
  const dispatch = useDispatch();

  const questionsState = useSelector(
    (state: RootState) => state.questions.list
  );
  const [newQuestion, setQuestion] = useState("");
  const [newAnswer, setAnswer] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  useEffect(() => {
    dispatch(setAllQuestionList());
  }, []);

  const handleQuestionChange = (question: string) => {
    setQuestion(question);
  };

  const handleAnswerChange = (answer: string) => {
    setAnswer(answer);
  };

  const handleAddQuestion = () => {
    const trimmedValue = newQuestion.trim();
    if (trimmedValue !== "") {
      dispatch(addQuestion({ question: trimmedValue, answer: newAnswer }));
      dispatch(setValue(""));
      setQuestion("");
      setAnswer("");
    }
  };

  const handleRemoveQuestionAndAnswer = (questionId: string) => {
    dispatch(deleteQuestion(questionId));
  };
  const handleDeleteAllQuestions = () => {
    dispatch(deleteAll());
    setExpandedQuestions([]);
  };

  const handleSort = () => {
    setExpandedQuestions([]);
    dispatch(sortQuestionList());
  };

  const toggleQuestionExpansion = (questionId: string) => {
    setExpandedQuestions((prevExpanded) => {
      if (prevExpanded.includes(questionId)) {
        return prevExpanded.filter((id) => id !== questionId);
      } else {
        return [...prevExpanded, questionId];
      }
    });
  };

  return (
    <>
      <h1>The awesome Q/A tool</h1>
      <Tooltip text="This is a tooltip">
        <h2 aria-describedby="created-question"> Created Question</h2>
      </Tooltip>
      <div>
        <h3>Questions:</h3>
        <ul>
          {questionsState?.map((questionItem: any) => (
            <li key={questionItem.id}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => toggleQuestionExpansion(questionItem.id)}
              >
                {questionItem.question}
              </div>
              {expandedQuestions.includes(questionItem.id) && (
                <div>Answer: {questionItem.answer}</div>
              )}
              <button
                onClick={() => handleRemoveQuestionAndAnswer(questionItem.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Button
        ariaLabel="sort questions"
        children="Sort questions"
        color="blue"
        onClick={handleSort}
      />
      <Button
        ariaLabel="removed questions"
        children="Remove questions"
        color="red"
        onClick={handleDeleteAllQuestions}
      />
      <div>
        <Tooltip text="This is a tooltip">
          <h2 aria-describedby="create-new-question"> Create a new question</h2>
        </Tooltip>
      </div>
      <Input
        type="text"
        label="Question"
        value={newQuestion}
        placeholder=""
        onChange={handleQuestionChange}
        disabled={false}
      ></Input>
      <Input
        type="text"
        label="Answer"
        value={newAnswer}
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
