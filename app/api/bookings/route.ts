import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings", details: error }, { status: 500 });
  }
}
