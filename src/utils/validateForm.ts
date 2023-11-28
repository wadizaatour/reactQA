import type { FormError } from '../redux/questionsSlice'
export function createErrors(question: string, answer: string) {
  const errors: FormError = {}

  if (question.trim() === '') {
    errors.questionError = 'Question cannot be empty'
  }

  if (answer.trim() === '') {
    errors.answerError = 'Answer cannot be empty'
  }
  return errors
}
