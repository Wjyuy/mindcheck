// components/layout/Footer.tsx
import React from 'react';

/**
 * 애플리케이션의 공통 푸터 컴포넌트
 * 저작권 정보 등을 포함합니다.
 */
const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} 마음체크. All rights reserved.</p>
        <p className="mt-1">도파민 디톡스를 통한 정신적 힐링</p>
      </div>
    </footer>
  );
};

export default Footer;