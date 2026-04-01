import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });

import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL || '' });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Posts
  await prisma.post.createMany({
    data: [
      {
        category: 'notice',
        title: '수면장애클리닉 진료시간 안내',
        content: '안녕하세요. 원광대학교 광주한방병원 수면장애클리닉입니다.\n\n진료시간:\n- 평일: 09:00 ~ 17:30\n- 토요일: 09:00 ~ 12:30\n- 일요일/공휴일: 휴진\n- 점심시간: 12:30 ~ 13:30\n\n문의전화: 062-670-6400',
        authorName: '관리자',
        isPublished: true,
      },
      {
        category: 'notice',
        title: '수면다원검사 예약 안내',
        content: '수면다원검사(PSG) 예약을 받습니다.\n\n검사 전 주의사항:\n1. 검사 당일 카페인 음료 섭취를 삼가세요\n2. 낮잠을 자지 마세요\n3. 평소 복용하는 약이 있으면 미리 알려주세요\n4. 편한 잠옷을 지참하세요\n\n예약: 062-670-6400',
        authorName: '관리자',
        isPublished: true,
      },
      {
        category: 'sleep_info',
        title: '불면증 자가진단 체크리스트',
        content: '다음 항목 중 3개 이상 해당되면 전문 상담을 받아보세요.\n\n□ 잠자리에 누운 후 30분 이상 잠들기 어렵다\n□ 밤에 2회 이상 깬다\n□ 너무 일찍 깨어 다시 잠들지 못한다\n□ 아침에 일어나도 개운하지 않다\n□ 낮에 졸리거나 피곤하다\n□ 주말에 수면 시간이 크게 달라진다\n□ 잠들기 위해 술을 마신다\n□ 수면 문제가 3개월 이상 지속된다',
        authorName: '수면정보팀',
        isPublished: true,
      },
      {
        category: 'sleep_info',
        title: '좋은 수면 환경 만들기',
        content: '수면의 질을 높이는 환경 조성법:\n\n🌡️ 온도: 18-22°C가 적당합니다\n🔇 소음: 귀마개나 백색소음을 활용하세요\n🌑 조명: 침실을 최대한 어둡게 하세요\n📱 전자기기: 취침 1시간 전부터 사용을 자제하세요\n🛏️ 침구: 본인에게 맞는 베개와 매트리스를 사용하세요\n🌸 향기: 라벤더 향이 수면에 도움됩니다',
        authorName: '수면정보팀',
        isPublished: true,
      },
      {
        category: 'free',
        title: '침치료 후 수면이 개선되었습니다',
        content: '3개월동안 불면증으로 고생했는데, 한방병원에서 침치료를 받고 많이 나아졌습니다. 특히 신문혈과 안면혈에 침을 맞은 후 그날 밤부터 효과를 느꼈어요. 비슷한 증상으로 고민하시는 분들께 추천드립니다.',
        authorName: '김oo',
        isPublished: true,
      },
      {
        category: 'free',
        title: '한약 복용 후기',
        content: '갱년기 불면증으로 귀비탕 처방을 받았습니다. 2주 정도 복용 후부터 확실히 잠이 잘 오고, 중간에 깨는 횟수도 줄었습니다. 감사합니다.',
        authorName: '박oo',
        isPublished: true,
      },
    ],
  });

  // Seed QA Items
  await prisma.qAItem.createMany({
    data: [
      {
        category: 'consultation',
        title: '불면증 치료 기간이 궁금합니다',
        content: '3개월째 불면증으로 고생 중입니다. 한방치료를 받으면 보통 얼마나 걸리나요?',
        authorEmail: 'test1@example.com',
        isPrivate: false,
        status: 'answered',
        answer: '불면증의 치료 기간은 증상의 정도와 원인에 따라 달라집니다. 일반적으로 4~8주 정도의 치료 기간이 필요하며, 침치료와 한약을 병행하시면 더 빠른 효과를 기대할 수 있습니다. 내원하시면 정확한 상담을 받으실 수 있습니다.',
        answeredAt: new Date(),
      },
      {
        category: 'cost',
        title: '수면다원검사 비용이 얼마인가요?',
        content: '수면다원검사를 받아보고 싶은데 대략적인 비용이 궁금합니다.',
        authorEmail: 'test2@example.com',
        isPrivate: false,
        status: 'answered',
        answer: '수면다원검사는 건강보험 적용 시 본인부담금 약 10만원 내외입니다. 다만, 의사의 판단에 따라 보험 적용 여부가 결정되므로 먼저 진료를 받으시기 바랍니다.',
        answeredAt: new Date(),
      },
      {
        category: 'symptom',
        title: '코골이가 심한데 수면무호흡인가요?',
        content: '남편이 코골이가 심하고 가끔 숨을 멈추는 것 같습니다. 수면무호흡증인지 확인하고 싶습니다.',
        authorEmail: 'test3@example.com',
        isPrivate: false,
        status: 'pending',
      },
      {
        category: 'treatment',
        title: '침치료만으로 불면증 치료가 가능한가요?',
        content: '한약 복용 없이 침치료만으로도 효과가 있는지 궁금합니다.',
        authorEmail: 'test4@example.com',
        isPrivate: true,
        status: 'pending',
      },
    ],
  });

  console.log('✅ Seed completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
