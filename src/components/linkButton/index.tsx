import Link from "next/link";
import styles from "./index.module.css";

export type Props = {
  href: string;
  variant: "primary" | "secondary";
  width?: number;
  height?: number;
  marginTop?: number;
  children: React.ReactNode;
};

export default function LinkButton(props: Props) {
  const getButtonStyle = (variant: Props["variant"]) => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
    }
  };

  return (
    <Link
      href={props.href}
      style={{
        width: props.width,
        height: props.height,
        marginTop: props.marginTop,
      }}
      className={`${getButtonStyle(props.variant)} ${styles.button_base}`}
    >
      {props.children}
    </Link>
  );
}
