import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Checkbox from ".";

const meta = {
  title: "Elements/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "checkbox-1",
    label: "Checkbox Label",
    checked: false,
    onChange: action("checkbox-change"),
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};
