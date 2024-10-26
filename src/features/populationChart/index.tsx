"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Prefecture } from "@/types";
import { useSelectedPrefecturesStore } from "@/stores/selectedPrefectures";
import { usePopulationData } from "@/hooks/usePopulationData";
import styles from "./index.module.css";
import { populationLabels } from "@/constants";

type Props = {
  prefectures: Prefecture[];
};

export default function PopulationChart({ prefectures }: Props) {
  const { selectedPrefectures } = useSelectedPrefecturesStore();
  const {
    populationData,
    selectedPopulationLabel,
    setSelectedPopulationLabel,
  } = usePopulationData(selectedPrefectures, prefectures);

  return (
    <div className={styles.lineChartContainer}>
      <div className={styles.populationLabels}>
        {populationLabels.map((populationLabel) => (
          <button
            type="button"
            key={populationLabel}
            className={`${styles.populationLabel} ${
              selectedPopulationLabel === populationLabel ? styles.active : ""
            }`}
            onClick={() => setSelectedPopulationLabel(populationLabel)}
          >
            {populationLabel}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={populationData} className={styles.lineChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            height={50}
            padding={{ left: 20, right: 20 }}
            label={{
              value: "年度(年)",
              position: "insideBottom",
              offset: 0,
            }}
          />
          <YAxis
            tickFormatter={(value) => `${value / 10000}`}
            label={{
              value: "人口数(万人)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#ffffffcc" }}
            wrapperStyle={{
              maxHeight: 200,
              overflowY: "auto",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={60}
            wrapperStyle={{
              overflowY: "auto",
            }}
          />
          {Object.keys(populationData[0] || {})
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
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 8 }}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
