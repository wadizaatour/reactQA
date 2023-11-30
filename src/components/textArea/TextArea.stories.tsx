import { Provider } from 'react-redux'
import TextArea, { type TextAreaProps } from './TextArea'
import store from '../../redux/store'

export default {
  title: 'TextArea',
  component: TextArea
}

const Template = (args: TextAreaProps) => (
  <Provider store={store}>
    <TextArea {...args}>TextArea</TextArea>
  </Provider>
)

export const Default = (args: TextAreaProps) => (
  <Template {...args} label="Default" />
)

// Story using CSS Modules
export const WithCSSModules = (args: TextAreaProps) => (
  <Template {...args} label="Answer" />
)
