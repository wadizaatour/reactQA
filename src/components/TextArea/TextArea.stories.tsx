import { Provider } from 'react-redux'
import TextArea, { type TextAreaProps } from './TextArea'
import store from '../../redux/store'

export default {
  title: 'TextArea',
  component: TextArea
}

const Template = (args: TextAreaProps) => (
  <Provider store={store}>
    <div style={{ maxWidth: '500px' }}>
      <TextArea {...args}>TextArea</TextArea>
    </div>
  </Provider>
)

export const Default = (args: TextAreaProps) => (
  <Template {...args} label="Answer" />
)
