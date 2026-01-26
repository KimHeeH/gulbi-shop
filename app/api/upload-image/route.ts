import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const file = request.body;
  const formData = await request.formData();
  const imageFile = formData.get("image") as File | null;
  if (!imageFile) {
    return NextResponse.json(
      { message: "이미지 파일이 필요합니다." },
      { status: 400 }
    );
  }
  const filename = `${Date.now()}_${imageFile.name.replaceAll(" ", "_")}`;
  try {
    const blob = await put(filename, imageFile, {
      access: "public", // 공개 접근 가능하도록 설정
      // contentType: imageFile.type, // 파일 타입 자동 감지됨
    });

    // 3. Vercel Blob이 저장 후 반환한 URL을 클라이언트에게 전달
    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("Vercel Blob 업로드 실패:", error);
    return NextResponse.json(
      { message: "이미지 업로드 중 오류 발생" },
      { status: 500 }
    );
  }
}
