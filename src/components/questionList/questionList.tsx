import { memo } from 'react'
import {
  type Question,
  deleteAll,
  sortQuestionList
} from '../../redux/questionsSlice'
import { useDispatch } from 'react-redux'
import Button from '../button/Button'
import QuestionItem from '../questionItem/QuestionItem'

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
      <h3>Questions:</h3>
      <ul>
        {list?.map((questionItem: Question) => (
          <li key={questionItem.id}>
            <QuestionItem item={questionItem} />
          </li>
        ))}
      </ul>
      <div>
        <Button
          type="button"
          ariaLabel="Sort questions"
          color="#285283"
          onClick={handleSort}
        >
          Sort questions
        </Button>
        <Button
          type="button"
          ariaLabel="Remove questions"
          color="#E20F0F"
          onClick={handleDeleteAllQuestions}
        >
          Remove questions
        </Button>
      </div>
    </section>
  )
}

export default memo(QuestionList)
