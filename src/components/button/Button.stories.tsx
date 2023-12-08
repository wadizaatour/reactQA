import Button, { type ButtonProps } from './Button'
import styles from './Button.module.css'

export default {
  title: 'Button',
  component: Button
}

const Template = (args: ButtonProps) => <Button {...args}>Button</Button>

export const Default = (args: ButtonProps) => <Template {...args} />

// Story using CSS Modules
export const WithCSSModules = (args: ButtonProps) => (
  <Template {...args} className={styles.Button} />
)
