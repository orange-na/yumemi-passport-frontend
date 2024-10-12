import { env } from "@/env/env";
import { Prefecture } from "@/types";

export async function fetchPrefectures(): Promise<Prefecture[]> {
  const response = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": env.RESAS_API_KEY,
      },
    }
  );
  const data = await response.json();
  return data.result;
}
