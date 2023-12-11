import { memo, lazy, Suspense } from 'react'
import {
  type Question,
  deleteAll,
  sortQuestionList
} from '../../redux/questionsSlice'
import { useDispatch } from 'react-redux'
import Button from '../button/Button'
import QuestionItem from './QuestionItem'
import styles from './QuestionList.module.css'
import Tooltip from '../tooltip/Tooltip'

const Alert = lazy(async () => await import('../alert/Alert'))

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
    <>
      <Tooltip text="Here you can find created questions and their answer">
        <h2 aria-describedby="created-question"> Created Question</h2>
      </Tooltip>
      <ul className={styles.accordion}>
        {list?.map((questionItem: Question) => (
          <li className={styles.content} key={questionItem.id}>
            <QuestionItem item={questionItem} />
          </li>
        ))}
      </ul>
      {list.length === 0 ? (
        <Suspense>
          <Alert message="No questions yet" />
        </Suspense>
      ) : (
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            ariaLabel="Sort questions"
            color="blue"
            onClick={handleSort}
          >
            Sort questions
          </Button>
          <Button
            color="red"
            type="button"
            ariaLabel="Remove questions"
            onClick={handleDeleteAllQuestions}
          >
            Remove questions
          </Button>
        </div>
      )}
    </>
  )
}

export default memo(QuestionList)
