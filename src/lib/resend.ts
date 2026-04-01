import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendAnswerNotification(
  to: string,
  questionTitle: string,
  answer: string
) {
  if (!resend) {
    console.warn('[Resend] API key not configured — skipping email');
    return;
  }

  try {
    await resend.emails.send({
      from: '원광대 광주한방병원 수면장애클리닉 <noreply@sleepclinic.com>',
      to,
      subject: `[답변완료] ${questionTitle}`,
      html: `
        <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">질문에 대한 답변이 등록되었습니다</h2>
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p style="color: #64748b; margin: 0 0 8px;">질문</p>
            <p style="color: #1e293b; font-weight: 600;">${questionTitle}</p>
          </div>
          <div style="background: #eff6ff; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p style="color: #64748b; margin: 0 0 8px;">답변</p>
            <p style="color: #1e293b;">${answer}</p>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 32px;">
            원광대학교 광주한방병원 수면장애클리닉
          </p>
        </div>
      `,
    });
    console.log('[Resend] Answer notification sent to', to);
  } catch (error) {
    console.error('[Resend] Failed to send email:', error);
  }
}
