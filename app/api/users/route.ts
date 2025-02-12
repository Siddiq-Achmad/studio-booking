import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {

    // 🔹 Ambil sesi user
  const session = await getServerSession(authOptions);

  if (!session?.user?.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

//   if (session.user.role !== "ADMIN") {
//     return NextResponse.json({ error: "Forbidden: You don't have permission" }, { status: 403 });
//   }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        referralCode: true
      },
    });

    if (!users) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
