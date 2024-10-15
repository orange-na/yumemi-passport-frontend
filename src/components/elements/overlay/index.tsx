import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Overlay(props: Props) {
  return <div className={styles.container}>{props.children}</div>;
}
