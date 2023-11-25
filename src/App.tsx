import Button from "./components/button/button";
import Input from "./components/input/input";
import "./App.css";
import { setValue } from "./redux/inputSlice";
import { addQuestion, removeQuestion } from "./redux/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import Tooltip from "./components/tooltip/tooltip";
function App() {
  const dispatch = useDispatch();
  const questionInput = useSelector((state: RootState) => state.input.value);
  const [questionList, setQuestionList] = useState(() => {
    const storedQuestions = localStorage.getItem("questions");
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  });
  const [newQuestion, setQuestion] = useState("");
  const [newAnswer, setAnswer] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestionList(JSON.parse(storedQuestions));
    }
  }, []);
  const handleQuestionChange = (question: string) => {
    setQuestion(question);
  };

  const handleAnswerChange = (answer: string) => {
    setAnswer(answer);
  };

  const handleAddQuestion = () => {
    const trimmedValue =
      typeof questionInput === "string" ? questionInput.trim() : questionInput; //Clearing white space from string
    if (trimmedValue !== "") {
      dispatch(addQuestion(trimmedValue));
      dispatch(setValue(""));
      setQuestionList((prevQuestions: any) => {
        const updatedQuestionList = [
          ...prevQuestions,
          { id: Date.now().toString(), text: trimmedValue, answer: newAnswer },
        ];
        localStorage.setItem("questions", JSON.stringify(updatedQuestionList));
        return updatedQuestionList;
      });
      setQuestion("");
      setAnswer("");
    }
  };

  const handleRemoveQuestionAndAnswer = (questionId: string) => {
    dispatch(removeQuestion(questionId));
  };

  const sortQuestionList = () => {
    const sortedQuestions = [...questionList];
    sortedQuestions.sort((a, b) =>
      a.text.localeCompare(b.text, undefined, { sensitivity: "base" })
    );
    setExpandedQuestions([]);
    setQuestionList(sortedQuestions);
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
        <h2> Created Question</h2>
      </Tooltip>
      <div>
        <h3>Questions:</h3>
        <ul>
          {questionList.map((question: any) => (
            <li key={question.id}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => toggleQuestionExpansion(question.id)}
              >
                {question.text}
              </div>
              {expandedQuestions.includes(question.id) && (
                <div>Answer: {question.answer}</div>
              )}
              <button
                onClick={() => handleRemoveQuestionAndAnswer(question.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Button
        children="Sort questions"
        color="blue"
        onClick={sortQuestionList}
      />
      <Button
        children="Removed questions"
        color="red"
        onClick={() => console.log("clicked")}
      />
      <div>
        <Tooltip text="This is a tooltip">
          <h2> Create a new question</h2>
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
        children="Create question"
        color="green"
        onClick={handleAddQuestion}
      />
    </>
  );
}

export default App;
