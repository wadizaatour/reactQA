import { type ChangeEvent } from 'react'
interface InputProps {
  type: 'text' | 'password' | 'email' // specify allowed input types
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
}

const Input = ({
  type,
  label,
  placeholder,
  onChange,
  value,
  disabled = false
}: InputProps) => {
  const lowercaseLabel = label.toLowerCase()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
  }

  return (
    <div className="input-wrapper">
      <label htmlFor={label}>
        {label}
        <input
          aria-labelledby={lowercaseLabel}
          type={type}
          id={lowercaseLabel} // Use lowercase label as ID
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
    </div>
  )
}

export default Input
