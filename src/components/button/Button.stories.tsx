import type { StoryObj, Meta } from '@storybook/react'
import Button from './Button' // Update the import path based on your project structure

const meta: Meta<typeof Button> = {
  component: Button
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: () => (
    <Button ariaLabel="Default Button" color="red" type="button">
      Test
    </Button>
  )
}
