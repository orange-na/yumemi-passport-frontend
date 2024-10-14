import PrefectureCheckbox from "@/features/prefectureCheckbox";
import styles from "./page.module.css";
import PopulationChart from "@/features/populationChart";
import { fetchPrefectures } from "@/libs";

export default async function Home() {
  const prefectures = await fetchPrefectures();
  if (!prefectures) {
    return <div>Failed to fetch prefectures</div>;
  }

  return (
    <div className={styles.container}>
      <PrefectureCheckbox prefectures={prefectures} />
      <PopulationChart prefectures={prefectures} />
    </div>
  );
}
