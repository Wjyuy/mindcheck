// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: '마음체크 - 도파민 디톡스 힐링 문구',
  description: '간단한 심리테스트로 감정 상태를 진단하고 맞춤 힐링 문구를 추천받으세요.',
  keywords: ['마음체크', '도파민 디톡스', '도파민', '디톡스', '힐링', '힐링 문구', '심리테스트', '감정 진단', '마음 건강'],
  authors: [{ name: '별우무', url: 'https://github.com/Wjyuy/mindcheck' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: '마음체크 - 도파민 디톡스 힐링 문구',
    description: '간단한 심리테스트로 감정 상태를 진단하고 맞춤 힐링 문구를 추천받으세요.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable}`}> 
      <body>
        <Header />
        <main className="relative z-10 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}