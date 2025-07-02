// components/test/QuestionCard.tsx
import React from 'react';
import Button from '@/components/ui/Button'; // Button 컴포넌트 임포트
import { Question, EmotionCategory } from '@/types/project.d'; // Question 타입 임포트

/**
 * QuestionCard 컴포넌트의 props 타입 정의
 * @param question - 표시할 질문 데이터 (Question 타입)
 * @param onAnswer - 사용자가 답변을 선택했을 때 호출될 콜백 함수. 선택된 옵션 ('A' 또는 'B')을 인자로 전달합니다.
 */
interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOption: 'A' | 'B') => void;
}

/**
 * 심리테스트의 단일 질문을 표시하고 답변을 선택할 수 있는 카드 컴포넌트입니다.
 *
 * @param {QuestionCardProps} props - QuestionCard 컴포넌트의 속성
 */
const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 md:p-8 animate-fade-in">
      {/* 질문 텍스트 */}
      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900 dark:text-gray-100 md:text-3xl">
        {question.question}
      </h2>

      {/* 답변 옵션 버튼들 */}
      <div className="flex flex-col space-y-4">
        {/* 옵션 A 버튼 */}
        <Button
          variant="secondary" // 보조 색상 버튼
          size="lg"
          fullWidth
          onClick={() => onAnswer('A')}
          className="py-4 text-left text-base sm:text-lg dark:hover:bg-gray-700 dark:border dark:border-gray-600"
        >
          {question.optionA.text}
        </Button>

        {/* 옵션 B 버튼 */}
        <Button
          variant="secondary" // 보조 색상 버튼
          size="lg"
          fullWidth
          onClick={() => onAnswer('B')}
          className="py-4 text-left text-base sm:text-lg dark:hover:bg-gray-700 dark:border dark:border-gray-600"
        >
          {question.optionB.text}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
