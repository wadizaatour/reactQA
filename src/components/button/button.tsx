interface ButtonProps {
  testId?: string
  ariaLabel: string
  children: string
  color: string
  type: 'submit' | 'button'
  onClick?: () => void
}

const Button = ({
  ariaLabel,
  children,
  color,
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
      data-testid={testId}
      type={type}
      role="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{
        backgroundColor: color
      }}
    >
      {children}
    </button>
  )
}

export default Button
