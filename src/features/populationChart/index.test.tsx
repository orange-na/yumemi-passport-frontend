import { render, screen, fireEvent } from "@testing-library/react";
import PopulationChart from "./index";

const mockPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
];

jest.mock("@/stores/selectedPrefectures", () => ({
  useSelectedPrefecturesStore: jest.fn().mockReturnValue({
    selectedPrefectures: [1, 2],
  }),
}));

describe("PopulationChart", () => {
  test("グラフチャートが表示", async () => {
    render(<PopulationChart prefectures={mockPrefectures} />);

    expect(screen.getByText("総人口")).toBeInTheDocument();
    expect(screen.getByText("年少人口")).toBeInTheDocument();
  });

  test("人口ラベルのボタンをクリックすると選択されたラベルが変更される", async () => {
    render(<PopulationChart prefectures={mockPrefectures} />);

    fireEvent.click(screen.getByRole("button", { name: "年少人口" }));

    expect(screen.getByRole("button", { name: "年少人口" })).toHaveClass(
      "active"
    );
  });
});
