import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { kakaoId: "4630139718" },
    });
    if (user?.role === "Admin") {
      return NextResponse.json({ isAdmin: true });
    }
    return NextResponse.json({ isAdmin: false }, { status: 403 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
