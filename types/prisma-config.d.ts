// Prisma CLI의 config 모듈에 대한 간단한 타입 선언
declare module "prisma/config" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function defineConfig(config: any): any;
}
