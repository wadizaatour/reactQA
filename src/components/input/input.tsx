import { type ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setAddFormErrors } from '../../redux/questionsSlice'
import styles from './Input.module.css'

export interface InputProps {
  type: 'text'
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
  const handleFocus = () => {
    dispatch(setAddFormErrors({}))
  }

  return (
    <>
      <label className={styles.labelInput} htmlFor={lowercaseLabel}>
        {label}
        <input
          aria-label={lowercaseLabel}
          type={type}
          id={lowercaseLabel}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          onFocus={handleFocus}
        />
      </label>
      <small className={styles.error}>{error}</small>
    </>
  )
}

export default Input
