// app/(main)/layout.tsx (MainLayout 사용 예시)
// 이 파일은 app/(main) 그룹의 모든 페이지에 적용될 레이아웃입니다.
import React from 'react';
import MainLayout from '@/components/layout/MainLayout'; // MainLayout 컴포넌트 임포트

/**
 * (main) 라우트 그룹의 레이아웃 컴포넌트
 * 이 레이아웃은 Header와 Footer를 포함하며,
 * 심리테스트 및 결과 페이지와 같은 주요 콘텐츠에 적용됩니다.
 *
 * @param {React.ReactNode} children - 현재 라우트 세그먼트의 페이지 컴포넌트
 */
export default function MainRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
