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

  // ⚠️ 보안: 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { error: "유효한 이메일 주소를 입력해주세요." };
  }

  // ⚠️ 보안: 비밀번호 최소 길이 검증
  if (password.length < 6) {
    return { error: "비밀번호는 최소 6자 이상이어야 합니다." };
  }

  // ⚠️ 보안: 비밀번호 최대 길이 제한 (DoS 공격 방지)
  if (password.length > 128) {
    return { error: "비밀번호는 128자 이하여야 합니다." };
  }

  // ⚠️ 보안: 이름 길이 제한
  if (name && name.trim().length > 50) {
    return { error: "이름은 50자 이하여야 합니다." };
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
        email: email.trim().toLowerCase(), // 이메일 정규화
        name: name?.trim() || null,
        password: hashedPassword,
      },
    });
    return { success: "회원가입이 완료되었습니다! 로그인해주세요." };
  } catch (error) {
    return { error: "회원가입 중 오류가 발생했습니다." };
  }
}
