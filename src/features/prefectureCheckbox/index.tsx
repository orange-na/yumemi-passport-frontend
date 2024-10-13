"use client";

import { Prefecture } from "@/types";
import styles from "./index.module.css";
import { useSelectedPrefecturesStore } from "@/stores/selectedPrefectures";

type Props = {
  prefectures: Prefecture[];
};

export default function PrefectureCheckbox({ prefectures }: Props) {
  const { selectedPrefectures, togglePrefecture } =
    useSelectedPrefecturesStore();

  return (
    <>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            name="prefecture"
            checked={selectedPrefectures.includes(prefecture.prefCode)}
            id={`prefecture-${prefecture.prefCode}`}
            className={styles.checkbox}
            onChange={() => togglePrefecture(prefecture.prefCode)}
          />
          <label
            htmlFor={`prefecture-${prefecture.prefCode}`}
            className={styles.checkbox_label}
          >
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </>
  );
}
