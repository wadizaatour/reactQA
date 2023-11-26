import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Question {
  id: string
  question: string
  answer?: string
}

interface QuestionsState {
  list: Question[]
}
const initialState: QuestionsState = {
  list: []
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
        id: Date.now().toString(),
        question: action.payload.question,
        answer: action.payload.answer
      }

      state.list.push(newQuestion)
      localStorage.setItem('questions', JSON.stringify(state.list))
    },
    deleteQuestion(state, action: PayloadAction<string>) {
      const filteredArray = state.list.filter((q) => q.id !== action.payload)
      localStorage.setItem('questions', JSON.stringify(filteredArray))
      state.list = filteredArray
    },
    deleteAll(state) {
      state.list = []
      localStorage.setItem('questions', JSON.stringify([]))
    },
    setAnswer(
      state,
      action: PayloadAction<{ questionId: string; answerText: string }>
    ) {
      const { questionId, answerText } = action.payload
      const question = state.list.find((q) => q.id === questionId)

      if (question !== undefined) {
        question.answer = answerText
      }
    }
  }
})

export const {
  setAllQuestionList,
  sortQuestionList,
  addQuestion,
  deleteQuestion,
  deleteAll,
  setAnswer,
  updateQuestion
} = questionsSlice.actions
export default questionsSlice.reducer
