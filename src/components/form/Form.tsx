import { useDispatch } from 'react-redux'
import Input from '../input/Input'
import { type FormEvent, useRef, useState } from 'react'
import { addQuestion, updateQuestion } from '../../redux/questionsSlice'
import Button from '../button/Button'
import { debounce } from '../../utils/debounce'
interface FormProps {
  type: 'add' | 'update'
  questionId?: number
}

const Form = ({ type, questionId }: FormProps) => {
  const dispatch = useDispatch()
  const isAddForm = type === 'add'
  const submitLabel = isAddForm ? 'create question' : 'update question'
  const intialQuestionState = { question: '', answer: '' }
  const [questionItem, setQuestionItem] = useState(intialQuestionState)

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
    const trimmedQuestion = questionItem.question.trim()
    if (trimmedQuestion !== '') {
      dispatch(
        addQuestion({
          question: trimmedQuestion,
          answer: questionItem.answer
        })
      )
    }
    clearForm()
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

  return (
    <form onSubmit={submitHandler}>
      <Input
        type="text"
        label="Question"
        placeholder=""
        onChange={handleQuestionChange}
        disabled={false}
        value={questionItem.question}
      />
      <Input
        type="text"
        label="Answer"
        placeholder=""
        onChange={handleAnswerChange}
        disabled={false}
        value={questionItem.answer}
      />
      {isAddForm && (
        <label>
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

      <Button type="submit" ariaLabel={submitLabel} color="green">
        {submitLabel}
      </Button>
    </form>
  )
}

export default Form
