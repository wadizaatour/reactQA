import type { StoryObj, Meta } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  component: Button
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: () => (
    <Button ariaLabel="Default Button" type="button">
      Test
    </Button>
  )
}
