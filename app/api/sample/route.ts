import { getPublicationSample } from "@/app/repository/get";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getPublicationSample();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}