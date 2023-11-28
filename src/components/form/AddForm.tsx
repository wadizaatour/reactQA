import { useDispatch, useSelector } from 'react-redux'
import Input from '../input/Input'
import { type FormEvent, useRef, useState, useEffect, Suspense } from 'react'
import { addQuestion, setAddFormErrors } from '../../redux/questionsSlice'
import Button from '../button/Button'
import { debounce } from '../../utils/debounce'
import { getAddFormErrors } from '../../redux/selectors'
import TextArea from '../textArea/TextArea'
import './Form.css'
import { lazy } from 'react'
import { createErrors } from '../../utils/validateForm'
import { trimQuestion } from '../../utils/trimQuestion'

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

  const addNewQuestion = () => {
    const trimmedQuestion = trimQuestion({
      question: questionItem.question,
      answer: questionItem.answer
    })
    dispatch(addQuestion(trimmedQuestion))
    clearForm()
    setShowNotification(true)
    setLoading(false)
  }

  const handleAddQuestion = () => {
    const errors = createErrors(questionItem.question, questionItem.answer)
    const isError = Object.keys(errors).length > 0

    if (isError) {
      dispatch(setAddFormErrors(errors))
    }

    if (inputRef.current?.checked === true && !isError) {
      setLoading(true)
      const debouncedUpdate = debounce(addNewQuestion, 5000)
      debouncedUpdate()
    }

    if (inputRef.current?.checked === false && !isError) addNewQuestion()
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddQuestion()
  }

  const getFormErrorsValue = (type: string) => {
    if (formErrors !== undefined) {
      return type === 'question'
        ? formErrors.questionError
        : formErrors.answerError
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
          className="align-end green"
          ariaLabel=" create question"
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
