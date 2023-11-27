import { type ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setFormErrors } from '../../redux/questionsSlice'
import './Input.css'
interface InputProps {
  type: 'text' | 'password' | 'email' // specify allowed input types
  label: string
  error?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
}

const Input = ({
  type,
  label,
  error,
  placeholder,
  onChange,
  value,
  disabled = false
}: InputProps) => {
  const lowercaseLabel = label.toLowerCase()
  const dispatch = useDispatch()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
  }
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormErrors({}))
  }

  return (
    <div className="input-wrapper">
      <label className="label-input" htmlFor={label}>
        {label}
        <input
          aria-labelledby={lowercaseLabel}
          type={type}
          id={lowercaseLabel} // Use lowercase label as ID
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          onFocus={handleFocus}
        />
      </label>
      <small>{error}</small>
    </div>
  )
}

export default Input
