import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendAnswerNotification(
  to: string,
  questionTitle: string,
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Vercel 환경 변수가 누락되었습니다: EMAIL_USER 또는 EMAIL_APP_PASSWORD 가 없습니다. (Redeploy 시 적용됩니다.)');
  }

  try {
    const info = await transporter.sendMail({
      from: `"원광대 광주한방병원 수면장애클리닉" <${process.env.EMAIL_USER}>`,
      to,
      subject: `[답변완료] ${questionTitle} 질문에 대한 의사 소견이 등록되었습니다.`,
      html: `
        <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">질문에 대한 전문의 답변이 등록되었습니다</h2>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-top: 24px;">
            안녕하세요, <strong>원광대 광주한방병원 수면장애 클리닉</strong>입니다.<br/>
            남겨주신 질문에 대한 답변이 막 등록되었습니다.
          </p>

          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="color: #64748b; margin: 0 0 8px; font-size: 14px;">환자 질문 요약</p>
            <p style="color: #1e293b; font-weight: 600; font-size: 16px; margin: 0;">${questionTitle}</p>
          </div>

          <p style="color: #334155; font-size: 15px; margin-bottom: 24px;">
            자세한 원장님의 처방 및 소견내용은 아래의 링크를 클릭하여 홈페이지에서 바로 확인하실 수 있습니다. (비공개 글로 등록하셨다면 조회 시 비밀번호가 필요합니다.)
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://sleep-clinic.vercel.app/qa" style="display: inline-block; background-color: #6cdcbb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              답변 내용 확인하러 가기
            </a>
          </div>

          <p style="color: #94a3b8; font-size: 12px; margin-top: 40px; text-align: center;">
            본 메일은 발신 전용 메일입니다. 문의 사항이 있으시다면 클리닉으로 연락 부탁드립니다.<br/>
            원광대학교 광주한방병원 수면장애클리닉
          </p>
        </div>
      `,
    });
    console.log('[Mailer] Answer notification sent to', to, 'Message ID:', info.messageId);
    return true;
  } catch (error: any) {
    console.error('[Mailer] Failed to send email:', error);
    throw new Error('이메일 발송 실패: ' + (error.message || String(error)));
  }
}
