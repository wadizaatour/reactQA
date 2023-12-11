import { generateLabel } from '../utils/generateLabel'
import { type RootState } from './store'

export const selectQuestionsList = (state: RootState) => state.questions.list
export const selectAddFormErrors = (state: RootState) =>
  state.questions.addformErrors
export const selectTotalQuestions = (state: RootState) => {
  return generateLabel(state.questions.list.length)
}
