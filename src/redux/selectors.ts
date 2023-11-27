import { generateLabel } from '../utils/generateLabel'
import { type RootState } from './store'

export const getQuestionsList = (state: RootState) => state.questions.list
export const getFormErrors = (state: RootState) => state.questions.formErrors
export const getTotalQuestions = (state: RootState) => {
  return generateLabel(state.questions.list.length)
}
