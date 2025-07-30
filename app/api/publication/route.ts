import { getPublication } from "@/app/repository/get";
import { updatePublication } from "@/app/repository/update";
import { upsertPublication } from "@/app/repository/upsert";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await upsertPublication(data);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[Upsert Error]", error);
    return NextResponse.json(
      { success: false, error: "Upsert failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await updatePublication(data);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
  if (error instanceof Error) {
    if (error.message === "Publication not found") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
  }
}

export async function GET() {
  try {
    const result = await getPublication();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}
