import { useDispatch } from "react-redux";
import Input from "../input/input";
import { useState } from "react";
import { addQuestion } from "../../redux/questionsSlice";
import Button from "../button/button";

const Form = () => {
  const dispatch = useDispatch();
  const intialQuestionState = { question: "", answer: "" };
  const [questionItem, setQuestionItem] = useState(intialQuestionState);

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
      setQuestionItem(intialQuestionState);
    }
  };

  return (
    <form>
      <Input
        type="text"
        label="Question"
        placeholder=""
        onChange={handleQuestionChange}
        disabled={false}
        value={questionItem.question}
      />
      <Input
        type="text"
        label="Answer"
        placeholder=""
        onChange={handleAnswerChange}
        disabled={false}
        value={questionItem.answer}
      />
      <Button
        ariaLabel="create question"
        children="Create question"
        color="green"
        onClick={handleAddQuestion}
      />
    </form>
  );
};

export default Form;
