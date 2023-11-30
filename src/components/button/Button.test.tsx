import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('button', () => {
  const onClickMock = jest.fn()

  it('button is able to render when page is loaded', () => {
    render(
      <Button
        color="gray"
        ariaLabel="CreateQuestion"
        testId="button1"
        type={'button'}
      >
        button test
      </Button>
    )
    expect(screen.getByTestId('button1')).toBeInTheDocument()
  })
  it('calls the onClick function when clicked', () => {
    render(
      <Button
        color="gray"
        ariaLabel="Test Button"
        testId="test-button"
        type="button"
        onClick={onClickMock}
      >
        Click me
      </Button>
    )

    const buttonElement = screen.getByTestId('test-button')
    fireEvent.click(buttonElement)

    // Check if the onClick function is called
    expect(onClickMock).toHaveBeenCalled()
  })

  it('calls the onClick function when "Enter" key is pressed', () => {
    render(
      <Button
        color="gray"
        ariaLabel="Test Button"
        testId="test-button"
        type="button"
        onClick={onClickMock}
      >
        Click me
      </Button>
    )

    const buttonElement = screen.getByTestId('test-button')
    fireEvent.keyDown(buttonElement, { key: 'Enter', code: 'Enter' })

    // Check if the onClick function is called
    expect(onClickMock).toHaveBeenCalled()
  })

  it('calls the onClick function when "Space" key is pressed', () => {
    render(
      <Button
        color="gray"
        ariaLabel="Test Button"
        testId="test-button"
        type="button"
        onClick={onClickMock}
      >
        Click me
      </Button>
    )

    const buttonElement = screen.getByTestId('test-button')
    fireEvent.keyDown(buttonElement, { key: ' ', code: 'Space' })

    // Check if the onClick function is called
    expect(onClickMock).toHaveBeenCalled()
  })
})
