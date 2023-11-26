import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "../../redux/inputSlice";
interface InputProps {
  type: "text" | "password" | "email"; // specify allowed input types
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Input = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  disabled = false,
}: InputProps) => {
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    dispatch(setValue(newValue));
  };

  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <input
        aria-labelledby={label.toLowerCase()}
        type={type}
        id={label.toLowerCase()} // Use lowercase label as ID
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
