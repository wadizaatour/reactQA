import styles from './Notification.module.css'

export interface NotificationProps {
  message: string
}

const Notification = ({ message }: NotificationProps) => {
  return <span className={styles.notification}>{message}</span>
}

export default Notification
