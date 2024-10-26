import { useEffect, useState } from "react";
import { PopulationLabel, PopulationResponse, Prefecture } from "@/types";

type PopulationChartData = {
  year: number;
  [key: string]: number;
};

export const usePopulationData = (
  selectedPrefectures: number[],
  prefectures: Prefecture[]
) => {
  const [populationData, setPopulationData] = useState<PopulationChartData[]>(
    []
  );
  const [selectedPopulationLabel, setSelectedPopulationLabel] =
    useState<PopulationLabel>("総人口");

  useEffect(() => {
    const fetchPopulationData = async () => {
      const newData = [...populationData];

      for (const prefCode of selectedPrefectures) {
        // 選択された都道府県のデータがまだ取得されていない場合のみ、データを取得
        if (!newData.some((item) => item[prefCode])) {
          const prefectureData = await fetchPopulation(prefCode);
          const prefName = prefectures.find(
            (p) => p.prefCode === prefCode
          )?.prefName;

          // 選択された人口ラベルに対応するデータを取得し、年度ごとにデータを更新または追加
          prefectureData
            .find(({ label }) => label === selectedPopulationLabel)
            ?.data.forEach((item) => {
              const existingItem = newData.find((d) => d.year === item.year);
              if (existingItem) {
                existingItem[prefName!] = item.value;
              } else {
                newData.push({ year: item.year, [prefName!]: item.value });
              }
            });
        }
      }

      // 選択された都道府県のデータのみを含むようにデータを更新
      setPopulationData(
        newData.map((item) => {
          const newItem: PopulationChartData = { year: item.year };
          selectedPrefectures.forEach((prefCode) => {
            const prefName = prefectures.find(
              (p) => p.prefCode === prefCode
            )?.prefName;
            newItem[prefName!] = item[prefName!];
          });
          return newItem;
        })
      );
    };

    fetchPopulationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrefectures, prefectures, selectedPopulationLabel]);

  return {
    populationData,
    selectedPopulationLabel,
    setSelectedPopulationLabel,
  };
};

async function fetchPopulation(prefCode: number): Promise<PopulationResponse> {
  try {
    const res = await fetch(`/api/prefectures/${prefCode}/population`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch population data");
  }
}
