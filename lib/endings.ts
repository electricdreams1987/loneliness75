import { GameStats } from '@/types/game';

export type Ending = {
  id: string;
  name: string;
  routeName: string;
  description: string;
};

export const ENDINGS: Record<string, Ending> = {
  relation_stable: {
    id: 'relation_stable',
    name: '温かな絆に包まれる平穏な晩年',
    routeName: '関係分散・安定ルート',
    description: '家族や友人、地域との関係をバランスよく育んできたあなたの老後は、非常に穏やかで安心感に満ちています。頼れる人が周囲に多く、孤独の影はありません。'
  },
  freedom_unstable: {
    id: 'freedom_unstable',
    name: '自由の代償、静寂すぎる部屋',
    routeName: '自由優先・後半不安定ルート',
    description: '若い頃から自由と自己実現を極めてきた人生。しかし、75歳になった今、気ままに過ごせる一方で、数日間誰とも話さない静けさにふと寂しさを感じる瞬間が増えています。'
  },
  money_isolation: {
    id: 'money_isolation',
    name: '億万長者の孤独な城',
    routeName: 'お金はあるが誰もいないルート',
    description: '十分な資産を蓄え、経済的には何不自由ない暮らしです。しかし、お金で雇ったサービス以外の「人間味のある繋がり」がなく、広すぎる家で一人寂しく暮らしています。'
  },
  next_gen_heritage: {
    id: 'next_gen_heritage',
    name: '未来へ繋ぐ、愛されし相談役',
    routeName: '次世代継承ルート',
    description: '子どもや若い世代の育成、支援に心を注いできた結果、年齢を重ねても多くの若い人々があなたを慕って訪ねてきます。精神的な豊かさと生きがいに満ちた晩年です。'
  },
  family_dependence: {
    id: 'family_dependence',
    name: '家族という唯一の蜘蛛の糸',
    routeName: '家族依存・死別リスクルート',
    description: '家族との強い絆に支えられていますが、友人や地域との関わりはほぼゼロです。パートナーとの死別や子ども世帯の都合によって、一気に社会から孤立する脆さを孕んでいます。'
  },
  community_coexistence: {
    id: 'community_coexistence',
    name: '街の太陽、愛される隣人',
    routeName: '地域共生ルート',
    description: '仕事以外の地域活動や趣味の場に積極的に顔を出してきたあなたは、近所やサークルの仲間にとって欠かせない存在です。血縁がなくとも、日常の確かな温もりに溢れています。'
  },
  career_isolation: {
    id: 'career_isolation',
    name: '戦士の休息、かつての栄光の残影',
    routeName: 'キャリア成功・孤独蓄積ルート',
    description: '仕事で大いなる成果を挙げ、かつては注目の的でした。しかし肩書を失った今、当時の人脈は消え去り、過去の栄光を思い出しながら一人で静かに暮らす日々です。'
  },
  critical_isolation: {
    id: 'critical_isolation',
    name: '絶海の孤島での静かな闘い',
    routeName: '要対策・孤立エンディング接近',
    description: '他者との繋がり、家族、地域、そして緊急時のサポートのすべてが極めて希薄な状態です。何かが起きる前に、現実世界で小さな関係性を結び直す必要があります。'
  },
  default_route: {
    id: 'default_route',
    name: '標準的なマイペース晩年',
    routeName: 'バランス型・現状維持ルート',
    description: '特に大きなトラブルもなく、ごく一般的な老後を送っています。しかし、人間関係が少し内向きになっているため、これから関係のメンテナンスが必要です。'
  }
};

  export function getEnding(stats: GameStats, risk: number): Ending {
  // 1. 孤独リスクが極端に高い場合（優先判定）
  if (risk >= 85) {
    return ENDINGS.critical_isolation;
  }

  // 2. 次世代継承ルート（familyとnextGenerationが高い）
  if ((stats.nextGeneration >= 65 && stats.meaningCapital >= 60) || (stats.familyCapital >= 65 && stats.nextGeneration >= 60)) {
    return ENDINGS.next_gen_heritage;
  }

  // 3. 関係分散・安定ルート
  if (stats.relationshipCapital >= 60 && stats.familyCapital >= 50 && stats.outsideWorkBelonging >= 50) {
    return ENDINGS.relation_stable;
  }

  // 4. 自由優先・後半不安定ルート（自由・キャリア高く関係資本低）
  if (stats.freedom >= 60 && stats.career >= 60 && stats.relationshipCapital < 40 && stats.familyCapital < 40) {
    return ENDINGS.freedom_unstable;
  }

  // 5. お金はあるが誰もいないルート
  if (stats.money >= 70 && stats.career >= 60 && stats.relationshipCapital < 40 && stats.emergencySupport < 40) {
    return ENDINGS.money_isolation;
  }

  // 6. 家族依存・死別リスクルート
  if (stats.familyCapital >= 65 && stats.outsideWorkBelonging < 40 && stats.relationshipCapital < 40) {
    return ENDINGS.family_dependence;
  }

  // 7. 地域共生ルート
  if (stats.outsideWorkBelonging >= 65 && stats.relationshipCapital >= 60) {
    return ENDINGS.community_coexistence;
  }

  // 8. キャリア成功・孤独蓄積ルート
  if (stats.career >= 65 && stats.money >= 60 && stats.relationshipCapital < 40) {
    return ENDINGS.career_isolation;
  }

  // 9. デフォルト
  return ENDINGS.default_route;
}
