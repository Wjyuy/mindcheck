// app/layout.tsx (일부)
import KakaoScriptLoader from '@/components/common/KakaoScriptLoader';
import Script from 'next/script'; // next/script 임포트
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Inter 폰트 임포트
import './globals.css'; // 전역 CSS 파일 임포트

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Tailwind CSS에서 참조할 CSS 변수 이름
  display: 'swap', // 폰트 로딩 전략: 폰트가 로드될 때까지 대체 폰트 사용
});

export const metadata: Metadata = {
  title: '마음체크 - 도파민 디톡스 힐링 문구',
  description: '간단한 심리테스트로 감정 상태를 진단하고 맞춤 힐링 문구를 추천받으세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AdSense 게시자 ID를 환경 변수에서 가져옵니다.
  const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <html lang="ko" className={`${inter.variable}`}> 
      <head>
        {/* Kakao JavaScript SDK 로드 */}
        <KakaoScriptLoader />

        {/* Google AdSense 스크립트 로드 */}
        {/* 환경 변수에서 게시자 ID를 가져와 사용합니다. */}
        {ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive" // 페이지 상호작용 후 로드
          />
        )}
        {!ADSENSE_PUBLISHER_ID && (
          <meta name="adsense-client-warning" content="NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is not defined in environment variables." />
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
