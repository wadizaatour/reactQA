import { render } from '@testing-library/react'
import Alert from './Alert'

describe('Alert component', () => {
  it('renders Alert component with the provided message', () => {
    const testMessage = 'Test error message'
    const { getByText } = render(<Alert message={testMessage} />)

    const alertElement = getByText(testMessage)
    expect(alertElement).toBeInTheDocument()
    expect(alertElement).toHaveClass('alert-error')
  })
})
