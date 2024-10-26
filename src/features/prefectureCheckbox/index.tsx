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

  const regions = [
    { name: "北海道・東北", start: 0, end: 7 },
    { name: "関東", start: 7, end: 14 },
    { name: "北陸・甲信越", start: 14, end: 20 },
    { name: "東海", start: 20, end: 24 },
    { name: "関西", start: 24, end: 30 },
    { name: "中国・四国", start: 30, end: 39 },
    { name: "九州・沖縄", start: 39, end: prefectures.length },
  ];

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
      {regions.map(({ name, start, end }) => (
        <div key={name} className={styles.region}>
          <h2 className={styles.regionTitle}>{name}</h2>
          <div className={styles.prefectures}>
            {prefectures.slice(start, end).map(renderPrefectureCheckbox)}
          </div>
        </div>
      ))}
    </div>
  );
}
