import { render } from '@testing-library/react'
import TextArea from './TextArea'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('TextArea component', () => {
  it('renders TextArea component', () => {
    const { container } = render(
      <Provider store={store}>
        <TextArea label="Test" value="" onChange={() => {}} />
      </Provider>
    )

    expect(container).toBeInTheDocument()
  })

  it('renders with error message', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <TextArea
          label="Test Label"
          value=""
          onChange={() => {}}
          error="Test Error"
        />
      </Provider>
    )

    const textareaElement = getByLabelText('Test Label')
    const errorElement = getByText('Test Error')

    expect(textareaElement).toBeInTheDocument()
    expect(errorElement).toBeInTheDocument()
  })
})
