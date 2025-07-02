// types/project.d.ts

/**
 * 프로젝트 전반에서 사용되는 핵심 TypeScript 타입 정의
 */

// 감정 카테고리 타입 정의
export type EmotionCategory = // <-- export 추가
  | 'stress'        // 스트레스/불안
  | 'depression'    // 우울/무기력
  | 'anger'         // 분노/짜증
  | 'loneliness'    // 외로움/고독
  | 'fatigue'       // 피로/번아웃
  | 'confusion';     // 혼란/방향성상실

/**
 * 심리테스트 질문 데이터 타입
 */
export interface Question { // <-- export 추가
  id: number;
  question: string;
  optionA: {
    text: string;
    value: EmotionCategory; // 이 옵션 선택 시 영향을 줄 감정 카테고리
    weight: number;         // 해당 카테고리에 부여할 가중치
  };
  optionB: {
    text: string;
    value: EmotionCategory; // 이 옵션 선택 시 영향을 줄 감정 카테고리
    weight: number;         // 해당 카테고리에 부여할 가중치
  };
}

/**
 * 사용자 답변 데이터 타입
 */
export interface UserAnswer { // <-- export 추가
  questionId: number;
  selectedOption: 'A' | 'B';
  timestamp: Date; // 답변 시점 (클라이언트에서 생성)
}

/**
 * 테스트 세션 데이터 타입 (저장 및 분석용)
 */
export interface TestSession { // <-- export 추가
  sessionId: string;
  answers: UserAnswer[];
  result?: EmotionCategory; // 테스트 완료 후 진단된 감정 카테고리
  completedAt?: Date;      // 테스트 완료 시점
}

/**
 * 힐링 메시지 데이터 타입
 */
export interface HealingMessage { // <-- export 추가
  id: string;
  category: EmotionCategory; // 이 메시지가 속하는 감정 카테고리
  message: string;
  author?: string;           // 선택 사항: 문구 작성자
  tags: string[];            // 관련 키워드 태그
  popularity: number;        // 공유 횟수 등 인기도 지표
}

/**
 * API 응답 타입 정의
 */

/**
 * GET /api/questions 응답 타입
 */
export interface QuestionsResponse { // <-- export 추가
  questions: Question[];
}

/**
 * POST /api/submit-test 요청 바디 타입
 */
export interface SubmitTestRequest { // <-- export 추가
  answers: UserAnswer[];
}

/**
 * POST /api/submit-test 응답 타입
 */
export interface SubmitTestResponse { // <-- export 추가
  emotionalState: EmotionCategory; // 진단된 감정 상태
  message: HealingMessage;         // 추천된 힐링 문구
  sessionId: string;               // 생성된 테스트 세션 ID
}

/**
 * GET /api/healing-messages/:category 응답 타입
 */
export interface HealingMessagesResponse { // <-- export 추가
  messages: HealingMessage[]; // 해당 카테고리의 힐링 문구 목록
  total: number;              // 전체 문구 수
}

/**
 * POST /api/share/:resultId 응답 타입
 */
export interface ShareResponse { // <-- export 추가
  success: boolean;
  shareCount: number; // 업데이트된 공유 횟수
}

/**
 * 감정 분석 알고리즘 함수 시그니처
 */
export type CalculateEmotionalState = ( // <-- export 추가
  answers: UserAnswer[],
  questions: Question[]
) => EmotionCategory;
