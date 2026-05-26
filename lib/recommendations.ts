import { GameStats } from '@/types/game';

type RecommendationItem = {
  key: keyof GameStats;
  title: string;
  factor: string;
  action: string;
  reason: string;
};

const RECOMMENDATION_DATABASE: Record<string, RecommendationItem> = {
  relationshipCapital: {
    key: 'relationshipCapital',
    title: '身近な友人関係のメンテナンス',
    factor: '友人・周囲との関係資本の不足',
    action: '昔の友人への気軽な連絡や、共通の趣味を持つ新たな友人作り。週に1回は「仕事と関係ない相手」と雑談する時間を作りましょう。',
    reason: '仕事での肩書を失った老後、利害関係のない友人の存在は心拍数や認知機能の維持にも好影響を与え、日々に笑顔と活力をもたらします。'
  },
  familyCapital: {
    key: 'familyCapital',
    title: '身近な家族関係の厚みづくり',
    factor: '老後に身近な支えとなる家族関係の薄さ',
    action: 'パートナー、子ども、きょうだい、親戚など、長く支え合える相手と近況や困りごとを話す時間を作りましょう。',
    reason: 'ここでの家族資本は、親に支えられる若年期の安心ではなく、老後に身近で支え合える家族的な関係の厚みを表します。'
  },
  nextGeneration: {
    key: 'nextGeneration',
    title: '次世代（若い世代）との接点づくり',
    factor: '子ども・若い世代との関わりの薄さ',
    action: '自分の子どもに限らず、職場の若手、地域の青少年育成ボランティア、後輩の活動などを精神的・技術的に支援する側に回ること。',
    reason: '次世代の成長に関わり、知恵や経験をパスすることは、自分の人生が社会に肯定されたという深い「生きがい（意味資本）」を生み出します。'
  },
  outsideWorkBelonging: {
    key: 'outsideWorkBelonging',
    title: '仕事（会社）以外の居場所（サードプレイス）の開拓',
    factor: '会社以外のコミュニティのなさ',
    action: '自治会、趣味のサークル、地域のNPO、あるいは「いつも挨拶する喫茶店」など、肩書のない素の自分で通える場所を1つ見つけましょう。',
    reason: '定年後に「行く場所がない」状態は急激な心身の衰えを招きます。会社以外に「自分を待っている場」があることは、老後の最高の盾です。'
  },
  emergencySupport: {
    key: 'emergencySupport',
    title: '緊急時のセーフティネットの構築',
    factor: '緊急時に本当に頼れる手段の不足',
    action: '緊急連絡先の整理、地域で見守りをしてくれる自治体サービスの調査、あるいは合鍵を預け合えるほど信頼できる隣人との関係構築。',
    reason: 'どれだけお金や健康があっても、突然倒れたときに誰にも気づかれない「孤立死」のリスクは、事前の具体的な手立てでしか防げません。'
  },
  health: {
    key: 'health',
    title: '「動ける身体」を保つ健康投資',
    factor: '心身の健康状態への不安',
    action: '年1回の人間ドック、日常的な有酸素運動（ウォーキングなど）、十分な睡眠の確保。健康管理を生活の最優先事項に格上げしてください。',
    reason: 'どんなに豊かな関係性や資産があっても、寝たきりや激しい痛みを伴う生活は行動範囲を著しく狭め、社会との接点を奪う原因になります。'
  },
  money: {
    key: 'money',
    title: '老後の経済設計と現実的なシミュレーション',
    factor: '老後資金や経済的基盤の不安',
    action: '現状の資産状況と年金の受給見込み額を洗い出し、75歳以降の固定費の見直しや資産寿命のシミュレーションを行いましょう。',
    reason: 'お金だけで孤独は防げませんが、経済的な困窮は「他人に頼るための心の余裕」を奪い、より孤立した環境に自分を追い込む原因になります。'
  },
  meaningCapital: {
    key: 'meaningCapital',
    title: '自分だけの「生きがい・日課」の発見',
    factor: '生きがいや人生の意味の喪失感',
    action: '誰に頼まれなくても自分が面白いと思える小さな日課（読書、料理、園芸、創作など）を持ち、毎日を能動的に過ごす習慣をつけましょう。',
    reason: '自分の行動に目的や意味を感じられる状態（意味資本）は、一人の時間であっても寂しさに飲み込まれず、精神的に自立して生きる力になります。'
  }
};

export function getRecommendations(stats: GameStats): string[] {
  const result: string[] = [];

  // 関係資本、家族資本、次世代、仕事以外の所属、緊急時サポート、健康、お金、意味資本
  const targetKeys: Array<keyof GameStats> = [
    'relationshipCapital',
    'familyCapital',
    'nextGeneration',
    'outsideWorkBelonging',
    'emergencySupport',
    'health',
    'money',
    'meaningCapital'
  ];

  // 各指標の (値, キー) を並べて低い順にソートする
  const sortedStats = targetKeys
    .map(key => ({ key, value: stats[key] }))
    .sort((a, b) => a.value - b.value);

  // 特に低い3つの指標（値が低い上位3つ）をピックアップ
  const topWeakKeys = sortedStats.slice(0, 3).map(item => item.key);

  topWeakKeys.forEach((key, index) => {
    const item = RECOMMENDATION_DATABASE[key];
    if (item) {
      result.push(
        `【要因${index + 1}：${item.factor}（現在値：${stats[key]}点）】\n` +
        `■ 改善アクション: ${item.action}\n` +
        `■ その理由: ${item.reason}`
      );
    }
  });

  return result;
}
