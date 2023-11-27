import { useDispatch } from 'react-redux'
import Input from '../input/Input'
import { type FormEvent, useState } from 'react'
import { updateQuestion } from '../../redux/questionsSlice'
import Button from '../button/Button'

import TextArea from '../textArea/TextArea'
import './Form.css'

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
    <div>
      <form className="form" onSubmit={submitHandler}>
        <Input
          type="text"
          label="UpdateQuestion"
          placeholder="you can update your question here"
          onChange={handleQuestionChange}
          disabled={false}
          value={questionItem.question}
        />
        <TextArea
          label="UpdateAnswer"
          onChange={handleAnswerChange}
          value={questionItem.answer}
        />
        <Button
          type="submit"
          className="align-end"
          ariaLabel="update"
          color="green"
        >
          update
        </Button>
      </form>
    </div>
  )
}

export default UpdateForm
