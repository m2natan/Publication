import { getPublicationBySearch } from "@/app/repository/get";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const searchParam = req.nextUrl.searchParams.get('q') || '';
    const result = await getPublicationBySearch(searchParam); // pass to DB
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
