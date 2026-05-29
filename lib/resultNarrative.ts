import { ChoiceHistory, DayScene, GameStats, LifeReflection, PlayerFlags } from '@/types/game';

const STAT_LABELS: Record<keyof GameStats, string> = {
  money: 'お金',
  career: '仕事',
  health: '健康',
  freedom: '自由',
  relationshipCapital: '友人や周囲との関係',
  familyCapital: '身近な家族関係',
  nextGeneration: '次世代との接点',
  outsideWorkBelonging: '仕事外の居場所',
  meaningCapital: '生きがい',
  emergencySupport: '緊急時の支え',
};

function effectWeight(history: ChoiceHistory): number {
  const effectScore = Object.values(history.effectsApplied).reduce(
    (total, value) => total + Math.abs(value ?? 0),
    0
  );
  const flagScore = history.stateEffectsApplied
    ? Object.keys(history.stateEffectsApplied).length * 3
    : 0;

  return effectScore + flagScore;
}

function summarizeEffects(effects: Partial<GameStats>): string {
  const sorted = (Object.entries(effects) as Array<[keyof GameStats, number]>)
    .filter(([, value]) => value !== 0)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
    .slice(0, 2);

  if (sorted.length === 0) {
    return 'その選択は、数字には出にくい小さな癖として人生に残りました。';
  }

  const phrases = sorted.map(([key, value]) =>
    `${STAT_LABELS[key]}を${value > 0 ? '少し増やす' : '少し削る'}`
  );

  return `その積み重ねは、${phrases.join('一方で、')}選択でした。`;
}

export function buildLifeReflections(history: ChoiceHistory[]): LifeReflection[] {
  if (!history.length) {
    return [];
  }

  const selected = history
    .map((item, index) => ({ item, index, intensity: effectWeight(item) }))
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 5)
    .sort((a, b) => a.index - b.index);

  return selected.map(({ item, intensity }) => {
    const actionText = (item.choiceDescription || `「${item.choiceLabel}」`).replace(/。$/, '');

    return {
      stageLabel: item.stageLabel,
      intensity,
      text: `${item.stageLabel}、あなたは「${item.eventTitle || '人生の分岐点'}」で、${actionText}を選びました。${summarizeEffects(item.effectsApplied)}`,
    };
  });
}

export function buildSeventyFiveDay(
  stats: GameStats,
  flags: PlayerFlags | null,
  risk: number
): DayScene {
  const hasOutsideThread =
    stats.relationshipCapital >= 50 ||
    stats.outsideWorkBelonging >= 50 ||
    stats.emergencySupport >= 50 ||
    Boolean(
      flags?.hasTrustedNeighbor ||
        flags?.hasEmergencyContact ||
        flags?.reconnectedOldFriend ||
        flags?.usesSupportServices ||
        flags?.usesPublicConsultation ||
        flags?.hasCompanionAnimal
    );
  const hasMatureSolitude =
    (stats.freedom >= 60 || Boolean(flags?.soloLifestyle)) &&
    hasOutsideThread &&
    (stats.outsideWorkBelonging >= 45 ||
      Boolean(
        flags?.joinedHobbyCommunity ||
          flags?.choseSolitudeWithStructure ||
          flags?.hasCompanionAnimal ||
          flags?.usesSupportServices
      ));

  if (hasMatureSolitude) {
    return {
      type: 'matureFreedom',
      title: '選び取った静けさのある一日',
      paragraphs: [
        `朝、部屋は静かです。けれど、その静けさは誰にも気づかれない沈黙ではありません。${flags?.hasCompanionAnimal ? '世話を待つ小さな存在や、' : ''}趣味の予定、地域の顔見知り、または短く連絡できる相手が、今日のどこかに細く残っています。`,
        '昼、あなたは一人で食事をします。急かされない時間を楽しみながらも、必要なら連絡できる名前がいくつか浮かびます。一人でいることと、孤立していることは違うのだと感じられます。',
        `夜、予定のない時間も自分のものです。${flags?.usesSupportServices || flags?.usesPublicConsultation ? '相談先や見守りの仕組みも控えています。' : ''}自由は、助けを呼べる細い線と一緒にあるとき、寂しさではなく落ち着きとして残ります。`
      ],
      note: 'この結果は、一人の自由を罰していません。リスクになるのは、自由そのものではなく、困った時に誰にも届かない状態です。',
    };
  }

  if (risk <= 49) {
    return {
      type: 'lowRisk',
      title: '名前を呼ばれる一日',
      paragraphs: [
        '朝、短いメッセージか電話が届きます。用件は大げさなものではありません。ただ、誰かがあなたの今日を少し気にしていることが分かります。',
        '昼、外へ出ると、行きつけの場所で名前を呼ばれます。家族、友人、地域、趣味のどれかで作ってきた関係が、老後の日常に小さな明かりをつけています。',
        '夜、一人で過ごす時間があっても、それは孤立ではありません。必要な時に声を出せば届く相手がいる。その実感が、静かな部屋を少し温かくします。'
      ],
      note: '孤独感がゼロという意味ではありません。寂しい夜があっても、孤立へ落ちきらない支えがある状態です。',
    };
  }

  if (risk <= 74) {
    return {
      type: 'mediumRisk',
      title: 'まだ結び直せる一日',
      paragraphs: [
        '朝、通知は多くありません。けれど、履歴を少しさかのぼれば、連絡してもよさそうな相手が何人か見つかります。',
        '昼、予定は少ないものの、外へ出るきっかけは残っています。地域の掲示、昔の友人、病院帰りの挨拶。どれも小さいけれど、関係を作り直す入口です。',
        '夜、不安は少しあります。それでも完全に孤立しているわけではありません。次に自分から一通送るかどうかで、明日の景色は変わります。'
      ],
      note: '孤独は感じても、孤立はまだ固定されていません。細い接点を太くする余地があります。',
    };
  }

  return {
    type: 'highRisk',
    title: '誰に届くか分からない一日',
    paragraphs: [
      '朝から、誰とも話さないまま時間が過ぎます。自由なはずの予定表は、白いまま動きません。',
      '昼、病院や役所の書類で緊急連絡先の欄に手が止まります。名前を書ける相手がいても、今も頼ってよいのか分からない。その迷いが、孤独よりも現実的な不安として残ります。',
      '夜、一日は静かに終わります。問題は一人でいることではありません。もし明日、体調を崩した時、誰が気づくのか分からないことです。'
    ],
    note: '怖がらせるための結末ではありません。孤立は、今からでも挨拶、連絡、相談先の登録でほどけます。',
  };
}
