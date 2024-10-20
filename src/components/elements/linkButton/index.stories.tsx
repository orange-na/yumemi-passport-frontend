import type { Meta, StoryObj } from "@storybook/react";
import LinkButton from ".";

const meta = {
  title: "Elements/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    width: { control: { type: "number" } },
    height: { control: { type: "number" } },
    marginTop: { control: { type: "number" } },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    href: "/",
    children: "LinkButton",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    href: "/",
    children: "LinkButton",
  },
};

export const CustomSize: Story = {
  args: {
    variant: "primary",
    href: "/",
    width: 200,
    height: 60,
    marginTop: 20,
    children: "CustomSize",
  },
};
