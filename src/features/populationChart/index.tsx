"use client";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PopulationLabel, Prefecture } from "@/types";
import { useEffect, useState } from "react";
import { env } from "@/env/env";
import { useSelectedPrefecturesStore } from "@/stores/selectedPrefectures";
import { populationLabels } from "@/constants";
import styles from "./index.module.css";

type Props = {
  prefectures: Prefecture[];
};

type PopulationData = {
  year: number;
  [key: string]: number;
};

export default function PopulationChart({ prefectures }: Props) {
  const { selectedPrefectures } = useSelectedPrefecturesStore();
  const [data, setData] = useState<PopulationData[]>([]);
  const [selectedPopulationLabel, setSelectedPopulationLabel] =
    useState<PopulationLabel>("総人口");

  useEffect(() => {
    const fetchPopulationData = async () => {
      const promises = selectedPrefectures.map((prefCode) =>
        fetchPopulation(prefCode)
      );
      const populationDataArray = await Promise.all(promises);
      const newData: PopulationData[] = [];

      populationDataArray.forEach((prefectureData, index) => {
        const prefCode = selectedPrefectures[index];
        const prefName = prefectures.find(
          (p) => p.prefCode === prefCode
        )?.prefName;

        prefectureData
          .find(({ label }) => label === selectedPopulationLabel)
          ?.data.forEach((item: { year: number; value: number }) => {
            const existingItem = newData.find((d) => d.year === item.year);
            if (existingItem) {
              existingItem[prefName!] = item.value;
            } else {
              newData.push({ year: item.year, [prefName!]: item.value });
            }
          });
      });

      setData(newData);
    };

    fetchPopulationData();
  }, [selectedPrefectures, prefectures, selectedPopulationLabel]);

  return (
    <>
      <div className={styles.populationLabels}>
        {populationLabels.map((populationLabel) => (
          <label key={populationLabel} className={styles.populationLabel}>
            <input
              type="radio"
              value={populationLabel}
              checked={selectedPopulationLabel === populationLabel}
              onChange={() => setSelectedPopulationLabel(populationLabel)}
            />
            {populationLabel}
          </label>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} className={styles.lineChart}>
          <XAxis
            dataKey="year"
            height={50}
            padding={{
              left: 20,
              right: 20,
            }}
            label={{
              value: "西暦(年度)",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            tickFormatter={(value) => `${value / 10000}`}
            label={{
              value: "人口(万人)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          {Object.keys(data[0] || {})
            .filter((key) => key !== "year")
            .map((prefName, index) => {
              const hue = (index * 137.5) % 360;
              const color = `hsl(${hue}, 100%, 65%)`;
              return (
                <Line
                  key={prefName}
                  type="monotone"
                  dataKey={prefName}
                  stroke={color}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

async function fetchPopulation(
  prefCode: number
): Promise<{ label: string; data: { year: number; value: number }[] }[]> {
  const response = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": env.NEXT_PUBLIC_RESAS_API_KEY,
      },
    }
  );
  const data = await response.json();
  return data.result.data;
}
