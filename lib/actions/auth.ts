"use server";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 모두 입력해주세요" };
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return {
        error: "이미 가입된 이메일입니다.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return { success: "회원가입이 완료되었습니다! 로그인해주세요." };
  } catch (error) {
    return { error: "회원가입 중 오류가 발생했습니다." };
  }
}
