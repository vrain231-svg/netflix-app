import { getEmails } from "@/lib/gmail-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const emails = await getEmails();
    
    return NextResponse.json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}