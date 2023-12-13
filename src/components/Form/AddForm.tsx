import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input/Input'
import { type FormEvent, useRef, useState, useEffect, Suspense } from 'react'
import { addQuestion, setAddFormErrors } from '../../redux/questionsSlice'
import Button from '../Button/Button'
import { debounce } from '../../utils/debounce'
import { selectAddFormErrors } from '../../redux/selectors'
import TextArea from '../TextArea/TextArea'
import styles from './Form.module.css'
import { lazy } from 'react'
import { createErrors } from '../../utils/createErrors'
import { trimQuestionItem } from '../../utils/trimQuestionItem'
import Tooltip from '../Tooltip/Tooltip'

const Notification = lazy(
  async () => await import('../Notification/Notification')
)
const Form = () => {
  const dispatch = useDispatch()
  const intialQuestionState = { question: '', answer: '' }
  const [loading, setLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [questionItem, setQuestionItem] = useState(intialQuestionState)
  const formErrors = useSelector(selectAddFormErrors)
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
      }, 6000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [showNotification])

  const addNewQuestion = () => {
    const trimmedQuestion = trimQuestionItem({
      question: questionItem.question,
      answer: questionItem.answer
    })
    if (!loading) dispatch(addQuestion(trimmedQuestion))
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
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <Tooltip text="Here you can create a new questions and their answers">
          <h2 aria-describedby="create-new-question">Create a new question</h2>
        </Tooltip>
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
        <label className={styles.alignEnd}>
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
          className={styles.alignEnd}
          color="green"
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
    </>
  )
}

export default Form
