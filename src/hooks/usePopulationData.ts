import { useEffect, useState } from "react";
import { PopulationLabel, PopulationResponse, Prefecture } from "@/types";

type PopulationChartData = {
  year: number;
  [key: string]: number;
};

export const usePopulationData = (
  selectedPrefectures: number[],
  prefectures: Prefecture[],
  selectedPopulationLabel: PopulationLabel
) => {
  const [populationData, setPopulationData] = useState<PopulationChartData[]>(
    []
  );

  useEffect(() => {
    const fetchPopulationData = async () => {
      // まだデータがフェッチされていない選択された都道府県を取得
      const newSelectedPrefectures = selectedPrefectures.filter(
        (prefCode) =>
          !populationData.some(
            (data) => data[getPrefName(prefCode)] !== undefined
          )
      );

      // 新しく選択された都道府県の人口データを並行してフェッチ
      const promises = newSelectedPrefectures.map((prefCode) =>
        fetchPopulation(prefCode)
      );
      const populationDataArray = await Promise.all(promises);

      const newData: PopulationChartData[] = [...populationData];

      // フェッチしたデータを既存のデータにマージ
      populationDataArray.forEach((prefectureData, index) => {
        const prefCode = newSelectedPrefectures[index];
        const prefName = getPrefName(prefCode);

        prefectureData
          .find(({ label }) => label === selectedPopulationLabel)
          ?.data.forEach((item) => {
            const existingItem = newData.find((d) => d.year === item.year);
            if (existingItem) {
              existingItem[prefName] = item.value;
            } else {
              newData.push({ year: item.year, [prefName]: item.value });
            }
          });
      });

      // 選択された都道府県のデータのみを含む新しい配列を作成
      const updatedData = newData.map((item) => {
        const filteredItem: PopulationChartData = { year: item.year };
        selectedPrefectures.forEach((prefCode) => {
          const prefName = getPrefName(prefCode);
          filteredItem[prefName] = item[prefName];
        });
        return filteredItem;
      });

      setPopulationData(updatedData);
    };

    fetchPopulationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrefectures, prefectures, selectedPopulationLabel]);

  // 都道府県コードから都道府県名を取得するヘルパー関数
  const getPrefName = (prefCode: number) => {
    return prefectures.find((p) => p.prefCode === prefCode)?.prefName || "";
  };

  return { populationData };
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
