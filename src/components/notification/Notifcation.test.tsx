import { render } from '@testing-library/react'
import Notification from './Notification'

describe('Notification component', () => {
  it('renders Notification with the provided message', () => {
    const testMessage = 'Test notification message'
    const { getByText } = render(<Notification message={testMessage} />)

    const notificationElement = getByText(testMessage)

    expect(notificationElement).toBeInTheDocument()
    expect(notificationElement).toHaveClass('notification')
  })
})
