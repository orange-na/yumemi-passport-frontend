"use client";

import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Prefecture } from "@/types";
import { useEffect, useState } from "react";
import { env } from "@/env/env";
import { useSelectedPrefecturesStore } from "@/stores/selectedPrefectures";

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

        prefectureData.forEach((item: { year: number; value: number }) => {
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
  }, [selectedPrefectures, prefectures]);

  return (
    <LineChart width={800} height={500} data={data}>
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0] || {})
        .filter((key) => key !== "year")
        .map((prefName) => (
          <Line
            key={prefName}
            type="monotone"
            dataKey={prefName}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        ))}
    </LineChart>
  );
}

async function fetchPopulation(
  prefCode: number
): Promise<{ year: number; value: number }[]> {
  const response = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": env.NEXT_PUBLIC_RESAS_API_KEY,
      },
    }
  );
  const data = await response.json();
  return data.result.data[0].data;
}
