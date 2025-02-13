import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";


// export async function GET() {
//   try {
//     const bookings = await prisma.booking.findMany();
    
//     return NextResponse.json(bookings);
//   } catch (error) {
//     console.error("Database fetch error:", error);
//     return NextResponse.json({ error: "Failed to fetch bookings", details: error }, { status: 500 });
//   }
// }

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const statusParam = searchParams.get("status"); // Ambil status sebagai string
    const validStatuses = ["PAID", "HALFPAID", "UNPAID", "CANCELED"] as const;
    
    // Validasi status, hanya izinkan jika termasuk dalam daftar valid
    const status = validStatuses.includes(statusParam as any) ? (statusParam as Status) : undefined;


    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
          { referralCode: { contains: search, mode: "insensitive" } },
        ],
        status: status, // Hanya gunakan status jika valid
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        bookingDate: true,
        bookingTime: true,
        sessionType: true,
        referralCode: true,
        status: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
