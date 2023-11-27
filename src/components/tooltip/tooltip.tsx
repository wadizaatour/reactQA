import { useState, type ReactNode } from 'react'
import './Tooltip.css'

interface TooltipProps {
  children: ReactNode
  text: string
}

const Tooltip = ({ children, text }: TooltipProps) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  const handleMouseEnter = () => {
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipVisible && <div className="tooltip">{text}</div>}
    </div>
  )
}

export default Tooltip
