import nodemailer from 'nodemailer';

export async function sendAnswerNotification(
  to: string,
  questionTitle: string,
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Vercel 환경 변수가 누락되었습니다: EMAIL_USER 또는 EMAIL_APP_PASSWORD 가 없습니다. (Redeploy 시 적용됩니다.)');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

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

export async function sendAdminNotification(
  type: 'board' | 'qa',
  authorName: string,
  title: string,
) {
  const adminEmail = 'wku.sleepclinic@gmail.com';
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.warn('[Mailer] Admin notification skipped: Missing ENV variables');
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const prefix = type === 'board' ? '[게시판]' : '[Q&A]';

  try {
    const info = await transporter.sendMail({
      from: `"수면장애클리닉 알림" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `[수면장애 클리닉 알림] ${prefix} 새로운 글이 등록되었습니다.`,
      html: `
        <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #edf2f7; border-radius: 16px; background-color: #ffffff;">
          <h2 style="color: #2d3748; border-bottom: 2px solid #edf2f7; padding-bottom: 16px; margin-top: 0;">새로운 글 등록 알림</h2>
          
          <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 24px 0;">
            수면장애 클리닉 홈페이지에 새로운 ${type === 'board' ? '게시글' : '질문'}이 등록되었습니다. 내용을 확인해 주세요.
          </p>

          <div style="background: #f7fafc; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
            <div style="margin-bottom: 16px;">
              <p style="color: #718096; margin: 0 0 4px; font-size: 13px; font-weight: 600; text-transform: uppercase;">작성자 이름</p>
              <p style="color: #1a202c; font-weight: 600; font-size: 16px; margin: 0;">${authorName}</p>
            </div>
            <div>
              <p style="color: #718096; margin: 0 0 4px; font-size: 13px; font-weight: 600; text-transform: uppercase;">글 제목</p>
              <p style="color: #1a202c; font-weight: 600; font-size: 16px; margin: 0;">${title}</p>
            </div>
          </div>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://sleep-clinic.vercel.app/" style="display: inline-block; background-color: #6c5ce7; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; transition: background-color 0.2s;">
              홈페이지 바로가기
            </a>
          </div>
        </div>
      `,
    });
    console.log('[Mailer] Admin notification sent. ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('[Mailer] Admin notification failed:', error);
    return false;
  }
}
