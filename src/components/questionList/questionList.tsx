import { memo } from "react";
import {
  Question,
  deleteAll,
  sortQuestionList,
} from "../../redux/questionsSlice";
import { useDispatch } from "react-redux";
import Button from "../button/Button";
import QuestionItem from "../questionItem/QuestionItem";

interface QuestionListProps {
  list: Question[];
}

const QuestionList = ({ list }: QuestionListProps) => {
  const dispatch = useDispatch();

  const handleDeleteAllQuestions = () => {
    dispatch(deleteAll());
  };

  const handleSort = () => {
    dispatch(sortQuestionList());
  };

  return (
    <section>
      <h3>Questions:</h3>
      <ul>
        {list?.map((questionItem: any) => (
          <li key={questionItem.id}>
            <QuestionItem item={questionItem} />
          </li>
        ))}
      </ul>
      <div>
        <Button
          type="button"
          ariaLabel="sort questions"
          children="Sort questions"
          color="blue"
          onClick={handleSort}
        />
        <Button
          type="button"
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
