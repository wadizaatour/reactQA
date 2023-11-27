export function generateLabel(length: number) {
  switch (length) {
    case 0:
      return 'no questions'
    case 1:
      return length + ' question'
    default:
      return length + ' questions'
  }
}
