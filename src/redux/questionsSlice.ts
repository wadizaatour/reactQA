import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { generateRandomId } from '../utils/generateRandomId'

export interface Question {
  id: number
  question: string
  answer?: string
}
export interface FormError {
  question?: string
  answer?: string
}

interface QuestionsState {
  list: Question[]
  formErrors: FormError
}
const initialState: QuestionsState = {
  list: [],
  formErrors: {}
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setAllQuestionList(state) {
      const storedQuestionList = localStorage.getItem('questions')
      state.list =
        storedQuestionList !== null ? JSON.parse(storedQuestionList) : []
    },
    sortQuestionList(state) {
      state.list.sort((a, b) =>
        a.question.localeCompare(b.question, undefined, { sensitivity: 'base' })
      )
    },
    setFormErrors(state, action: PayloadAction<FormError>) {
      state.formErrors = action.payload
    },
    updateQuestion(state, action: PayloadAction<Question>) {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            question: action.payload.question,
            answer: action.payload.answer
          }
        }
        return item
      })
      localStorage.setItem('questions', JSON.stringify(state.list))
    },
    addQuestion(
      state,
      action: PayloadAction<{ question: string; answer: string }>
    ) {
      const newQuestion: Question = {
        id: generateRandomId(),
        question: action.payload.question,
        answer: action.payload.answer
      }

      state.list.push(newQuestion)
      localStorage.setItem('questions', JSON.stringify(state.list))
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      const filteredArray = state.list.filter((q) => q.id !== action.payload)
      localStorage.setItem('questions', JSON.stringify(filteredArray))
      state.list = filteredArray
    },
    deleteAll(state) {
      state.list = []
      localStorage.setItem('questions', JSON.stringify([]))
    }
  }
})

export const {
  setAllQuestionList,
  sortQuestionList,
  setFormErrors,
  addQuestion,
  deleteQuestion,
  deleteAll,
  updateQuestion
} = questionsSlice.actions
export default questionsSlice.reducer
