interface QuestionItem {
  question: string
  answer: string
}
export function trimQuestionItem(questionItem: QuestionItem): QuestionItem {
  return {
    question: questionItem.question?.trim(),
    answer: questionItem.answer?.trim()
  }
}
