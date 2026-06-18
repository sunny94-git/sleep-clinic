import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const sleepInfos = [
  {
    slug: 'cardnews-1',
    type: 'CARDNEWS' as const,
    title: '잠 못 드는 것도 치료가 필요한 증상일까요?',
    desc: '수면 문제의 원인과 수면장애 클리닉에서 확인하는 증상들을 카드뉴스로 알아봅니다.',
    icon: '📱',
    order: 0,
    content: `![카드뉴스 1](/images/cardnews/part1/1.png)\n\n![카드뉴스 2](/images/cardnews/part1/2.png)\n\n![카드뉴스 3](/images/cardnews/part1/3.png)\n\n![카드뉴스 4](/images/cardnews/part1/4.png)\n\n![카드뉴스 5](/images/cardnews/part1/5.png)\n\n![카드뉴스 6](/images/cardnews/part1/6.png)\n\n![카드뉴스 7](/images/cardnews/part1/7.png)`
  },
  {
    slug: 'cardnews-2',
    type: 'CARDNEWS' as const,
    title: '수면장애에 대한 오해와 진실',
    desc: '수면 클리닉의 새로운 접근법을 카드뉴스로 알아봅니다.',
    icon: '📱',
    order: 1,
    content: `![카드뉴스 1](/images/cardnews/part2/1.png)\n\n![카드뉴스 2](/images/cardnews/part2/2.png)\n\n![카드뉴스 3](/images/cardnews/part2/3.png)\n\n![카드뉴스 4](/images/cardnews/part2/4.png)\n\n![카드뉴스 5](/images/cardnews/part2/5.png)\n\n![카드뉴스 6](/images/cardnews/part2/6.png)\n\n![카드뉴스 7](/images/cardnews/part2/7.png)`
  },
  {
    slug: 'cardnews-3', type: 'CARDNEWS' as const, icon: '📱', order: 2,
    title: '수면제를 먹기 전, 먼저 확인해야 할 것들', desc: '수면제를 복용하기 전에 알아두면 좋은 유용한 정보를 알아봅니다.',
    content: `![1](/images/cardnews/part3/1.png)\n\n![2](/images/cardnews/part3/2.png)\n\n![3](/images/cardnews/part3/3.png)\n\n![4](/images/cardnews/part3/4.png)\n\n![5](/images/cardnews/part3/5.png)\n\n![6](/images/cardnews/part3/6.png)\n\n![7](/images/cardnews/part3/7.png)\n\n![8](/images/cardnews/part3/8.png)`
  },
  {
    slug: 'cardnews-4', type: 'CARDNEWS' as const, icon: '📱', order: 3,
    title: '한방병원 수면장애 클리닉, 무엇을 보나요?', desc: '한방병원 수면 클리닉의 진료 과정과 치료법을 알아봅니다.',
    content: `![1](/images/cardnews/part4/1.png)\n\n![2](/images/cardnews/part4/2.png)\n\n![3](/images/cardnews/part4/3.png)\n\n![4](/images/cardnews/part4/4.png)\n\n![5](/images/cardnews/part4/5.png)\n\n![6](/images/cardnews/part4/6.png)\n\n![7](/images/cardnews/part4/7.png)\n\n![8](/images/cardnews/part4/8.png)`
  },
  {
    slug: 'cardnews-5', type: 'CARDNEWS' as const, icon: '📱', order: 4,
    title: '잠을 못자게 만드는 습관', desc: '무심코 하는 습관들이 수면을 방해할 수 있습니다.',
    content: `![1](/images/cardnews/part5/1.png)\n\n![2](/images/cardnews/part5/2.png)\n\n![3](/images/cardnews/part5/3.png)\n\n![4](/images/cardnews/part5/4.png)\n\n![5](/images/cardnews/part5/5.png)\n\n![6](/images/cardnews/part5/6.png)\n\n![7](/images/cardnews/part5/7.png)`
  },
  {
    slug: 'cardnews-6', type: 'CARDNEWS' as const, icon: '📱', order: 5,
    title: '잠은 드는데, 꼭 새벽에 깨나요?', desc: '새벽에 깨서 다시 잠들지 못하는 원인과 해결책을 알아봅니다.',
    content: `![1](/images/cardnews/part6/1.png)\n\n![2](/images/cardnews/part6/2.png)\n\n![3](/images/cardnews/part6/3.png)\n\n![4](/images/cardnews/part6/4.png)\n\n![5](/images/cardnews/part6/5.png)\n\n![6](/images/cardnews/part6/6.png)\n\n![7](/images/cardnews/part6/7.png)`
  },
  {
    slug: 'cardnews-7', type: 'CARDNEWS' as const, icon: '📱', order: 6,
    title: '분명 잤는데, 왜 아침마다 피곤할까요?', desc: '수면의 질이 떨어지는 이유와 개선 방법을 알아봅니다.',
    content: `![1](/images/cardnews/part7/1.png)\n\n![2](/images/cardnews/part7/2.png)\n\n![3](/images/cardnews/part7/3.png)\n\n![4](/images/cardnews/part7/4.png)\n\n![5](/images/cardnews/part7/5.png)\n\n![6](/images/cardnews/part7/6.png)\n\n![7](/images/cardnews/part7/7.png)`
  },
  {
    slug: 'cardnews-8', type: 'CARDNEWS' as const, icon: '📱', order: 7,
    title: '코골이, 단순히 피곤해서 나는 소리일까요?', desc: '코골이의 원인과 수면무호흡증의 위험성을 알아봅니다.',
    content: `![1](/images/cardnews/part8/1.png)\n\n![2](/images/cardnews/part8/2.png)\n\n![3](/images/cardnews/part8/3.png)\n\n![4](/images/cardnews/part8/4.png)\n\n![5](/images/cardnews/part8/5.png)\n\n![6](/images/cardnews/part8/6.png)\n\n![7](/images/cardnews/part8/7.png)`
  },
  {
    slug: 'cardnews-9', type: 'CARDNEWS' as const, icon: '📱', order: 8,
    title: '잠이 오는 저녁 루틴 만들기', desc: '건강한 수면을 위한 취침 전 루틴을 알아봅니다.',
    content: `![1](/images/cardnews/part9/1.png)\n\n![2](/images/cardnews/part9/2.png)\n\n![3](/images/cardnews/part9/3.png)\n\n![4](/images/cardnews/part9/4.png)\n\n![5](/images/cardnews/part9/5.png)\n\n![6](/images/cardnews/part9/6.png)\n\n![7](/images/cardnews/part9/7.png)`
  },
  {
    slug: 'cardnews-10', type: 'CARDNEWS' as const, icon: '📱', order: 9,
    title: '수면일지를 쓰면 치료 방향이 보입니다.', desc: '수면일지의 중요성과 작성 방법을 알아봅니다.',
    content: `![1](/images/cardnews/part10/1.png)\n\n![2](/images/cardnews/part10/2.png)\n\n![3](/images/cardnews/part10/3.png)\n\n![4](/images/cardnews/part10/4.png)\n\n![5](/images/cardnews/part10/5.png)\n\n![6](/images/cardnews/part10/6.png)\n\n![7](/images/cardnews/part10/7.png)`
  },
  {
    slug: 'insomnia', type: 'ARTICLE' as const, order: 10,
    title: '불면증의 원인과 한방치료',
    desc: '불면증의 다양한 원인과 한의학적 치료 접근법에 대해 알아봅니다.',
    icon: '😴',
    content: `불면증은 잠들기 어렵거나, 자주 깨거나, 너무 일찍 깨어나 다시 잠들지 못하는 수면장애입니다.\n\n## 불면증의 원인\n\n불면증은 다양한 원인에 의해 발생할 수 있습니다:\n\n• 스트레스와 불안: 업무, 학업, 대인관계 등에서 오는 심리적 부담\n• 불규칙한 생활 습관: 불규칙한 수면 시간, 과도한 카페인 섭취\n• 환경적 요인: 소음, 조명, 온도 등 수면 환경 문제\n• 신체적 질환: 통증, 호흡기 질환, 위장 질환 등\n• 정신건강 문제: 우울증, 불안장애 등\n\n## 한의학적 접근\n\n한의학에서는 불면증을 심(心)과 신(腎)의 불균형으로 봅니다.\n\n• 심신불교(心腎不交): 심장의 화(火)와 신장의 수(水)가 조화를 이루지 못하는 상태\n• 심비양허(心脾兩虛): 과도한 사고와 걱정으로 심장과 비장이 허해진 상태\n• 간울화화(肝鬱化火): 스트레스가 간에 울체되어 화(火)로 변한 상태\n\n## 치료 방법\n\n• 한약치료: 체질과 증상에 맞는 맞춤 처방 (귀비탕, 천왕보심단, 산조인탕 등)\n• 침구치료: 신문(神門), 안면(安眠), 백회(百會) 등 수면 관련 경혈 자극\n• 이완치료: 복식호흡, 점진적 근이완법 안내\n• 수면 위생 교육: 건강한 수면 습관 형성 지도`,
  },
  {
    slug: 'sleep-apnea', type: 'ARTICLE' as const, order: 11,
    title: '수면무호흡증 알아보기',
    desc: '코골이와 수면무호흡의 위험성, 진단 방법, 치료법을 소개합니다.',
    icon: '😮‍💨',
    content: `수면무호흡증은 수면 중 반복적으로 호흡이 멈추는 질환으로, 심각한 건강 문제를 유발할 수 있습니다.\n\n## 주요 증상\n\n• 심한 코골이\n• 수면 중 호흡 정지 (보호자가 목격)\n• 주간 과다 졸음\n• 아침 두통\n• 집중력 저하\n• 야간 빈뇨\n\n## 합병증\n\n치료하지 않으면 고혈압, 심장질환, 뇌졸중, 당뇨병 등의 위험이 증가합니다.\n\n## 한의학적 치료\n\n• 한약치료: 기도 주변 조직의 탄력 회복, 비만 관리\n• 침구치료: 인후부 근육 강화, 비강 통기 개선\n• 체중 관리: 한방 비만 치료와 병행\n• 생활습관 개선: 수면 자세 교정, 음주 제한`,
  },
  {
    slug: 'sleep-hygiene', type: 'ARTICLE' as const, order: 12,
    title: '올바른 수면 위생 가이드',
    desc: '건강한 수면 습관을 만들기 위한 실천 방법을 안내합니다.',
    icon: '🛏️',
    content: `수면 위생이란 좋은 수면을 위한 생활 습관과 환경을 의미합니다.\n\n## 수면 위생 10가지 원칙\n\n• 규칙적인 수면-기상 시간을 유지하세요\n• 침실은 수면과 부부관계만을 위해 사용하세요\n• 잠이 오지 않으면 침대에서 나오세요 (20분 규칙)\n• 낮잠은 30분 이내로 제한하세요\n• 취침 4-6시간 전부터 카페인을 피하세요\n• 취침 전 알코올 섭취를 삼가세요\n• 규칙적인 운동을 하되, 취침 3시간 전에 마무리하세요\n• 취침 전 강한 빛(스마트폰, TV)을 피하세요\n• 침실 환경을 어둡고, 조용하고, 시원하게 유지하세요\n• 취침 전 이완 활동(독서, 명상, 따뜻한 목욕)을 하세요\n\n## 한방에서의 수면 위생\n\n• 족욕: 취침 전 따뜻한 물에 발을 담가 혈액순환 촉진\n• 이침(耳鍼): 귀의 신문혈에 소형 자석을 부착하여 지속적 자극\n• 약베개: 석창포, 국화 등을 넣은 베개로 안정감 제공\n• 한방차: 대추차, 용안육차 등으로 심신 안정`,
  },
  {
    slug: 'restless-leg', type: 'ARTICLE' as const, order: 13,
    title: '하지불안증후군 이해하기',
    desc: '다리 불편감으로 잠을 이루지 못하는 하지불안증후군에 대해 설명합니다.',
    icon: '🦵',
    content: `하지불안증후군은 다리에 불쾌한 감각과 함께 다리를 움직이고 싶은 강한 충동을 느끼는 신경계 질환입니다.\n\n## 증상 특징\n\n• 다리의 불쾌감 (저리거나, 기어가는 느낌, 당기는 느낌)\n• 가만히 있을 때 악화\n• 움직이면 일시적으로 완화\n• 저녁이나 밤에 증상 악화\n• 수면 방해로 인한 만성 불면\n\n## 한의학적 치료\n\n한의학에서는 하지불안증후군을 혈허(血虛), 기혈순환 장애로 봅니다.\n\n• 한약치료: 보혈 안신 처방 (사물탕 가감, 작약감초탕 등)\n• 침구치료: 하지 경혈 자극으로 기혈 순환 개선\n• 뜸치료: 족삼리, 삼음교 등에 온열 자극\n• 부항치료: 하지 근육 이완 및 혈행 개선`,
  },
  {
    slug: 'herbal-medicine', type: 'ARTICLE' as const, order: 14,
    title: '수면장애 한약 치료',
    desc: '수면장애 치료에 사용되는 대표적인 한약 처방을 소개합니다.',
    icon: '🌿',
    content: `수면장애 치료에 사용되는 대표적인 한약 처방을 소개합니다.\n\n## 대표 처방\n\n### 귀비탕(歸脾湯)\n• 적응증: 과도한 사고, 걱정으로 인한 불면\n• 효과: 심장과 비장을 보하여 안신(安神) 효과\n\n### 천왕보심단(天王補心丹)\n• 적응증: 가슴 두근거림, 입마름을 동반한 불면\n• 효과: 심음(心陰)을 보충하여 수면 안정\n\n### 산조인탕(酸棗仁湯)\n• 적응증: 피로하지만 잠이 오지 않는 허번불면\n• 효과: 간혈(肝血)을 보하고 정신을 안정\n\n### 온담탕(溫膽湯)\n• 적응증: 소화불량, 답답함을 동반한 불면\n• 효과: 담(痰)을 제거하고 위장 기능 개선\n\n## 주의사항\n\n• 한약은 반드시 한의사의 진찰 후 체질에 맞게 처방받아야 합니다\n• 양약과 병용 시 한의사에게 반드시 알려주세요\n• 처방전 없이 임의로 한약을 복용하지 마세요`,
  },
  {
    slug: 'acupuncture-sleep', type: 'ARTICLE' as const, order: 15,
    title: '수면을 위한 침구치료',
    desc: '침구 치료가 수면의 질을 어떻게 개선하는지 알아봅니다.',
    icon: '📍',
    content: `침구치료는 수면장애에 효과적인 비약물적 치료법입니다.\n\n## 수면 관련 주요 경혈\n\n### 신문(神門) - HT7\n• 위치: 손목 안쪽 주름의 척측\n• 효과: 심장을 안정시키고 정신을 편안하게 함\n\n### 안면(安眠)\n• 위치: 귀 뒤쪽 유양돌기 아래\n• 효과: 수면 유도에 특효\n\n### 백회(百會) - GV20\n• 위치: 정수리 중앙\n• 효과: 정신을 맑게 하고 안정시킴\n\n### 사신총(四神聰)\n• 위치: 백회 주변 4개 혈\n• 효과: 불면, 건망, 두통 개선\n\n## 치료 과정\n\n• 초진 시 체질과 증상 파악\n• 개인별 맞춤 경혈 선정\n• 주 2-3회 시술 (1회 약 20-30분)\n• 보통 4-8주 치료 과정\n• 증상에 따라 한약 병행\n\n## 치료 효과\n\n• 수면 잠복기 단축 (잠드는 시간 줄어듦)\n• 수면 효율 증가\n• 야간 각성 횟수 감소\n• 주간 졸음 및 피로 개선\n• 부작용이 적은 안전한 치료`,
  }
];

async function main() {
  await prisma.sleepInfo.deleteMany(); // clean up
  
  for (const info of sleepInfos) {
    await prisma.sleepInfo.create({
      data: info
    });
  }
  console.log('SleepInfo seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
