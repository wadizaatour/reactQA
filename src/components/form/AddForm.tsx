import { useDispatch, useSelector } from 'react-redux'
import Input from '../input/Input'
import { type FormEvent, useRef, useState, useEffect, Suspense } from 'react'
import {
  type FormError,
  addQuestion,
  setAddFormErrors
} from '../../redux/questionsSlice'
import Button from '../button/Button'
import { debounce } from '../../utils/debounce'
import { getAddFormErrors } from '../../redux/selectors'
import TextArea from '../textArea/TextArea'
import './Form.css'
import { lazy } from 'react'

const Notification = lazy(
  async () => await import('../notification/Notification')
)
const Form = () => {
  const dispatch = useDispatch()
  const intialQuestionState = { question: '', answer: '' }
  const [loading, setLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [questionItem, setQuestionItem] = useState(intialQuestionState)
  const formErrors = useSelector(getAddFormErrors)
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

      return () => {
        clearTimeout(timer)
      }
    }
  }, [showNotification])

  const validateForm = () => {
    const errors: FormError = {}
    const trimmedQuestion = {
      question: questionItem.question.trim(),
      answer: questionItem.answer.trim()
    }

    if (trimmedQuestion.question === '') {
      errors.question = 'Question cannot be empty'
    }

    if (trimmedQuestion.answer === '') {
      errors.answer = 'Answer cannot be empty'
    }

    if (Object.keys(errors).length > 0) {
      dispatch(setAddFormErrors(errors))
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
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddQuestion()
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

        <Button
          loading={loading}
          type="submit"
          className="align-end"
          ariaLabel=" create question"
          color="green"
        >
          create question
        </Button>
      </form>
      {showNotification && (
        <Suspense>
          <Notification message="Question added" />
        </Suspense>
      )}
    </div>
  )
}

export default Form
