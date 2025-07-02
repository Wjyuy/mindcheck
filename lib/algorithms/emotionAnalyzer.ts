// lib/algorithms/emotionAnalyzer.ts
import { UserAnswer, Question, EmotionCategory } from '@/types/project.d';

/**
 * 사용자의 답변을 기반으로 감정 상태를 분석하고, 가장 높은 점수를 얻은 감정 카테고리를 반환합니다.
 *
 * @param answers - 사용자의 답변 배열
 * @param questions - 전체 질문 데이터 배열
 * @returns 가장 높은 점수를 얻은 EmotionCategory
 */
export const calculateEmotionalState = (answers: UserAnswer[], questions: Question[]): EmotionCategory => {
  // 각 감정 카테고리의 초기 점수를 0으로 설정합니다.
  const scores: Record<EmotionCategory, number> = {
    stress: 0,
    depression: 0,
    anger: 0,
    loneliness: 0,
    fatigue: 0,
    confusion: 0,
  };

  // 각 답변을 순회하며 해당 감정 카테고리에 점수를 추가합니다.
  answers.forEach(answer => {
    // 답변에 해당하는 질문을 찾습니다.
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) {
      console.warn(`Question with ID ${answer.questionId} not found.`);
      return; // 질문을 찾지 못하면 다음 답변으로 넘어갑니다.
    }

    // 사용자가 선택한 옵션 (A 또는 B)에 따라 해당 감정 카테고리와 가중치를 가져옵니다.
    const selectedOption = answer.selectedOption === 'A' ? question.optionA : question.optionB;
    const { value: emotionCategory, weight } = selectedOption;

    // 해당 감정 카테고리에 가중치를 더합니다.
    scores[emotionCategory] += weight;
  });

  // 가장 높은 점수를 가진 감정 카테고리를 찾습니다.
  let maxScore: number = -1;
  let dominantEmotion: EmotionCategory = 'stress'; // 기본값 설정

  // scores 객체를 순회하며 최대 점수와 해당 감정 카테고리를 업데이트합니다.
  // Object.entries를 사용하여 키(감정 카테고리)와 값(점수)을 동시에 가져옵니다.
  (Object.entries(scores) as [EmotionCategory, number][]).forEach(([category, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantEmotion = category;
    }
  });

  console.log("Calculated Emotional Scores:", scores);
  console.log("Dominant Emotion:", dominantEmotion);

  return dominantEmotion;
};
