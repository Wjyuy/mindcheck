// components/layout/Header.tsx
'use client'; // 클라이언트 컴포넌트로 지정

import Link from 'next/link';
import { useState ,useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react'; // Lucide 아이콘 임포트
import Button from '../ui/Button'; // Button 컴포넌트 임포트

/**
 * 애플리케이션의 공통 헤더 컴포넌트
 * 로고, 데스크톱/모바일 내비게이션, 다크 모드 토글 기능을 포함합니다.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴 열림/닫힘 상태
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태

  // 테마 토글 함수
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      if (isCurrentlyDark) {
        // 현재 다크 모드이면 라이트 모드로 전환
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDarkMode(false);
      } else {
        // 현재 라이트 모드이면 다크 모드로 전환
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDarkMode(true);
      }
    }
  };

  // 컴포넌트 마운트 시 시스템 테마 또는 localStorage 설정에 따라 초기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // 저장된 테마가 'dark'이거나, 저장된 테마가 없고 시스템이 'dark'를 선호하는 경우
      if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      }
    }
  }, []); // 의존성 배열을 비워두면 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  // 내비게이션 링크 데이터 (프로젝트에 맞게 수정)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: '테스트', href: '/test' }, // 'Projects' 대신 '테스트'로 변경
    { name: '문의', href: '/contact' }, // 'Contact' 대신 '문의'로 변경
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white px-6 py-4 shadow-sm transition-colors duration-300 md:px-8 lg:px-12
                       dark:border-b dark:border-gray-800 dark:bg-gray-900 dark:shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* 로고 / 사이트명 */}
        <Link href="/" className="text-2xl font-bold text-slate-900 transition-colors hover:text-blue-600
                                  dark:text-gray-50 dark:hover:text-blue-400">
          마음체크
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-700 transition-colors hover:text-blue-600
                        dark:text-gray-300 dark:hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
          {/* 다크 모드 토글 버튼 (데스크톱) */}
          <Button
            variant="ghost"
            size="md"
            icon={isDarkMode ? Sun : Moon}
            onClick={toggleTheme}
            aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className="ml-4" // 마진 추가
          />
        </nav>

        {/* 모바일 메뉴 버튼 및 다크 모드 토글 버튼 */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* 다크 모드 토글 버튼 (모바일) */}
          <Button
            variant="ghost"
            size="md"
            icon={isDarkMode ? Sun : Moon}
            onClick={toggleTheme}
            aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
          />
          <Button
            variant="ghost"
            size="md"
            icon={isMenuOpen ? X : Menu}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          />
        </div>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-white bg-opacity-95
                        dark:bg-gray-950 dark:bg-opacity-95 md:hidden">
          <Button
            variant="ghost"
            size="md"
            icon={X}
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6"
            aria-label="메뉴 닫기"
          />
          <nav className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl font-semibold text-slate-800 transition-colors hover:text-blue-600
                          dark:text-gray-100 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* 'Get in Touch' 버튼은 프로젝트 컨셉에 맞게 '테스트 시작하기' 등으로 변경 가능 */}
            <Button
              variant="primary"
              size="lg"
              className="mt-8"
              onClick={() => {
                setIsMenuOpen(false);
                // 여기에 연락처 모달 열기 또는 연락처 페이지로 이동 로직 추가
                // 현재는 /test 페이지로 이동하도록 설정
                window.location.href = '/test';
              }}
            >
              테스트 시작하기
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
