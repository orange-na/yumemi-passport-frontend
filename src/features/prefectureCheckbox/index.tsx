"use client";

import { Prefecture } from "@/types";
import styles from "./index.module.css";
import { useSelectedPrefecturesStore } from "@/stores/selectedPrefectures";
import Checkbox from "@/components/elements/checkbox";

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
      <div className={styles.region}>
        <h2 className={styles.regionTitle}>北海道・東北</h2>
        <div className={styles.prefectures}>
          {prefectures.slice(0, 7).map(renderPrefectureCheckbox)}
        </div>
      </div>

      <div className={styles.region}>
        <h2 className={styles.regionTitle}>関東</h2>
        <div className={styles.prefectures}>
          {prefectures.slice(7, 14).map(renderPrefectureCheckbox)}
        </div>
      </div>

      <div className={styles.region}>
        <h2 className={styles.regionTitle}>北陸・甲信越</h2>
        <div className={styles.prefectures}>
          {prefectures.slice(14, 20).map(renderPrefectureCheckbox)}
        </div>
      </div>

      <div className={styles.region}>
        <h2 className={styles.regionTitle}>東海</h2>
        <div className={styles.prefectures}>
          {prefectures.slice(20, 24).map(renderPrefectureCheckbox)}
        </div>
      </div>

      <div className={styles.region}>
        <h2 className={styles.regionTitle}>関西</h2>
        <div className={styles.prefectures}>
          {prefectures.slice(24, 30).map(renderPrefectureCheckbox)}
        </div>
      </div>

      <div className={styles.region}>
        <h2 className={styles.regionTitle}>中国・四国</h2>
        <div className={styles.prefectures}>
          {prefectures.slice(30, 39).map(renderPrefectureCheckbox)}
        </div>
      </div>

      <div className={styles.region}>
        <h2 className={styles.regionTitle}>九州・沖縄</h2>
        <div className={styles.prefectures}>
          {prefectures.slice(39).map(renderPrefectureCheckbox)}
        </div>
      </div>
    </div>
  );
}
