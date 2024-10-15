import styles from "./index.module.css";

interface LoadingProps {
  size?: number;
  stroke?: number;
}

export default function Loading({ size = 8, stroke = 0.8 }: LoadingProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.loader}
        style={{
          width: `${size}vw`,
          height: `${size}vw`,
          borderTopWidth: `${stroke}vw`,
          borderRightWidth: `${stroke}vw`,
          borderBottomWidth: `${stroke}vw`,
          borderLeftWidth: `${stroke}vw`,
        }}
      />
    </div>
  );
}
