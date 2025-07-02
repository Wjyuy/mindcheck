// lib/hooks/useTestState.ts
import { useState, useEffect, useCallback } from 'react';
import { Question, UserAnswer, EmotionCategory } from '@/types/project.d';
import questionsData from '@/lib/data/questions.json'; // 모의 질문 데이터 임포트
import { calculateEmotionalState } from '@/lib/algorithms/emotionAnalyzer'; // 감정 분석 알고리즘 임포트

/**
 * 심리테스트 플로우의 상태를 관리하는 커스텀 훅입니다.
 * 현재 질문 인덱스, 사용자 답변, 질문 데이터 로딩 상태 등을 관리합니다.
 */
const useTestState = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [testResultEmotion, setTestResultEmotion] = useState<EmotionCategory | null>(null); // 분석된 감정 결과 상태 추가

  // 컴포넌트 마운트 시 질문 데이터를 로드합니다.
  // 실제 API 연동 시에는 fetch 등을 사용하여 데이터를 가져옵니다.
  useEffect(() => {
    try {
      // JSON 데이터는 이미 임포트되었으므로, 바로 사용합니다.
      // 실제 프로덕션에서는 서버 API를 통해 데이터를 가져오는 로직이 들어갑니다.
      setQuestions(questionsData as Question[]); // 타입 단언
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to load questions data:", err);
      setError("질문 데이터를 불러오는 데 실패했습니다.");
      setIsLoading(false);
    }
  }, []); // 의존성 배열이 비어있으므로 컴포넌트 마운트 시 한 번만 실행됩니다.

  /**
   * 사용자가 현재 질문에 답변을 제출했을 때 호출됩니다.
   * 답변을 기록하고 다음 질문으로 이동합니다.
   * @param selectedOption - 사용자가 선택한 옵션 ('A' 또는 'B')
   */
  const submitAnswer = useCallback((selectedOption: 'A' | 'B') => {
    if (isLoading || error || currentQuestionIndex >= questions.length) {
      return; // 데이터 로딩 중이거나 오류가 있거나 마지막 질문을 넘어섰으면 아무것도 하지 않습니다.
    }

    const newAnswer: UserAnswer = {
      questionId: questions[currentQuestionIndex].id,
      selectedOption,
      timestamp: new Date(),
    };

    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }, [currentQuestionIndex, questions, isLoading, error]);

  /**
   * 이전 질문으로 돌아갑니다.
   * 마지막 답변을 제거하고 이전 질문 인덱스로 돌아갑니다.
   */
  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setUserAnswers((prevAnswers) => prevAnswers.slice(0, prevAnswers.length - 1));
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setTestResultEmotion(null); // 이전 질문으로 돌아가면 결과 초기화
    }
  }, [currentQuestionIndex]);

  /**
   * 테스트를 초기 상태로 리셋합니다.
   */
  const resetTest = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTestResultEmotion(null); // 결과도 리셋
    setError(null); // 오류 상태도 리셋
  }, []);

  // 테스트가 완료되었는지 여부를 반환합니다.
  const isTestCompleted = currentQuestionIndex >= questions.length && questions.length > 0;

  // 테스트가 완료되면 감정 분석을 수행합니다.
  useEffect(() => {
    if (isTestCompleted && userAnswers.length === questions.length && questions.length > 0) {
      const result = calculateEmotionalState(userAnswers, questions);
      setTestResultEmotion(result);
    }
  }, [isTestCompleted, userAnswers, questions]); // isTestCompleted, userAnswers, questions 변경 시 실행

  return {
    currentQuestionIndex,
    userAnswers,
    questions,
    isLoading,
    error,
    submitAnswer,
    goToPreviousQuestion,
    resetTest,
    isTestCompleted,
    totalQuestions: questions.length,
    currentQuestion: questions[currentQuestionIndex], // 현재 질문 객체
    testResultEmotion, // 분석된 감정 결과 추가
  };
};

export default useTestState;
