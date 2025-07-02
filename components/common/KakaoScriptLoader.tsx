    // components/common/KakaoScriptLoader.tsx
    'use client'; // 이 컴포넌트는 클라이언트 컴포넌트입니다.

    import Script from 'next/script';
    import React from 'react';

    // Kakao SDK 타입 선언
    declare global {
      interface Window {
        Kakao: any;
      }
    }

    /**
     * Kakao JavaScript SDK를 로드하고 초기화하는 클라이언트 컴포넌트입니다.
     * 환경 변수 NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY를 사용합니다.
     */
    const KakaoScriptLoader: React.FC = () => {
      const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

      const handleKakaoSdkLoad = () => {
        if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized() && KAKAO_JS_KEY) {
          window.Kakao.init(KAKAO_JS_KEY);
          console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
        } else if (!KAKAO_JS_KEY) {
          console.error("Kakao JavaScript API Key (NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY) is not defined.");
        } else if (window.Kakao && window.Kakao.isInitialized()) {
          console.log("Kakao SDK is already initialized.");
        } else if (!window.Kakao) {
          console.error("Kakao SDK script not loaded or window.Kakao object not available.");
        }
      };

      const handleKakaoSdkError = (e: any) => {
        console.error("Failed to load Kakao SDK script:", e);
      };

      return (
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive" // 페이지 상호작용 후 로드
          onLoad={handleKakaoSdkLoad}
          onError={handleKakaoSdkError}
        />
      );
    };

    export default KakaoScriptLoader;
    