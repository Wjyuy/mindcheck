// app/api/share/[resultId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Next.js Route Handler의 두 번째 인자(context)에 대한 타입을 명시적으로 정의합니다.
// 이는 Next.js 내부적으로 기대하는 타입 구조와 일치시킵니다.
interface RouteContext {
  params: {
    resultId: string;
  };
}

export async function POST(
  request: NextRequest,
  context: RouteContext // RouteContext 인터페이스를 사용하여 타입을 명시합니다.
) {
  // context.params에서 resultId를 안전하게 비구조화합니다.
  const { resultId } = context.params;
  const body = await request.json(); // 요청 바디 파싱 (예: { platform: 'kakao' })

  // 실제 애플리케이션에서는:
  // 1. resultId 유효성 검사
  // 2. 데이터베이스 연결 (예: Firestore)
  // 3. 해당 resultId의 공유 횟수를 증가시킵니다.
  // 4. 업데이트된 공유 횟수 또는 성공 메시지를 반환합니다.

  console.log(`[API] Share event received for resultId: ${resultId}, Platform: ${body.platform || 'unknown'}`);

  // 현재는 목업 응답을 반환합니다.
  // 실제 데이터베이스 연동 시에는 여기에 Firestore 업데이트 로직이 들어갑니다.
  return NextResponse.json({ success: true, message: `Share count updated for ${resultId}` }, { status: 200 });
}
