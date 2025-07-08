# mindcheck
Mindcheck is a detox healing phrase recommendation service, a web application that provides users with mental healing through dopamine detox in a modern society overflowing with hatred.

## 📋 프로젝트 개요

### 프로젝트명

도파민 디톡스 힐링 문구 추천 서비스

### 컨셉

혐오가 넘쳐나는 현대 사회에서 사용자에게 도파민 디톡스를 통한 정신적 힐링을 제공하는 웹 애플리케이션

### 핵심 기능

- 심리테스트 형식의 감정 상태 진단
- 개인화된 힐링 문구 추천
- 결과 공유 기능
- 광고 수익화 (Google AdSense)

---

## 🎯 비즈니스 요구사항

### 타겟 사용자

- 스트레스를 받는 현대인
- 정신적 힐링을 원하는 사용자
- SNS 공유를 즐기는 사용자층

### 핵심 가치 제안

1. 간단한 심리테스트를 통한 현재 감정 상태 파악
2. 맞춤형 힐링 문구 제공
3. 도파민 디톡스를 통한 정신 건강 개선

---

## 🏗️ 시스템 아키텍처

### 기술 스택

- **Frontend Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5.0+
- **Deployment**: Vercel
- **Styling**: Tailwind CSS / CSS Modules
- **Database**:
    - 개발/프로토타입: JSON 파일 또는 로컬 스토리지
    - 프로덕션: Vercel KV (Redis) 또는 PlanetScale (MySQL)
- **Analytics**: Google Analytics 4
- **Monetization**: Google AdSense
- **SEO**: Next.js built-in SEO 최적화
- **Package Manager**: pnpm (성능 최적화)
- **Code Quality**: ESLint, Prettier, Husky (pre-commit hooks)

### 배포 환경

- **개발**: Vercel Preview 환경
- **스테이징**: Vercel Preview 브랜치
- **프로덕션**: Vercel 프로덕션 환경

---

## 🔧 핵심 기능 명세

### 1. 심리테스트 시스템

### 테스트 플로우

```
시작 페이지 → 질문 1 (A/B 선택) → 질문 2 (A/B 선택) → ... → 결과 페이지

```

### 기능 요구사항

- **질문 수**: 5-10개 질문 (UX 고려하여 조정 가능)
- **선택 방식**: A/B 이분법적 선택
- **진행률 표시**: 프로그레스 바
- **뒤로가기 기능**: 이전 질문으로 돌아가기 가능
- **반응형 디자인**: 모바일 우선 설계

### 데이터 구조 (TypeScript)

```tsx
// 질문 데이터 타입 정의
interface Question {
  id: number;
  question: string;
  optionA: {
    text: string;
    value: EmotionCategory;
    weight: number;
  };
  optionB: {
    text: string;
    value: EmotionCategory;
    weight: number;
  };
}

// 감정 카테고리 타입
type EmotionCategory =
  | 'stress'
  | 'depression'
  | 'anger'
  | 'loneliness'
  | 'fatigue'
  | 'confusion';

// 사용자 답변 데이터 타입
interface UserAnswer {
  questionId: number;
  selectedOption: 'A' | 'B';
  timestamp: Date;
}

interface TestSession {
  sessionId: string;
  answers: UserAnswer[];
  result?: EmotionCategory;
  completedAt?: Date;
}

// 힐링 메시지 타입
interface HealingMessage {
  id: string;
  category: EmotionCategory;
  message: string;
  author?: string;
  tags: string[];
  popularity: number;
}

```

### 2. 감정 분석 시스템

### 감정 카테고리

1. **스트레스/불안** - 압박감, 걱정이 많은 상태
2. **우울/무기력** - 의욕 없음, 슬픈 상태
3. **분노/짜증** - 화가 나거나 예민한 상태
4. **외로움/고독** - 혼자라는 느낌, 소외감
5. **피로/번아웃** - 신체적/정신적 소진 상태
6. **혼란/방향성상실** - 어떻게 해야 할지 모르는 상태

### 분석 알고리즘 (TypeScript)

```tsx
// 감정 점수 계산 로직
function calculateEmotionalState(answers: UserAnswer[], questions: Question[]): EmotionCategory {
  const scores: Record<EmotionCategory, number> = {
    stress: 0,
    depression: 0,
    anger: 0,
    loneliness: 0,
    fatigue: 0,
    confusion: 0
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const selectedValue = answer.selectedOption === 'A'
      ? question.optionA.value
      : question.optionB.value;

    scores[selectedValue] += 1;
  });

  return (Object.keys(scores) as EmotionCategory[]).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
}

// API 응답 타입
interface TestResultResponse {
  emotionalState: EmotionCategory;
  message: HealingMessage;
  sessionId: string;
}

```

### 3. 힐링 문구 추천 시스템

### 문구 데이터베이스

```jsx
// 힐링 문구 데이터 구조
{
  id: string,
  category: string, // 감정 카테고리와 매칭
  message: string,
  author?: string, // 선택사항
  tags: Array<string>,
  popularity: number // 공유 횟수 기반
}

```

### 추천 로직

- 감정 상태에 따른 맞춤 문구 필터링
- 랜덤 요소 추가로 재방문시 다른 문구 제공
- 인기도 기반 가중치 적용

### 4. 결과 페이지

### 표시 정보

- 진단된 감정 상태 (친근한 톤으로 설명)
- 맞춤 힐링 문구
- 공유하기 버튼 (카카오톡, 인스타그램, 페이스북, 링크 복사)
- 다시 테스트하기 버튼
- Google AdSense 광고 배치

### 공유 기능

```jsx
// 공유 데이터 구조
{
  title: "나의 현재 감정 상태는?",
  description: "힐링 문구와 함께하는 도파민 디톡스",
  image: "결과 이미지 URL", // 동적 생성 또는 미리 제작
  url: "결과 페이지 고유 URL"
}

```

---

## 📱 사용자 인터페이스 (UI/UX)

### 디자인 원칙

- **미니멀리즘**: 심플하고 깔끔한 디자인
- **힐링감**: 부드러운 색상, 편안한 폰트
- **직관성**: 명확한 CTA, 쉬운 네비게이션
- **모바일 우선**: 터치 친화적 인터페이스

### 색상 팔레트

- 주색상: 파스텔 블루/그린 계열
- 보조색상: 따뜻한 베이지/아이보리
- 강조색상: 부드러운 코랄/핑크

### 주요 페이지 구성

### 1. 랜딩 페이지

- 서비스 소개
- "테스트 시작하기" CTA
- 간단한 사용법 안내

### 2. 테스트 페이지

- 질문 표시
- A/B 선택 버튼
- 진행률 바
- 이전/다음 네비게이션

### 3. 결과 페이지

- 감정 상태 결과
- 힐링 문구
- 공유 버튼들
- 재시작 버튼

---

## 🔌 API 설계

### RESTful API 엔드포인트 (TypeScript)

```tsx
// API 엔드포인트 타입 정의
interface QuestionsResponse {
  questions: Question[];
}

interface SubmitTestRequest {
  answers: UserAnswer[];
}

interface SubmitTestResponse {
  emotionalState: EmotionCategory;
  message: HealingMessage;
  sessionId: string;
}

interface HealingMessagesResponse {
  messages: HealingMessage[];
  total: number;
}

// API 라우트
GET /api/questions
- Response: QuestionsResponse

POST /api/submit-test
- Body: SubmitTestRequest
- Response: SubmitTestResponse

GET /api/healing-messages/:category
- Params: { category: EmotionCategory }
- Response: HealingMessagesResponse

POST /api/share/:resultId
- Response: { success: boolean; shareCount: number }

```

---

## 📊 데이터베이스 설계

### 주요 테이블/컬렉션

### Questions (질문)

```sql
{
  id: PRIMARY KEY,
  question_text: TEXT,
  option_a_text: TEXT,
  option_a_value: VARCHAR(50),
  option_b_text: TEXT,
  option_b_value: VARCHAR(50),
  order_index: INTEGER
}

```

### HealingMessages (힐링 문구)

```sql
{
  id: PRIMARY KEY,
  category: VARCHAR(50),
  message: TEXT,
  author: VARCHAR(100),
  created_at: TIMESTAMP,
  popularity_score: INTEGER
}

```

### TestResults (테스트 결과 - 분석용)

```sql
{
  id: PRIMARY KEY,
  session_id: VARCHAR(100),
  emotional_state: VARCHAR(50),
  completed_at: TIMESTAMP,
  shared_count: INTEGER
}

```

---

## 💰 수익화 전략

### Google AdSense 통합

- **배치 위치**: 결과 페이지 하단, 사이드바
- **광고 타입**: 디스플레이, 네이티브 광고
- **최적화**: 사용자 경험 해치지 않는 선에서 수익 극대화

### 향후 확장 계획

- 프리미엄 힐링 문구 구독 서비스
- 개인화된 일일 메시지 푸시
- 기업용 직원 웰빙 솔루션
