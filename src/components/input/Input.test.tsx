import { render } from '@testing-library/react'
import Input from './Input'
import store from '../../redux/store'
import { Provider } from 'react-redux'

describe('Input component', () => {
  it('renders Input component', () => {
    const { container } = render(
      <Provider store={store}>
        <Input type="text" label="Test Label" value="" onChange={() => {}} />
      </Provider>
    )

    expect(container).toBeInTheDocument()
  })
})
