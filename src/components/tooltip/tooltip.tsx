import { useState, type ReactNode } from 'react'
import styles from './Tooltip.module.css'

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
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipVisible && <div className={styles.tooltip}>{text}</div>}
    </div>
  )
}

export default Tooltip
