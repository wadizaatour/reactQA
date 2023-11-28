import './Button.css'

export interface ButtonProps {
  testId?: string
  className?: string
  ariaLabel: string
  children: string
  loading?: boolean
  type: 'submit' | 'button'
  onClick?: () => void
}

const Button = ({
  className,
  ariaLabel,
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
      className={className}
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
