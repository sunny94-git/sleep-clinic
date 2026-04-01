export type PostCategory = 'notice' | 'free' | 'sleep_info';
export type QACategory = 'consultation' | 'treatment' | 'cost' | 'symptom';
export type QAStatus = 'pending' | 'answered';

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  notice: '공지사항',
  free: '자유게시판',
  sleep_info: '수면정보',
};

export const QA_CATEGORY_LABELS: Record<QACategory, string> = {
  consultation: '진료상담',
  treatment: '치료문의',
  cost: '비용문의',
  symptom: '증상문의',
};

export const QA_STATUS_LABELS: Record<QAStatus, string> = {
  pending: '대기중',
  answered: '답변완료',
};
