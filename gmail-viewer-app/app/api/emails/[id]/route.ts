import { getEmailDetail } from "@/lib/gmail-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const email = await getEmailDetail(id);
    
    if (!email) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(email);
  } catch (error) {
    console.error("Error fetching email details:", error);
    return NextResponse.json(
      { error: "Failed to fetch email details" },
      { status: 500 }
    );
  }
}