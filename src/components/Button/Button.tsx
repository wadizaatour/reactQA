import classNames from 'classnames'
import styles from './Button.module.css'
import { Suspense, lazy } from 'react'

export interface ButtonProps {
  type: 'submit' | 'button'
  testId?: string
  icon?: string
  className?: string
  color: string
  ariaLabel: string
  children?: string
  loading?: boolean
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
      {loading === true ? <span className={styles.spinner} /> : null}
      <Suspense>{icon !== undefined && <LazyIcon />}</Suspense>
      {children}
    </button>
  )
}

export default Button
