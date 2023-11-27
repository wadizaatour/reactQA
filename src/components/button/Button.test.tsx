import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('button', () => {
  it('button is able to render when page is loaded', () => {
    render(
      <Button
        ariaLabel="CreateQuestion"
        testId="button1"
        color={'red'}
        type={'button'}
      >
        button test
      </Button>
    )
    expect(screen.getByTestId('button1')).toBeInTheDocument()
  })
})
