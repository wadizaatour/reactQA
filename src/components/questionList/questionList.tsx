import { memo } from 'react'
import {
  type Question,
  deleteAll,
  sortQuestionList
} from '../../redux/questionsSlice'
import { useDispatch } from 'react-redux'
import Button from '../button/Button'
import QuestionItem from '../questionItem/QuestionItem'
import './QuestionList.css'
import Alert from '../alert/Alert'

interface QuestionListProps {
  list: Question[]
}

const QuestionList = ({ list }: QuestionListProps) => {
  const dispatch = useDispatch()

  const handleDeleteAllQuestions = () => {
    dispatch(deleteAll())
  }

  const handleSort = () => {
    dispatch(sortQuestionList())
  }

  return (
    <section>
      <ul className="accordion">
        {list?.map((questionItem: Question) => (
          <li className="content" key={questionItem.id}>
            <QuestionItem item={questionItem} />
          </li>
        ))}
      </ul>
      {list.length === 0 ? (
        <Alert message="No questions yet" />
      ) : (
        <div className="button-group">
          <Button
            type="button"
            ariaLabel="Sort questions"
            className="blue"
            onClick={handleSort}
          >
            Sort questions
          </Button>
          <Button
            type="button"
            ariaLabel="Remove questions"
            className="red"
            onClick={handleDeleteAllQuestions}
          >
            Remove questions
          </Button>
        </div>
      )}
    </section>
  )
}

export default memo(QuestionList)
