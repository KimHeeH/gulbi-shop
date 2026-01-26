-- 외래키 제약조건을 User.kakaoId에서 User.id로 변경하는 마이그레이션

-- 1. 기존 외래키 제약조건 삭제 (orders 테이블)
ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_userId_fkey";

-- 2. 새로운 외래키 제약조건 추가 (User.id 참조)
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

