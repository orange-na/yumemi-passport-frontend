"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Prefecture } from "@/types";
import { env } from "@/env/env";

export default function Home() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const fetchPrefectures = async () => {
    const response = await fetch(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      {
        headers: {
          "X-API-KEY": env.NEXT_PUBLIC_RESAS_API_KEY,
        },
      }
    );
    const data = await response.json();
    setPrefectures(data.result);
  };

  const fetchPopulation = async (prefCode: number) => {
    const response = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": env.NEXT_PUBLIC_RESAS_API_KEY,
        },
      }
    );
    const data = await response.json();
    console.log(data.result.data[0].data);
  };

  useEffect(() => {
    fetchPrefectures();
  }, []);

  return (
    <div className={styles.container}>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            name="prefecture"
            value={prefecture.prefCode}
            id={`prefecture-${prefecture.prefCode}`}
            className={styles.checkbox}
            onChange={() => fetchPopulation(prefecture.prefCode)}
          />
          <label
            htmlFor={`prefecture-${prefecture.prefCode}`}
            className={styles.checkbox_label}
          >
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
}
