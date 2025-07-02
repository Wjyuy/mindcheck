// components/layout/MainLayout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * 애플리케이션의 주요 레이아웃 컴포넌트
 * Header와 Footer를 포함하며, 콘텐츠 영역에 공통 스타일을 적용합니다.
 *
 * @param {React.ReactNode} children - 레이아웃 내부에 렌더링될 React 자식 요소
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto flex max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;