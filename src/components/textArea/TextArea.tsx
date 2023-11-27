import { type ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setFormErrors } from '../../redux/questionsSlice'
import './TextArea.css'
interface TextAreaProps {
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
    dispatch(setFormErrors({}))
  }

  return (
    <div>
      <label className="label-textarea" htmlFor={label}>
        {label}
        <textarea
          aria-labelledby={lowercaseLabel}
          id={lowercaseLabel}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </label>
      <small>{error}</small>
    </div>
  )
}

export default TextArea