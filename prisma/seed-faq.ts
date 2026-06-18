import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

const faqs = [
  {
    question: '수면장애클리닉은 어떤 증상일 때 방문하면 좋을까요?',
    answer: '잠들기 어렵거나, 자주 깨거나, 너무 일찍 깨는 경우, 또는 낮에 피곤하고 졸린 증상이 지속될 때 방문하시면 좋습니다. 코골이, 수면 중 숨이 멈추는 느낌, 다리 불편감 등도 해당됩니다.',
    order: 0,
  },
  {
    question: '첫 방문 시 어떤 과정으로 진료가 진행되나요?',
    answer: '먼저 수면 관련 증상에 대한 상담을 진행합니다. 이후 필요에 따라 설문지, 수면다원검사(PSG), 액티그라피 등의 정밀 평가를 실시하고, 결과를 바탕으로 개인 맞춤 치료 계획을 세웁니다.',
    order: 1,
  },
  {
    question: '수면제를 줄이고 싶은데 도움을 받을 수 있나요?',
    answer: '네, 가능합니다. 현재 복용 중인 수면제의 종류와 용량을 확인한 뒤, 한방 치료(침, 한약 등)와 수면 습관 교정을 병행하여 안정적으로 감량할 수 있도록 계획합니다.',
    order: 2,
  },
  {
    question: '한방치료만으로 수면장애가 나아질 수 있나요?',
    answer: '많은 경우 한방치료(침, 약침, 한약)만으로도 수면의 질이 개선됩니다. 다만 증상에 따라 수면 습관 교정, 인지행동치료(CBT-I), 양압기 치료 등을 함께 진행할 수도 있습니다.',
    order: 3,
  },
  {
    question: '진료 예약은 어떻게 하나요?',
    answer: '전화(062-670-6412)로 예약하시거나, 이 페이지의 \'질문하기\' 버튼을 통해 온라인으로 상담을 남겨주시면 됩니다.',
    order: 4,
  }
];

async function main() {
  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq
    });
  }
  console.log('FAQ seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
