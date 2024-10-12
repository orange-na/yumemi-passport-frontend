import { fetchPrefectures } from "./_functions/function";
import styles from "./page.module.css";

export default async function Home() {
  const prefectures = await fetchPrefectures();

  return (
    <div className={styles.container}>
      <div>
        {prefectures.map((prefecture) => (
          <div key={prefecture.prefCode}>{prefecture.prefName}</div>
        ))}
      </div>
    </div>
  );
}
