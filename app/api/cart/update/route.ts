import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ count: 0 });
  const body = await req.json();
  const { cartItemId, quantity } = body;
  const updatedCartItem = await prisma.cartItem.update({
    where: { userId: session.user.id, id: cartItemId },
    data: { quantity: quantity },
  });
  return NextResponse.json(updatedCartItem);
}
