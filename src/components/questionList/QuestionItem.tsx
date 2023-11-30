import { useState, lazy, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { type Question, deleteQuestion } from '../../redux/questionsSlice'
import Button from '../button/Button'
import styles from './QuestionList.module.css'

const UpdateForm = lazy(async () => await import('../form/UpdateForm'))
interface QuestionItemProps {
  item: Question
}

const QuestionItem = ({ item }: QuestionItemProps) => {
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const handleRemoveQuestionAndAnswer = (questionId: number) => {
    dispatch(deleteQuestion(questionId))
  }

  const toggleQuestionExpansion = () => {
    setIsExpanded(!isExpanded)
    setIsUpdating(false)
  }
  const toggleUpdateExpansion = () => {
    setIsUpdating(!isUpdating)
  }

  return (
    <>
      <div className={styles.questionContainer}>
        <div className={styles.information}>
          <p>{item.question}</p>

          {isExpanded && <p>Answer: {item.answer}</p>}
        </div>
        <div className={styles.buttonGroup}>
          <Button
            icon="expand"
            color="gray"
            ariaLabel="expand"
            type="button"
            onClick={() => {
              toggleQuestionExpansion()
            }}
          ></Button>
          <Button
            icon="edit"
            color="gray"
            ariaLabel="update"
            type="button"
            onClick={() => {
              toggleUpdateExpansion()
            }}
          ></Button>

          <Button
            icon="delete"
            color="gray"
            ariaLabel="Remove"
            className="gray"
            type="button"
            onClick={() => {
              handleRemoveQuestionAndAnswer(item.id)
            }}
          ></Button>
        </div>
      </div>

      {isUpdating && (
        <Suspense>
          <UpdateForm questionId={item.id} />
        </Suspense>
      )}
    </>
  )
}
export default QuestionItem
