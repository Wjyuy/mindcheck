// lib/services/messageService.ts
import { HealingMessage, EmotionCategory } from '@/types/project.d';
import healingMessagesData from '@/lib/data/healingMessages.json'; // 힐링 문구 데이터 임포트

/**
 * 특정 감정 카테고리에 해당하는 힐링 메시지 중 하나를 랜덤으로 추천합니다.
 * 향후 인기도(popularity) 기반 가중치 로직을 추가할 수 있습니다.
 *
 * @param category - 추천받을 힐링 메시지의 감정 카테고리
 * @returns 추천된 HealingMessage 객체 또는 null (해당 카테고리에 메시지가 없을 경우)
 */
export const getHealingMessage = (category: EmotionCategory): HealingMessage | null => {
  // 1. 해당 감정 카테고리에 맞는 메시지들을 필터링합니다.
  const filteredMessages = healingMessagesData.filter(
    (message) => message.category === category
  ) as HealingMessage[]; // 타입 단언

  if (filteredMessages.length === 0) {
    console.warn(`No healing messages found for category: ${category}`);
    return null; // 해당 카테고리에 메시지가 없으면 null 반환
  }

  // 2. 필터링된 메시지 중에서 랜덤으로 하나를 선택합니다.
  // TODO: 향후 인기도(popularity)를 기반으로 가중치를 적용하여 추천 로직을 고도화할 수 있습니다.
  // 현재는 단순 랜덤 선택입니다.
  const randomIndex = Math.floor(Math.random() * filteredMessages.length);
  return filteredMessages[randomIndex];
};
