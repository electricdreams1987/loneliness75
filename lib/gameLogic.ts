import { GameStats, GameResult, PlayerFlags } from '@/types/game';
import { getEnding } from './endings';
import { getScenario } from './resultText';
import { getRecommendations } from './recommendations';

export const INITIAL_STATS: GameStats = {
  money: 10,                 // 18歳はお金がほとんどない
  career: 5,                 // キャリアはこれから築く
  health: 85,                // 若さによる高い健康値
  freedom: 75,               // 比較的高い自由度
  relationshipCapital: 20,   // 関係資本
  familyCapital: 30,         // パートナー・子ども・親戚など、老後に身近な家族関係はこれから築く
  nextGeneration: 5,         // 次世代との接点はほぼない
  outsideWorkBelonging: 35,  // 学校以外の「大人のサードプレイス」はまだ少ない
  meaningCapital: 40,        // 生きがいは模索中
  emergencySupport: 30,      // 緊急サポート
};

export const INITIAL_FLAGS: PlayerFlags = {
  hasPartner: false,
  married: false,
  hasChildren: false,
  hasChild: false,
  noChild: false,
  single: true,
  divorced: false,
  livingAlone: false,
  livingWithFamily: false,
  employed: true,
  unemployed: false,
  careerInterrupted: false,
  companyBankrupt: false,
  managementTrack: false,
  careerFocused: false,
  communityActive: false,
  hasLocalCommunity: false,
  noLocalCommunity: false,
  hasOldFriends: false,
  lostOldFriends: false,
  localFriendship: false,
  familyOriented: false,
  soloLifestyle: false,
  caregiverExperience: false,
  keptSchoolFriends: false,
  joinedHobbyCommunity: false,
  hasTrustedNeighbor: false,
  hasEmergencyContact: false,
  noEmergencyContact: true,
  reconnectedOldFriend: false,
  workIdentityDependent: false,
  familyPresentButDistant: false,
  choseSolitudeWithStructure: false,
  usesSupportServices: false,
  hasIntergenerationalContact: false,
};

// ステータスを0〜100の範囲に収める関数
export function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

// ステータスを適用し、更新されたステータスを返す関数
export function applyEffects(currentStats: GameStats, effects: Partial<GameStats>): GameStats {
  const newStats = { ...currentStats };
  (Object.keys(INITIAL_STATS) as Array<keyof GameStats>).forEach((key) => {
    if (effects[key] !== undefined) {
      newStats[key] = clamp(newStats[key] + (effects[key] ?? 0));
    }
  });
  return newStats;
}

export function applyStateEffects(
  currentFlags: PlayerFlags,
  stateEffects: Partial<PlayerFlags> = {}
): PlayerFlags {
  return {
    ...currentFlags,
    ...stateEffects,
  };
}

// 孤独リスクの計算
export function calculateLonelinessRisk(stats: GameStats): number {
  // 1. 重み付き充足度の計算
  // relationshipCapital: 22%
  // familyCapital: 15%
  // nextGeneration: 15%
  // outsideWorkBelonging: 12%
  // emergencySupport: 18%
  // health: 8%
  // money: 5%
  // meaningCapital: 5%
  const weightedFulfillment =
    stats.relationshipCapital * 0.22 +
    stats.familyCapital * 0.15 +
    stats.nextGeneration * 0.15 +
    stats.outsideWorkBelonging * 0.12 +
    stats.emergencySupport * 0.18 +
    stats.health * 0.08 +
    stats.money * 0.05 +
    stats.meaningCapital * 0.05;

  // 基礎孤独リスクを 105 から引く形にして全体的に5点底上げ
  let risk = 105 - weightedFulfillment;

  // 2. 各種補正
  // moneyが高い場合、最大5点だけ孤独リスクを下げる
  if (stats.money >= 60) {
    const moneyDiscount = stats.emergencySupport < 40 ? 2 : 4; // 割引効果をマイルドに
    risk -= moneyDiscount;
  }

  // healthが40未満なら孤独リスクを10点上げる（閾値を30から40に引き上げ、加算を8から10に）
  if (stats.health < 40) {
    risk += 10;
  }

  // relationshipCapital と emergencySupport が両方45未満なら孤独リスクを12点上げる（閾値を40から45に、加算を10から12に）
  if (stats.relationshipCapital < 45 && stats.emergencySupport < 45) {
    risk += 12;
  }

  // nextGeneration と familyCapital が両方35未満で、outsideWorkBelongingも40未満なら孤独リスクを10点上げる（閾値と加算を強化）
  if (stats.nextGeneration < 35 && stats.familyCapital < 35 && stats.outsideWorkBelonging < 40) {
    risk += 10;
  }

  // meaningCapital が 75 以上なら孤独リスクを 4 点下げる（割引効果を5から4に）
  if (stats.meaningCapital >= 75) {
    risk -= 4;
  }

  // health が 75 以上 かつ outsideWorkBelonging が 75 以上なら孤独リスクを 4 点下げる（割引効果を5から4に）
  if (stats.health >= 75 && stats.outsideWorkBelonging >= 75) {
    risk -= 4;
  }

  // 一人の自由でも、外部接点と緊急時の支えがあれば「成熟した自由」としてリスクを下げる
  if (
    stats.freedom >= 60 &&
    stats.emergencySupport >= 45 &&
    (stats.relationshipCapital >= 55 || stats.outsideWorkBelonging >= 55 || stats.nextGeneration >= 55)
  ) {
    risk -= 8;
  }

  // 家族関係があっても、緊急時の支えや仕事外の居場所が薄い場合は孤立リスクを残す
  if (stats.familyCapital >= 60 && stats.emergencySupport < 40 && stats.outsideWorkBelonging < 40) {
    risk += 5;
  }

  // 新たなペナルティ：自由・キャリアが高く関係資本が低い場合リスク上昇
  if (stats.freedom >= 60 && stats.career >= 60 && (stats.relationshipCapital < 45 || stats.emergencySupport < 45)) {
    risk += 6; // 5から6に
  }
  // お金が高く関係資本が低い場合リスク上昇
  if (stats.money >= 70 && stats.relationshipCapital < 45) {
    risk += 6; // 5から6に
  }
// 家族資本・次世代・地域所属が高い場合リスクを下げる（割引効果を5から4にマイルド化）
if (stats.familyCapital >= 60) {
  risk -= 4;
}
if (stats.nextGeneration >= 60) {
  risk -= 4;
}
if (stats.outsideWorkBelonging >= 60) {
  risk -= 4;
}

// 最終的な値を0〜100に丸める
  return Math.round(clamp(risk));
}

// リスク帯の判定
export function getRiskBand(risk: number): { band: GameResult['riskBand']; label: string } {
  if (risk <= 24) return { band: 'low', label: '低リスク' };
  if (risk <= 49) return { band: 'semiLow', label: 'やや低リスク' };
  if (risk <= 69) return { band: 'medium', label: '中リスク' };
  if (risk <= 84) return { band: 'high', label: '高リスク' };
  return { band: 'critical', label: '要対策リスク' };
}

// 強み・弱みの抽出
export function extractStrengthsAndWeaknesses(stats: GameStats): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const statLabels: Record<keyof GameStats, string> = {
    money: '老後資金・お金',
    career: '仕事・キャリア',
    health: '心身の健康',
    freedom: '個人の自由度',
    relationshipCapital: '友人や周囲との関係資本',
    familyCapital: '老後に身近な支えとなる家族関係',
    nextGeneration: '子ども・次世代との接点',
    outsideWorkBelonging: '仕事以外の地域や趣味の所属',
    meaningCapital: '生きがいや意味資本',
    emergencySupport: 'いざという時の緊急時サポート',
  };

  // 60以上を強み、40未満を弱みとして抽出
  (Object.keys(stats) as Array<keyof GameStats>).forEach((key) => {
    // 孤独リスクに大きく関係する項目を優先
    if (['relationshipCapital', 'familyCapital', 'nextGeneration', 'outsideWorkBelonging', 'emergencySupport', 'health', 'money', 'meaningCapital'].includes(key)) {
      if (stats[key] >= 65) {
        strengths.push(statLabels[key]);
      } else if (stats[key] < 40) {
        weaknesses.push(statLabels[key]);
      }
    }
  });

  // もし何もなければ代わりのテキストを追加
  if (strengths.length === 0) strengths.push('バランスの取れた中庸なステータス');
  if (weaknesses.length === 0) weaknesses.push('特筆すべき深刻な不足なし');

  return { strengths, weaknesses };
}

// ゲームの最終結果を算出するメイン関数
export function processGameResult(stats: GameStats): GameResult {
  const risk = calculateLonelinessRisk(stats);
  const { band, label: riskBandLabel } = getRiskBand(risk);
  const ending = getEnding(stats, risk);
  const { strengths, weaknesses } = extractStrengthsAndWeaknesses(stats);
  const scenario = getScenario(ending.id, stats);
  const recommendations = getRecommendations(stats);

  return {
    stats,
    lonelinessRisk: risk,
    riskBand: band,
    riskBandLabel,
    endingName: ending.name,
    routeName: ending.routeName,
    endingId: ending.id,
    scenario,
    strengths,
    weaknesses,
    recommendations,
  };
}
