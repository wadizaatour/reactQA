import { render, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button component', () => {
  it('calls onClick handler when the button is clicked', () => {
    const onClickMock = jest.fn()
    const { getByTestId } = render(
      <Button
        type="button"
        testId="test-button"
        color="blue"
        ariaLabel="Example Button"
        onClick={onClickMock}
      >
        Click me
      </Button>
    )

    const button = getByTestId('test-button')
    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalled()
  })

  it('calls onClick handler when the button is triggered by keyboard (Enter/Space)', () => {
    const onClickMock = jest.fn()
    const { getByTestId } = render(
      <Button
        type="button"
        testId="test-button"
        color="blue"
        ariaLabel="Example Button"
        onClick={onClickMock}
      >
        Click me
      </Button>
    )

    const button = getByTestId('test-button')
    fireEvent.keyDown(button, { key: 'Enter' })

    expect(onClickMock).toHaveBeenCalled()

    fireEvent.keyDown(button, { key: ' ' })

    expect(onClickMock).toHaveBeenCalledTimes(2)
  })

  it('renders a spinner when loading prop is true', () => {
    const { getByTestId } = render(
      <Button
        type="button"
        testId="test-button"
        color="blue"
        ariaLabel="Example Button"
        loading={true}
      >
        Click me
      </Button>
    )

    const spinner = getByTestId('test-button').querySelector('.spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('does not render a spinner when loading prop is false', () => {
    const { getByTestId } = render(
      <Button
        type="button"
        testId="test-button"
        color="blue"
        ariaLabel="Example Button"
        loading={false}
      >
        Click me
      </Button>
    )

    const spinner = getByTestId('test-button').querySelector('.spinner')
    expect(spinner).not.toBeInTheDocument()
  })
})
