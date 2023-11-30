import { Provider } from 'react-redux'
import Input, { type InputProps } from './Input'
import store from '../../redux/store'

export default {
  title: 'Input',
  component: Input
}

const Template = (args: InputProps) => (
  <Provider store={store}>
    <Input {...args}>Input</Input>
  </Provider>
)

export const Default = (args: InputProps) => (
  <Template {...args} label="Default" />
)

// Story using CSS Modules
export const WithCSSModules = (args: InputProps) => (
  <Template {...args} label="Question" />
)
