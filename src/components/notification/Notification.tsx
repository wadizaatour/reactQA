import './Notification.css'

interface NotificationProps {
  message: string
}

const Notification = ({ message }: NotificationProps) => {
  return <span className="notification">{message}</span>
}

export default Notification
