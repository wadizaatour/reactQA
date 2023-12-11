import Tooltip, { type TooltipProps } from './Tooltip'
import styles from './Tooltip.module.css'
export default {
  title: 'Tooltip',
  component: Tooltip
}

const Template = (args: TooltipProps) => (
  <div className={styles.tooltipContainer}>
    <Tooltip {...args}>
      <button>Hover me</button>
    </Tooltip>
  </div>
)

export const Default = (args: TooltipProps) => (
  <Template {...args} text="Hello Default"></Template>
)
