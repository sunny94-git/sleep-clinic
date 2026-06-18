export type PostCategory = 'notice';
export type QACategory = 'consultation' | 'treatment';
export type QAStatus = 'pending' | 'answered';

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  notice: '공지사항',
};

export const QA_CATEGORY_LABELS: Record<QACategory, string> = {
  consultation: '진료상담',
  treatment: '치료문의',
};

export const QA_STATUS_LABELS: Record<QAStatus, string> = {
  pending: '대기중',
  answered: '답변완료',
};
