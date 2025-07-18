// app/(main)/result/page.tsx
'use client'; // 클라이언트 컴포넌트로 지정

import React, { useEffect, useState, Suspense } from 'react'; // Suspense 임포트
import { useSearchParams, useRouter } from 'next/navigation'; // 쿼리 파라미터 및 라우팅을 위해 사용
import { EmotionCategory, HealingMessage } from '@/types/project.d'; // 타입 임포트
import healingMessagesData from '@/lib/data/healingMessages.json'; // 힐링 문구 데이터 임포트
import Button from '@/components/ui/Button'; // Button 컴포넌트 임포트
import { Share2, Repeat, Copy, MessageCircle, Instagram, Facebook } from 'lucide-react'; // 공유 아이콘 임포트

/**
 * 감정 카테고리를 한국어 설명으로 매핑하는 객체
 * 디자인 시스템에 정의된 색상 (primary, blue, red, slate, gray)을 활용합니다.
 */
const emotionDescriptions: Record<EmotionCategory, { title: string; description: string; color: string }> = {
  stress: {
    title: "스트레스/불안",
    description: "당신은 현재 압박감과 걱정으로 인해 마음이 지쳐있을 수 있습니다. 잠시 쉬어가며 평온을 찾아보세요.",
    color: "text-red-500" // 디자인 시스템의 red 색상 사용
  },
  depression: {
    title: "우울/무기력",
    description: "의욕이 없고 슬픔이 가득한 시기를 보내고 있군요. 작은 빛이라도 찾아 자신을 다독여주는 것이 중요합니다.",
    color: "text-blue-500" // 디자인 시스템의 blue 색상 사용
  },
  anger: {
    title: "분노/짜증",
    description: "화가 나거나 예민한 상태일 수 있습니다. 감정을 건강하게 다스리는 방법을 찾아 마음의 평화를 되찾으세요.",
    color: "text-red-400" // 디자인 시스템의 red 계열 색상 사용
  },
  loneliness: {
    title: "외로움/고독",
    description: "혼자라는 느낌이나 소외감을 느끼고 있군요. 당신은 혼자가 아닙니다. 주변의 따뜻한 손길을 찾아보세요.",
    color: "text-primary-700" // 디자인 시스템의 primary 계열 색상 사용
  },
  fatigue: {
    title: "피로/번아웃",
    description: "신체적, 정신적으로 소진된 상태일 수 있습니다. 충분한 휴식과 재충전의 시간이 필요합니다.",
    color: "text-slate-600" // 디자인 시스템의 slate 계열 색상 사용
  },
  confusion: {
    title: "혼란/방향성상실",
    description: "어떻게 해야 할지 막막하고 방향을 잃은 느낌이 드는군요. 잠시 멈춰서 자신에게 집중하는 시간이 필요합니다.",
    color: "text-gray-500" // 디자인 시스템의 gray 계열 색상 사용
  },
};

// Kakao SDK 타입 선언 (window 객체에 Kakao가 있음을 TypeScript에 알림)
declare global {
  interface Window {
    Kakao: any;
    adsbygoogle: any[]; // AdSense를 위해 adsbygoogle 타입 추가
  }
}

/**
 * 실제 결과 페이지 내용을 렌더링하는 내부 컴포넌트.
 * useSearchParams 훅을 사용하므로 Suspense 경계 내부에 있어야 합니다.
 */
const ResultContent: React.FC = () => {
  const searchParams = useSearchParams(); // URL 쿼리 파라미터 가져오기
  const router = useRouter(); // 라우터 훅 초기화

  const [emotionalState, setEmotionalState] = useState<EmotionCategory | null>(null);
  const [healingMessage, setHealingMessage] = useState<HealingMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null); // 공유 성공/실패 메시지 상태

  useEffect(() => {
    const emotionParam = searchParams.get('emotion') as EmotionCategory | null;
    const messageIdParam = searchParams.get('messageId');

    if (!emotionParam) {
      setErrorMessage("감정 결과가 없습니다. 다시 테스트해주세요.");
      setIsLoading(false);
      return;
    }

    setEmotionalState(emotionParam);

    if (messageIdParam) {
      // 메시지 ID로 힐링 문구 찾기
      const foundMessage = (healingMessagesData as HealingMessage[]).find(
        (msg) => msg.id === messageIdParam && msg.category === emotionParam
      );
      if (foundMessage) {
        setHealingMessage(foundMessage);
      } else {
        setErrorMessage("해당 힐링 문구를 찾을 수 없습니다.");
      }
    } else {
      setErrorMessage("힐링 문구 ID가 없습니다.");
    }
    setIsLoading(false);
  }, [searchParams]);

  // Google AdSense 광고 로드 로직
  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.
    // StrictMode에서 두 번 실행될 수 있으므로, 이미 로드된 광고가 있는지 확인합니다.
    const loadAds = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // DOM에 adsbygoogle 클래스를 가진 ins 태그가 있고, 아직 처리되지 않았다면 push
          const adElements = document.querySelectorAll('ins.adsbygoogle:not([data-ad-status="done"])');
          if (adElements.length > 0) {
            window.adsbygoogle.push({});
            console.log("AdSense push called.");
          } else {
            console.log("No new AdSense 'ins' elements to push or already processed.");
          }
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    };

    // 페이지가 로드되거나 컴포넌트가 마운트될 때 광고를 로드합니다.
    // 딜레이를 주어 DOM이 완전히 준비될 시간을 줍니다.
    const timer = setTimeout(loadAds, 100); // 짧은 딜레이 추가

    // 클린업 함수 (컴포넌트 언마운트 시 또는 재렌더링 시)
    return () => {
      clearTimeout(timer);
      // 필요하다면 여기서 광고 요소를 제거하거나 상태를 리셋할 수 있지만,
      // adsbygoogle.push()는 일반적으로 한 번만 호출되는 것이 목적이므로,
      // 중복 호출 방지에 더 집중합니다.
    };
  }, []); // 의존성 배열을 비워 컴포넌트 마운트 시 한 번만 실행되도록 합니다.


  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300">
        <p className="text-xl font-semibold animate-pulse">결과를 불러오는 중입니다...</p>
        <div className="mt-4 h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  // 오류 발생 시 표시할 UI
  if (errorMessage) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center text-red-600 dark:text-red-400">
        <p className="text-xl font-semibold">오류 발생: {errorMessage}</p>
        <Button onClick={() => router.push('/test')} variant="primary" className="mt-4">
          테스트 다시 시작하기
        </Button>
      </div>
    );
  }

  // 결과가 없을 경우 (예: URL에 파라미터가 없거나 잘못된 경우)
  if (!emotionalState || !healingMessage) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300">
        <p className="text-xl font-semibold">유효한 결과가 없습니다. 다시 테스트해주세요.</p>
        <Button onClick={() => router.push('/test')} variant="primary" className="mt-4">
          테스트 시작하기
        </Button>
      </div>
    );
  }

  // 공유 기능 (카카오톡, 인스타그램, 링크 복사, 페이스북)
  const handleShare = async (platform: 'kakao' | 'instagram' | 'copy' | 'facebook') => {
    const shareUrl = window.location.href; // 현재 결과 페이지 URL
    const shareTitle = `마음체크: 나의 현재 감정 상태는 ${emotionDescriptions[emotionalState].title}!`;
    const shareDescription = healingMessage.message;

    // 공유 횟수 업데이트 API 호출 (백엔드 연동 시 활성화)
    const updateShareCount = async () => {
      try {
        const response = await fetch(`/api/share/${healingMessage.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ platform }), // 어떤 플랫폼으로 공유되었는지 전달 가능
        });
        if (!response.ok) {
          console.error('Failed to update share count');
        }
      } catch (err) {
        console.error('Error updating share count:', err);
      }
    };

    try {
      if (platform === 'copy') {
        await navigator.clipboard.writeText(`${shareTitle}\n"${shareDescription}"\n${shareUrl}`);
        setShareMessage('링크가 클립보드에 복사되었습니다!');
        setTimeout(() => setShareMessage(null), 3000); // 3초 후 메시지 제거
      } else if (platform === 'kakao') {
        if (window.Kakao && window.Kakao.isInitialized()) {
          window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: shareTitle,
              description: shareDescription,
              imageUrl: 'https://placehold.co/600x400/E0E7FF/4F46E5?text=마음체크', // TODO: 실제 앱 이미지 URL로 변경
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
              },
            },
            buttons: [
              {
                title: '테스트하러 가기',
                link: {
                  mobileWebUrl: `${window.location.origin}/test`,
                  webUrl: `${window.location.origin}/test`,
                },
              },
            ],
          });
          setShareMessage('카카오톡으로 공유되었습니다.');
          setTimeout(() => setShareMessage(null), 3000);
        } else {
          setShareMessage('카카오톡 SDK가 초기화되지 않았습니다.');
          setTimeout(() => setShareMessage(null), 3000);
        }
      } else if (platform === 'instagram') {
        setShareMessage('인스타그램은 이미지 생성 후 수동 공유를 권장합니다. (기능 개발 예정)');
        setTimeout(() => setShareMessage(null), 5000);
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`, '_blank');
        setShareMessage('페이스북으로 공유되었습니다.');
        setTimeout(() => setShareMessage(null), 3000);
      }
      updateShareCount(); // 공유 횟수 업데이트 API 호출
      console.log(`Shared on ${platform}`);
    } catch (err) {
      console.error(`Failed to share on ${platform}:`, err);
      setShareMessage('공유에 실패했습니다.');
      setTimeout(() => setShareMessage(null), 3000);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center animate-fade-in">
      {/* 공유 메시지 표시 */}
      {shareMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-md bg-green-500 px-4 py-2 text-white shadow-lg dark:bg-green-700 animate-fade-in">
          {shareMessage}
        </div>
      )}

      {/* 진단된 감정 상태 */}
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
        당신의 마음은 지금 <span className={`${emotionDescriptions[emotionalState].color}`}>{emotionDescriptions[emotionalState].title}</span>!
      </h2>
      <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
        {emotionDescriptions[emotionalState].description}
      </p>

      {/* 힐링 문구 카드 */}
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 md:p-8 animate-slide-up">
        <p className="text-xl font-semibold italic leading-relaxed text-gray-800 dark:text-gray-200 md:text-2xl">
          "{healingMessage.message}"
        </p>
        {healingMessage.author && (
          <p className="mt-4 text-right text-sm text-gray-500 dark:text-gray-400">
            - {healingMessage.author} -
          </p>
        )}
      </div>

      {/* 공유하기 버튼들 */}
      <div className="mt-10 w-full max-w-md">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">결과 공유하기</h3>
        <div className="flex justify-center space-x-4">
          {/* 카카오톡 공유 */}
          <Button
            variant="secondary"
            size="lg"
            icon={MessageCircle}
            onClick={() => handleShare('kakao')}
            aria-label="카카오톡으로 공유"
          >
            카카오톡
          </Button>
          {/* 인스타그램 공유 */}
          <Button
            variant="secondary"
            size="lg"
            icon={Instagram}
            onClick={() => handleShare('instagram')}
            aria-label="인스타그램으로 공유"
          >
            인스타그램
          </Button>
          {/* 링크 복사 */}
          <Button
            variant="secondary"
            size="lg"
            icon={Copy}
            onClick={() => handleShare('copy')}
            aria-label="링크 복사"
          >
            링크 복사
          </Button>
          {/* 페이스북 공유 */}
          <Button
            variant="secondary"
            size="lg"
            icon={Facebook}
            onClick={() => handleShare('facebook')}
            aria-label="페이스북으로 공유"
          >
            페이스북
          </Button>
        </div>
      </div>

      {/* 다시 테스트하기 버튼 */}
      <div className="mt-10">
        <Button
          variant="primary"
          size="lg"
          icon={Repeat}
          onClick={() => router.push('/test')}
          className="px-8 py-4"
        >
          다시 테스트하기
        </Button>
      </div>

      {/* Google AdSense 광고 배치  */}
      <div className="mt-12 w-full max-w-md rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-700">
        
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3863791794986499"
          data-ad-slot="3205621919"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        {/* 광고가 로드되지 않을 경우를 대비한 대체 텍스트 */}
        <p className="text-gray-500 dark:text-gray-400">광고 영역</p>
      </div>
    </div>
  );
};

/**
 * 결과 페이지 컴포넌트
 * useSearchParams 훅을 사용하는 ResultContent 컴포넌트를 Suspense로 감쌉니다.
 * 이는 서버에서 페이지를 미리 렌더링할 때 발생하는 오류를 방지합니다.
 */
const ResultPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300 min-h-[calc(100vh-160px)]">
        <p className="text-xl font-semibold animate-pulse">결과를 준비 중입니다...</p>
        <div className="mt-4 h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
};

export default ResultPage;
