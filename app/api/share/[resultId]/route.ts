// app/api/share/[resultId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params: awaitedParams }: { params: Promise<{ resultId: string }> | { resultId: string } } // params 타입을 Promise로도 받을 수 있도록 수정
) {
  // params 객체를 await하여 실제 값을 가져옵니다.
  const params = await awaitedParams;
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
