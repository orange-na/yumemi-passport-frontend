import { env } from "@/env/env";
import { Prefecture } from "@/types";

export async function fetchPrefectures(): Promise<Prefecture[]> {
  try {
    const res = await fetch(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      {
        headers: {
          "X-API-KEY": env.RESAS_API_KEY,
        },
        cache: "force-cache",
      }
    );
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch prefectures");
  }
}
