import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput.tsx';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    name: 'name',
  },
};

export const Email: Story = {
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    value: 'user@example.com',
    disabled: true,
  },
};
