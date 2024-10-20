import PrefectureCheckbox from "@/features/prefectureCheckbox";
import styles from "./page.module.css";
import PopulationChart from "@/features/populationChart";
import { fetchPrefectures } from "@/libs";
import { notFound } from "next/navigation";

export default async function Home() {
  const prefectures = await fetchPrefectures();
  if (!prefectures) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <PrefectureCheckbox prefectures={prefectures} />
      <PopulationChart prefectures={prefectures} />
    </main>
  );
}
