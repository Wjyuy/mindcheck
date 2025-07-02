    // app/layout.tsx
    import './globals.css';
    import type { Metadata } from 'next';
    import { Inter } from 'next/font/google';
    // import Script from 'next/script'; // next/script는 이제 KakaoScriptLoader 내부에서 사용
    import KakaoScriptLoader from '@/components/common/KakaoScriptLoader'; // 새로 생성한 컴포넌트 임포트

    const inter = Inter({
      subsets: ['latin'],
      variable: '--font-inter',
      display: 'swap',
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
      return (
        <html lang="ko" className={`${inter.variable}`}>
          <head>
            <KakaoScriptLoader />
          </head>
          <body>
            {children}
          </body>
        </html>
      );
    }
    