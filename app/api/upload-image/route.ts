import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { message: "이미지 파일이 필요합니다." },
        { status: 400 }
      );
    }

    const filename = `${Date.now()}_${imageFile.name.replaceAll(" ", "_")}`;

    const blob = await put(filename, imageFile, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("❌ 이미지 업로드 실패:", error);
    return NextResponse.json(
      { message: "이미지 업로드 중 오류 발생" },
      { status: 500 }
    );
  }
}
