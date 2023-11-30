import classNames from 'classnames'
import styles from './Button.module.css'

export interface ButtonProps {
  testId?: string
  className?: string
  color: string
  ariaLabel: string
  children: string
  loading?: boolean
  type: 'submit' | 'button'
  onClick?: () => void
}

const Button = ({
  className,
  ariaLabel,
  color,
  loading,
  children,
  type,
  testId,
  onClick
}: ButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.()
    }
  }

  return (
    <button
      className={classNames(className, styles.button, {
        [styles.red]: color === 'red',
        [styles.green]: color === 'green',
        [styles.blue]: color === 'blue'
      })}
      color={color}
      data-testid={testId}
      type={type}
      role="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {loading === true ? <span className="spinner" /> : null}
      {children}
    </button>
  )
}

export default Button
