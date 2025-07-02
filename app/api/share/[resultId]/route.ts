// app/api/share/[resultId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// RouteContext 인터페이스는 더 이상 사용하지 않습니다.

export async function POST(
  request: NextRequest,
  // Next.js App Router의 Route Handler에서 params를 받는 가장 일반적인 방식입니다.
  // 두 번째 인자에서 직접 params를 비구조화하고 인라인으로 타입을 정의합니다.
  { params }: { params: { resultId: string } }
) {
  // params 객체는 Next.js에 의해 이미 준비되어 있으므로, 직접 await할 필요가 없습니다.
  const { resultId } = params;
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
