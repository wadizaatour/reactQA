interface QuestionItem {
  question: string
  answer: string
}
export function trimQuestion(questionItem: QuestionItem): QuestionItem {
  const trimmedQuestion = {
    question: questionItem.question?.trim(),
    answer: questionItem.answer?.trim()
  }

  return trimmedQuestion
}
