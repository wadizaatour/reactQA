import Notification, { type NotificationProps } from './Notification'

export default {
  title: 'Notification',
  component: Notification
}

const Template = (args: NotificationProps) => (
  <Notification {...args}>Notification</Notification>
)

export const Default = (args: NotificationProps) => (
  <Template {...args} message="Default" />
)
