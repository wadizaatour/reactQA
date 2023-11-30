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
  const handleRemoveQuestionAndAnswer = (questionId: number) => {
    dispatch(deleteQuestion(questionId))
  }

  const toggleQuestionExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  const expandLabel = isExpanded ? '-' : '+'

  return (
    <>
      <div className={styles.questionContainer}>
        <div className={styles.information}>
          <span>{item.question}</span>
          {isExpanded && <p>Answer: {item.answer}</p>}
        </div>
        <div className={styles.buttonGroup}>
          <Button
            color="gray"
            ariaLabel={expandLabel}
            type="button"
            onClick={() => {
              toggleQuestionExpansion()
            }}
          >
            {expandLabel}
          </Button>

          <Button
            color="gray"
            ariaLabel="Remove"
            className="gray"
            type="button"
            onClick={() => {
              handleRemoveQuestionAndAnswer(item.id)
            }}
          >
            Remove
          </Button>
        </div>
      </div>

      {isExpanded && (
        <Suspense>
          <UpdateForm questionId={item.id} />
        </Suspense>
      )}
    </>
  )
}
export default QuestionItem
