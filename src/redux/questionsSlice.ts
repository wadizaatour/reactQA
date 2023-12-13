import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { generateRandomId } from '../utils/generateRandomId'

export interface Question {
  id: number
  question: string
  answer?: string
}
export interface FormError {
  questionError?: string
  answerError?: string
}

interface QuestionsState {
  list: Question[]
  addformErrors: FormError
}
const initialState: QuestionsState = {
  list: [],
  addformErrors: {}
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

    setAddFormErrors(state, action: PayloadAction<FormError>) {
      state.addformErrors = action.payload
    },

    updateQuestion(state, action: PayloadAction<Question>) {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            question:
              action.payload.question !== ''
                ? action.payload.question
                : item.question,
            answer:
              action.payload.answer !== '' ? action.payload.answer : item.answer
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
  setAddFormErrors,
  addQuestion,
  deleteQuestion,
  deleteAll,
  updateQuestion
} = questionsSlice.actions
export default questionsSlice.reducer
