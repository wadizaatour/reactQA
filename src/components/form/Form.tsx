import { useDispatch, useSelector } from 'react-redux'
import Input from '../input/Input'
import { type FormEvent, useRef, useState, useEffect } from 'react'
import {
  type FormError,
  addQuestion,
  setFormErrors,
  updateQuestion
} from '../../redux/questionsSlice'
import Button from '../button/Button'
import { debounce } from '../../utils/debounce'
import { getFormErrors } from '../../redux/selectors'
import TextArea from '../textArea/TextArea'
import './Form.css'
import Notification from '../notification/Notification'

interface FormProps {
  type: 'add' | 'update'
  questionId?: number
}

const Form = ({ type, questionId }: FormProps) => {
  const dispatch = useDispatch()
  const isAddForm = type === 'add'
  const submitLabel = isAddForm ? 'create question' : 'update'
  const intialQuestionState = { question: '', answer: '' }
  const [loading, setLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [questionItem, setQuestionItem] = useState(intialQuestionState)
  const formErrors = useSelector(getFormErrors)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleQuestionChange = (question: string) => {
    setQuestionItem({ ...questionItem, question })
  }

  const handleAnswerChange = (answer: string) => {
    setQuestionItem({ ...questionItem, answer })
  }
  const clearForm = () => {
    if (inputRef.current?.checked === true) {
      inputRef.current.checked = false
    }

    setQuestionItem(intialQuestionState)
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showNotification])

  const validateForm = () => {
    const trimmedQuestion = {
      question: questionItem.question.trim(),
      answer: questionItem.answer.trim()
    }

    const errors: FormError = {}

    if (trimmedQuestion.question === '') {
      errors.question = 'Question cannot be empty'
    }

    if (trimmedQuestion.answer === '') {
      errors.answer = 'Answer cannot be empty'
    }

    if (Object.keys(errors).length > 0) {
      dispatch(setFormErrors(errors))
    } else {
      dispatch(addQuestion(trimmedQuestion))
      clearForm()
      setShowNotification(true)
      setLoading(false)
    }
  }

  const handleAddQuestion = () => {
    if (inputRef.current?.checked === true) {
      setLoading(true)
      const debouncedUpdate = debounce(validateForm, 5000)
      debouncedUpdate()
    } else {
      validateForm()
    }
  }
  const handleUpdateQuestion = () => {
    if (questionId !== undefined) {
      dispatch(
        updateQuestion({
          id: questionId,
          question: questionItem.question,
          answer: questionItem.answer
        })
      )
      clearForm()
      setShowNotification(true)
    }
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (type === 'add') {
      handleAddQuestion()
    } else {
      handleUpdateQuestion()
    }
  }
  const getFormErrorsValue = (type: string) => {
    if (formErrors !== undefined) {
      return type === 'question' ? formErrors.question : formErrors.answer
    }
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <Input
          type="text"
          label="Question"
          placeholder="you can add your question here"
          onChange={handleQuestionChange}
          disabled={false}
          value={questionItem.question}
          error={getFormErrorsValue('question')}
        />
        <TextArea
          label="Answer"
          onChange={handleAnswerChange}
          value={questionItem.answer}
          error={getFormErrorsValue('answer')}
        />
        {isAddForm && (
          <label className="align-end">
            Tick here for delay
            <input
              aria-label="debounce add question"
              name="checkbox"
              ref={inputRef}
              type="checkbox"
              disabled={false}
              value={questionItem.answer}
            />
          </label>
        )}
        <Button
          loading={loading}
          type="submit"
          className={`align-end ${loading ? 'loading' : ''}`}
          ariaLabel={submitLabel}
          color="green"
        >
          {submitLabel}
        </Button>
      </form>
      {showNotification && (
        <Notification message={`Question ${isAddForm ? 'added' : 'updated'}`} />
      )}
    </div>
  )
}

export default Form
