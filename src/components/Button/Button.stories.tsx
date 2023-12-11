import Button, { type ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button
}

const Template = (args: ButtonProps) => <Button {...args}>Button</Button>

export const Default = (args: ButtonProps) => <Template {...args} />
