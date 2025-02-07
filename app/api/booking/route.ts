import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, whatsapp, instagram, bookingDate, bookingTime, sessionType, referralCode } = data;

    // Cek apakah referralCode valid
    let referrer = null;
    if (referralCode) {
      referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
    }

    const newBooking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        whatsapp,
        instagram,
        bookingDate: new Date(bookingDate),
        bookingTime,
        sessionType,
        referralCode: referrer ? referralCode : null, // Simpan referralCode hanya jika valid
      },
    });

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan", message: req }, { status: 500 });
  }
}
