import Alert, { type AlertProps } from './Alert'

export default {
  title: 'Alert',
  component: Alert
}

const Template = (args: AlertProps) => (
  <div style={{ maxWidth: '500px' }}>
    <Alert {...args}>Test</Alert>
  </div>
)

export const Default = (args: AlertProps) => (
  <Template {...args} message="Hello world" />
)
