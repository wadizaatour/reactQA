import { type RootState } from './store'

export const getQuestionsList = (state: RootState) => state.questions.list
export const getFormErrors = (state: RootState) => state.questions.formErrors
export const getTotalQuestions = (state: RootState) => {
  switch (state.questions.list.length) {
    case 0:
      return 'no questions'
    case 1:
      return state.questions.list.length + ' question'
    default:
      return state.questions.list.length + ' questions'
  }
}
