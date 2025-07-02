// app/(main)/page.tsx
import React from 'react';
import Link from 'next/link';

/**
 * 랜딩 페이지 컴포넌트
 * 서비스 소개와 심리테스트 시작 버튼을 제공합니다.
 */
const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center text-center animate-fade-in">
      {/* 서비스 소개 제목 */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
        <span className="block xl:inline">도파민 디톡스,</span>{' '}
        <span className="block text-primary-600 xl:inline dark:text-primary-400">마음체크</span>
      </h1>
      {/* 서비스 소개 부제목/설명 */}
      <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
        혐오가 넘쳐나는 현대 사회에서, 간단한 심리테스트로 당신의 감정 상태를 진단하고
        맞춤 힐링 문구를 통해 정신적 평화를 찾아보세요.
      </p>
      {/* CTA 버튼 */}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/test" // 심리테스트 페이지로 이동할 링크 (아직 구현되지 않음)
          className="rounded-md bg-primary-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          테스트 시작하기
        </Link>
        {/* <Link href="/about" className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
          서비스 자세히 보기 <span aria-hidden="true">→</span>
        </Link> */}
      </div>
    </div>
  );
};

export default LandingPage;
