import classNames from 'classnames'
import styles from './Button.module.css'
import { Suspense, lazy } from 'react'
// import Delete from '../../assets/delete.svg?react'
export interface ButtonProps {
  testId?: string
  icon?: string
  className?: string
  color: string
  ariaLabel: string
  children?: string
  loading?: boolean
  type: 'submit' | 'button'
  onClick?: () => void
}

const Button = ({
  icon,
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

  const LazyIcon = lazy(
    async () => await import(`../../assets/${icon}.svg?react`)
  )
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
      <Suspense>{icon !== undefined && <LazyIcon />}</Suspense>
      {loading === true ? <span className="spinner" /> : null}
      {children}
    </button>
  )
}

export default Button
