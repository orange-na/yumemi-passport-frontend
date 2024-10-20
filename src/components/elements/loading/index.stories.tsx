import type { Meta, StoryObj } from "@storybook/react";
import Loading from ".";

const meta = {
  title: "Elements/Loading",
  component: Loading,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "number" },
    stroke: { control: "number" },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 8,
    stroke: 0.8,
  },
};

export const Large: Story = {
  args: {
    size: 12,
    stroke: 1,
  },
};

export const Small: Story = {
  args: {
    size: 4,
    stroke: 0.6,
  },
};
