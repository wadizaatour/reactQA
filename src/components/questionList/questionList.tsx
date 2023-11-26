import { memo, useState } from "react";
import {
  Question,
  deleteAll,
  deleteQuestion,
  sortQuestionList,
} from "../../redux/questionsSlice";
import { useDispatch } from "react-redux";
import Button from "../button/button";

interface QuestionListProps {
  list: Question[];
}

const QuestionList = ({ list }: QuestionListProps) => {
  const dispatch = useDispatch();
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestionExpansion = (questionId: string) => {
    setExpandedQuestions((prevExpanded) => {
      if (prevExpanded.includes(questionId)) {
        return prevExpanded.filter((id) => id !== questionId);
      } else {
        return [...prevExpanded, questionId];
      }
    });
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

  return (
    <section>
      <h3>Questions:</h3>
      <ul>
        {list?.map((questionItem: any) => (
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
      <div>
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
      </div>
    </section>
  );
};

export default memo(QuestionList);
