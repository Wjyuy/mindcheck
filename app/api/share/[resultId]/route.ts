// app/api/share/[resultId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  // Next.js 공식 문서에 따라 params를 Promise로 감싸진 객체로 받습니다.
  { params }: { params: Promise<{ resultId: string }> }
) {
  // params가 Promise이므로, 사용하기 전에 await 해야 합니다.
  const awaitedParams = await params;
  const { resultId } = awaitedParams;

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
