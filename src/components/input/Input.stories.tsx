import { Provider } from 'react-redux'
import Input, { type InputProps } from './Input'
import store from '../../redux/store'

export default {
  title: 'Input',
  component: Input
}

const Template = (args: InputProps) => (
  <Provider store={store}>
    <div style={{ maxWidth: '500px' }}>
      <Input {...args}>Input</Input>
    </div>
  </Provider>
)

export const Default = (args: InputProps) => (
  <Template {...args} label="Question" />
)
