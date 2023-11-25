interface ButtonProps {
  children: string;
  color: string;
  onClick: () => void;
}
const Button = ({ children, color, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
