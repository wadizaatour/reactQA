import { type RootState } from './store'

export const getQuestionsList = (state: RootState) => state.questions.list
