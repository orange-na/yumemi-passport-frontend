import { render, screen, fireEvent } from "@testing-library/react";
import PrefectureCheckbox from "./index";
import { useSelectedPrefecturesStore } from "@/stores/selectedPrefectures";

const mockPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 3, prefName: "岩手県" },
];

jest.mock("@/stores/selectedPrefectures", () => ({
  useSelectedPrefecturesStore: jest.fn().mockReturnValue({
    selectedPrefectures: [1, 2],
    togglePrefecture: jest.fn(),
  }),
}));

describe("PrefectureCheckbox", () => {
  test("都道府県のチェックボックスが表示される", () => {
    render(<PrefectureCheckbox prefectures={mockPrefectures} />);

    expect(screen.getByText("北海道")).toBeInTheDocument();
    expect(screen.getByText("青森県")).toBeInTheDocument();
    expect(screen.getByText("岩手県")).toBeInTheDocument();
  });

  test("選択された都道府県のチェックボックスがチェックされている", () => {
    render(<PrefectureCheckbox prefectures={mockPrefectures} />);

    expect(screen.getByLabelText("北海道")).toBeChecked();
    expect(screen.getByLabelText("青森県")).toBeChecked();
    expect(screen.getByLabelText("岩手県")).not.toBeChecked();
  });

  test("チェックボックスをクリックすると選択された都道府県が変更される", () => {
    const togglePrefectureMock = jest.fn();
    jest.mocked(useSelectedPrefecturesStore).mockReturnValue({
      selectedPrefectures: [1, 2],
      togglePrefecture: togglePrefectureMock,
    });

    render(<PrefectureCheckbox prefectures={mockPrefectures} />);

    fireEvent.click(screen.getByLabelText("岩手県"));

    expect(togglePrefectureMock).toHaveBeenCalledWith(3);
  });
});
