import { useDispatch } from 'react-redux'
import Input from '../Input/Input'
import { type FormEvent, useState } from 'react'
import { updateQuestion } from '../../redux/questionsSlice'
import Button from '../Button/Button'
import TextArea from '../TextArea/TextArea'
import styles from './Form.module.css'

interface UpdateFormProps {
  questionId?: number
}

const UpdateForm = ({ questionId }: UpdateFormProps) => {
  const dispatch = useDispatch()
  const intialQuestionState = { question: '', answer: '' }
  const [questionItem, setQuestionItem] = useState(intialQuestionState)

  const handleQuestionChange = (question: string) => {
    setQuestionItem({ ...questionItem, question })
  }

  const handleAnswerChange = (answer: string) => {
    setQuestionItem({ ...questionItem, answer })
  }

  const clearForm = () => {
    setQuestionItem(intialQuestionState)
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
    handleUpdateQuestion()
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        type="text"
        label="Question"
        placeholder="you can update your question here"
        onChange={handleQuestionChange}
        disabled={false}
        value={questionItem.question}
      />
      <TextArea
        label="Answer"
        onChange={handleAnswerChange}
        value={questionItem.answer}
      />
      <Button
        color="green"
        type="submit"
        className={styles.alignEnd}
        ariaLabel="update"
      >
        update
      </Button>
    </form>
  )
}

export default UpdateForm
