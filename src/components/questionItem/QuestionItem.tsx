import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { type Question, deleteQuestion } from '../../redux/questionsSlice'
import Form from '../../components/form/Form'
import Button from '../button/Button'

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
      <div className="question-container">
        <div className="information">
          <span>{item.question}</span>
          {isExpanded && <p>Answer: {item.answer}</p>}
        </div>
        <div className="button-group">
          <Button
            ariaLabel={expandLabel}
            color="#757575"
            type="button"
            onClick={() => {
              toggleQuestionExpansion()
            }}
          >
            {expandLabel}
          </Button>

          <Button
            ariaLabel="Remove"
            color="#757575"
            type="button"
            onClick={() => {
              handleRemoveQuestionAndAnswer(item.id)
            }}
          >
            Remove
          </Button>
        </div>
      </div>

      {isExpanded && <Form type="update" questionId={item.id} />}
    </>
  )
}
export default QuestionItem
