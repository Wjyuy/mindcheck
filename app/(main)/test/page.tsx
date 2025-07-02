// app/(main)/test/page.tsx
'use client'; // 클라이언트 컴포넌트로 지정

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13+ App Router에서 라우팅을 위해 사용
import useTestState from '@/lib/hooks/useTestState'; // 커스텀 훅 임포트
import QuestionCard from '@/components/test/QuestionCard'; // QuestionCard 컴포넌트 임포트
import ProgressBar from '@/components/test/ProgressBar'; // ProgressBar 컴포넌트 임포트
import Button from '@/components/ui/Button'; // Button 컴포넌트 임포트
import { getHealingMessage } from '@/lib/services/messageService'; // 힐링 메시지 추천 서비스 임포트

/**
 * 심리테스트 페이지 컴포넌트
 * 질문을 표시하고, 사용자의 답변을 받으며, 진행 상황을 보여줍니다.
 */
const TestPage: React.FC = () => {
  const router = useRouter(); // 라우터 훅 초기화

  // useTestState 훅을 사용하여 테스트 상태 및 함수 가져오기
  const {
    currentQuestionIndex,
    userAnswers,
    questions,
    isLoading,
    error,
    submitAnswer,
    goToPreviousQuestion,
    resetTest,
    isTestCompleted,
    totalQuestions,
    currentQuestion,
    testResultEmotion, // 분석된 감정 결과 가져오기
  } = useTestState();

  // 테스트 완료 시 결과 페이지로 리다이렉트
  useEffect(() => {
    if (isTestCompleted && testResultEmotion) { // 테스트 완료 및 감정 결과가 있을 때만 리다이렉트
      console.log("Test Completed! User Answers:", userAnswers);
      console.log("Test Result Emotion:", testResultEmotion);

      // 감정 결과에 따라 힐링 메시지 추천
      const recommendedMessage = getHealingMessage(testResultEmotion);

      if (recommendedMessage) {
        // 결과 페이지로 이동 시, 감정 결과와 추천 메시지 ID를 쿼리 파라미터로 전달
        router.push(`/result?emotion=${testResultEmotion}&messageId=${recommendedMessage.id}`);
      } else {
        // 메시지를 찾지 못했을 경우 기본 결과 페이지 또는 에러 처리
        router.push(`/result?emotion=${testResultEmotion}`);
      }
    }
  }, [isTestCompleted, userAnswers, router, testResultEmotion]); // testResultEmotion을 의존성 배열에 추가

  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300">
        <p className="text-xl font-semibold animate-pulse">질문을 불러오는 중입니다...</p>
        <div className="mt-4 h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  // 오류 발생 시 표시할 UI
  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center text-red-600 dark:text-red-400">
        <p className="text-xl font-semibold">오류 발생: {error}</p>
        <Button onClick={resetTest} variant="primary" className="mt-4">
          다시 시도하기
        </Button>
      </div>
    );
  }

  // 현재 질문이 없거나, 테스트가 완료된 상태가 아닌데 질문이 없는 경우
  if (!currentQuestion && !isTestCompleted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300">
        <p className="text-xl font-semibold">질문이 없습니다. 데이터를 확인해주세요.</p>
        <Button onClick={resetTest} variant="primary" className="mt-4">
          테스트 초기화
        </Button>
      </div>
    );
  }

  // 테스트 진행 중일 때 표시할 UI
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      {/* 프로그레스 바 */}
      <div className="mb-8 w-full max-w-md">
        <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={totalQuestions} />
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {currentQuestionIndex + 1} / {totalQuestions}
        </p>
      </div>

      {/* 질문 카드 */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          onAnswer={submitAnswer} // 답변 제출 시 submitAnswer 호출
        />
      )}

      {/* 네비게이션 버튼 (이전 질문으로 돌아가기) */}
      {currentQuestionIndex > 0 && (
        <Button
          variant="ghost"
          size="md"
          onClick={goToPreviousQuestion}
          className="mt-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          이전 질문
        </Button>
      )}
    </div>
  );
};

export default TestPage;
