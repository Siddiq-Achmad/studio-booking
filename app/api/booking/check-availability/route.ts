import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { bookingDate } = await req.json();

    if (!bookingDate) {
      return NextResponse.json({ error: "Tanggal booking wajib diisi" }, { status: 400 });
    }

    // Konversi bookingDate ke DateTime dan tambahkan durasi 20 menit
    const startDateTime = moment(bookingDate).toDate(); // Booking DateTime awal
    const endDateTime = moment(bookingDate).add(20, "minutes").toDate(); // Booking DateTime + 20 menit

    // Cek apakah ada booking lain dalam rentang waktu ini
    const existingBooking = await prisma.booking.findFirst({
      where: {
        OR: [
          {
            // Jika bookingDate baru berada dalam rentang booking yang sudah ada
            bookingDate: {
              gte: startDateTime, // Booking baru mulai setelah atau sama dengan booking yang ada
              lt: endDateTime, // Booking baru selesai sebelum booking yang ada selesai
            },
          },
        //   {
        //     // Jika booking yang sudah ada berada dalam rentang booking baru
        //     bookingDate: {
        //       lt: startDateTime, // Booking lama dimulai sebelum booking baru
        //     },
        //     endBookingDate: {
        //       gt: startDateTime, // Booking lama selesai setelah booking baru dimulai
        //     },
        //   },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json({
        available: false,
        message: `Sudah ada booking antara ${startDateTime} - ${endDateTime}`,
      });
    }

    return NextResponse.json({ available: true, message: "Waktu tersedia!" });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
