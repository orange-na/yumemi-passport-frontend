import Checkbox from "./_components/elements/checkbox";
import { fetchPrefectures } from "./_functions/function";
import styles from "./page.module.css";

export default async function Home() {
  const prefectures = await fetchPrefectures();

  return (
    <div className={styles.container}>
      <div>
        {prefectures.map((prefecture) => (
          <div key={prefecture.prefCode}>
            <Checkbox
              options={[
                {
                  value: prefecture.prefCode,
                  label: prefecture.prefName,
                },
              ]}
              name="prefectures"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
