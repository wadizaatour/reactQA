import { type ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setAddFormErrors } from '../../redux/questionsSlice'
import styles from './TextArea.module.css'

export interface TextAreaProps {
  label: string
  error?: string
  value: string
  onChange: (value: string) => void
}

const TextArea = ({ label, error, onChange, value }: TextAreaProps) => {
  const lowercaseLabel = label.toLowerCase()
  const dispatch = useDispatch()
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    onChange(newValue)
  }

  const handleFocus = () => {
    dispatch(setAddFormErrors({}))
  }

  return (
    <div>
      <label className={styles.labelTextarea} htmlFor={lowercaseLabel}>
        {label}
        <textarea
          placeholder="Add your answer here"
          aria-label={lowercaseLabel}
          id={lowercaseLabel}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </label>
      <small className={styles.error}>{error}</small>
    </div>
  )
}

export default TextArea
