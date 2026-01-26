import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ count: 0 });

  const result = await prisma.cartItem.aggregate({
    where: { userId: session.user.id },
    _sum: { quantity: true },
  });
  return NextResponse.json({ count: result._sum.quantity || 0 });
}
