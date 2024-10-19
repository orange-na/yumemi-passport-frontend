import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <a href="/">都道府県別人口推移グラフ</a>
      </h1>
    </header>
  );
}
