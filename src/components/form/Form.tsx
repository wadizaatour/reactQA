import { useDispatch, useSelector } from 'react-redux'
import Input from '../input/Input'
import { type FormEvent, useRef, useState } from 'react'
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

interface FormProps {
  type: 'add' | 'update'
  questionId?: number
}

const Form = ({ type, questionId }: FormProps) => {
  const dispatch = useDispatch()
  const isAddForm = type === 'add'
  const submitLabel = isAddForm ? 'create question' : 'update'
  const intialQuestionState = { question: '', answer: '' }
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
    }
  }

  const handleAddQuestion = () => {
    if (inputRef.current?.checked === true) {
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
    <form className="update-form" onSubmit={submitHandler}>
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
        type="submit"
        className="align-end"
        ariaLabel={submitLabel}
        color="green"
      >
        {submitLabel}
      </Button>
    </form>
  )
}

export default Form
