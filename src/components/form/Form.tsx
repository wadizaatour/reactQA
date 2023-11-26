import { useDispatch } from "react-redux";
import Input from "../input/Input";
import { FormEvent, useState } from "react";
import { addQuestion, updateQuestion } from "../../redux/questionsSlice";
import Button from "../button/Button";
interface FormProps {
  type: "add" | "update";
  questionId?: string;
}

const Form = ({ type, questionId }: FormProps) => {
  const dispatch = useDispatch();
  const intialQuestionState = { question: "", answer: "" };
  const [questionItem, setQuestionItem] = useState(intialQuestionState);

  const handleQuestionChange = (question: string) => {
    setQuestionItem({ ...questionItem, question });
  };

  const handleAnswerChange = (answer: string) => {
    setQuestionItem({ ...questionItem, answer });
  };
  const clearForm = () => setQuestionItem(intialQuestionState);
  const handleAddQuestion = () => {
    const trimmedQuestion = questionItem.question.trim();
    if (trimmedQuestion !== "") {
      dispatch(
        addQuestion({ question: trimmedQuestion, answer: questionItem.answer })
      );
      clearForm();
    }
  };
  const handleUpdateQuestion = () => {
    if (questionId) {
      dispatch(
        updateQuestion({
          id: questionId,
          question: questionItem.question,
          answer: questionItem.answer,
        })
      );
      clearForm();
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === "add") {
      return handleAddQuestion();
    } else {
      return handleUpdateQuestion();
    }
  };

  return (
    <form onSubmit={submitHandler}>
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
        type="submit"
        ariaLabel="create question"
        children="Create question"
        color="green"
      />
    </form>
  );
};

export default Form;
