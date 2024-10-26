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
      const promises = selectedPrefectures.map((prefCode) =>
        fetchPopulation(prefCode)
      );
      const populationDataArray = await Promise.all(promises);
      const newData: PopulationChartData[] = [];

      populationDataArray.forEach((prefectureData, index) => {
        const prefCode = selectedPrefectures[index];
        const prefName = prefectures.find(
          (p) => p.prefCode === prefCode
        )?.prefName;

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
      });

      setPopulationData(newData);
    };

    fetchPopulationData();
  }, [selectedPrefectures, prefectures, selectedPopulationLabel]);

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
