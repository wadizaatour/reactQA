import './Alert.css'
interface AlertProps {
  message: string
}

const Alert = ({ message }: AlertProps) => {
  return <div className="alert-error">{message}</div>
}

export default Alert
