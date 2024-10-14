import { env } from "@/env/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { prefCode: string } }
) {
  const { prefCode } = params;
  try {
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": env.RESAS_API_KEY,
        },
      }
    );
    const data = await res.json();

    return new NextResponse(JSON.stringify(data.result.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }
}
