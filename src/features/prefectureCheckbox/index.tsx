"use client";

import { Prefecture } from "@/types";
import styles from "./index.module.css";
import { useSelectedPrefecturesStore } from "@/stores/selectedPrefectures";
import Checkbox from "@/components/checkbox";

type Props = {
  prefectures: Prefecture[];
};

export default function PrefectureCheckbox({ prefectures }: Props) {
  const { selectedPrefectures, togglePrefecture } =
    useSelectedPrefecturesStore();

  const renderPrefectureCheckbox = (prefecture: Prefecture) => (
    <Checkbox
      key={prefecture.prefCode}
      id={`prefecture-${prefecture.prefCode}`}
      label={prefecture.prefName}
      checked={selectedPrefectures.includes(prefecture.prefCode)}
      onChange={() => togglePrefecture(prefecture.prefCode)}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.region}>北海道・東北</div>
      {prefectures.slice(0, 7).map(renderPrefectureCheckbox)}

      <div className={styles.region}>関東</div>
      {prefectures.slice(7, 14).map(renderPrefectureCheckbox)}

      <div className={styles.region}>北陸・甲信越</div>
      {prefectures.slice(14, 20).map(renderPrefectureCheckbox)}

      <div className={styles.region}>東海</div>
      {prefectures.slice(20, 24).map(renderPrefectureCheckbox)}

      <div className={styles.region}>関西</div>
      {prefectures.slice(24, 30).map(renderPrefectureCheckbox)}

      <div className={styles.region}>中国・四国</div>
      {prefectures.slice(30, 39).map(renderPrefectureCheckbox)}

      <div className={styles.region}>九州・沖縄</div>
      {prefectures.slice(39).map(renderPrefectureCheckbox)}
    </div>
  );
}
