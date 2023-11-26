/* eslint-disable @typescript-eslint/no-explicit-any */

export function debounce(fn: () => void, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: any, ...args: []) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}
