// components/test/ProgressBar.tsx
import React from 'react';

/**
 * ProgressBar 컴포넌트의 props 타입 정의
 * @param currentStep - 현재 진행 단계 (1부터 시작)
 * @param totalSteps - 전체 단계 수
 */
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

/**
 * 심리테스트의 진행 상황을 표시하는 프로그레스 바 컴포넌트입니다.
 *
 * @param {ProgressBarProps} props - ProgressBar 컴포넌트의 속성
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  // 진행률 계산 (0% ~ 100%)
  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700 h-2.5 overflow-hidden">
      <div
        className="h-2.5 rounded-full bg-primary-500 transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
      ></div>
    </div>
  );
};

export default ProgressBar;
