interface ButtonProps {
  ariaLabel: string;
  children: string;
  color: string;
  onClick: () => void;
}

const Button = ({ ariaLabel, children, color, onClick }: ButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  };
  
  return (
    <button
      role="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
