import { useState } from "react";
import { useDispatch } from "react-redux";
import { Question, deleteQuestion } from "../../redux/questionsSlice";
import Form from "../../components/form/Form";

interface QuestionItemProps {
  item: Question;
}

const QuestionItem = ({ item }: QuestionItemProps) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleRemoveQuestionAndAnswer = (questionId: string) => {
    dispatch(deleteQuestion(questionId));
  };

  const toggleQuestionExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <span>{item.question}</span>
      {isExpanded && <p>Answer: {item.answer}</p>}
      <button onClick={() => toggleQuestionExpansion()}>
        {isExpanded ? "-" : "+"}
      </button>
      {isExpanded && <Form type="update" questionId={item.id} />}
      <button onClick={() => handleRemoveQuestionAndAnswer(item.id)}>
        Remove
      </button>
    </>
  );
};
export default QuestionItem;
