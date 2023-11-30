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
})
