import { LifeEvent } from '@/types/game';

export const randomEvents: LifeEvent[] = [
  {
    id: 'random_child_birth',
    stageId: 'stage_5',
    title: '子どもが生まれる',
    description: '予定より早く、家族が一人増えた。暮らしをどう組み直す？',
    isRandom: true,
    probability: 0.16,
    conditions: { noChild: false, hasChildren: false },
    anyConditions: [{ married: true }, { hasPartner: true }],
    choices: [
      {
        id: 'random_child_birth_A',
        label: '育休を取る',
        description: '仕事を調整し、最初の数か月を家で過ごす。',
        feedback: '生活は慌ただしくなるが、家族の土台ができる。',
        effects: { familyCapital: 8, nextGeneration: 10, freedom: -6, career: -2, money: -3 },
        stateEffects: { hasChildren: true, hasChild: true, noChild: false, familyOriented: true, livingWithFamily: true }
      },
      {
        id: 'random_child_birth_B',
        label: '家計を見直す',
        description: '支出と働き方を整理して備える。',
        feedback: '派手さはないが、支える準備が進む。',
        effects: { familyCapital: 5, nextGeneration: 7, money: 2, freedom: -4 },
        stateEffects: { hasChildren: true, hasChild: true, noChild: false, familyOriented: true }
      },
      {
        id: 'random_child_birth_C',
        label: '周囲に助けを頼む',
        description: '親族や友人に、必要な支援を相談する。',
        feedback: '頼る経験が、家族の外にも支えを作る。',
        effects: { familyCapital: 5, nextGeneration: 7, emergencySupport: 5, freedom: -3 },
        stateEffects: { hasChildren: true, hasChild: true, noChild: false, familyOriented: true }
      }
    ]
  },
  {
    id: 'random_company_bankrupt',
    stageId: 'stage_7',
    title: '会社が倒産する',
    description: '突然、会社がなくなった。次にどう動く？',
    isRandom: true,
    probability: 0.14,
    conditions: { employed: true },
    choices: [
      {
        id: 'random_bankrupt_A',
        label: 'すぐ転職活動する',
        description: '知人にも声をかけ、仕事を探す。',
        feedback: '不安はあるが、孤立せずに動き出した。',
        effects: { career: 3, money: -4, relationshipCapital: 3, health: -2 },
        stateEffects: { careerInterrupted: true, companyBankrupt: true, employed: true, unemployed: false }
      },
      {
        id: 'random_bankrupt_B',
        label: '学び直す',
        description: '講座や職業訓練を調べる。',
        feedback: '時間はかかるが、新しい居場所も見える。',
        effects: { career: 2, money: -5, outsideWorkBelonging: 4, meaningCapital: 4 },
        stateEffects: { careerInterrupted: true, companyBankrupt: true }
      },
      {
        id: 'random_bankrupt_C',
        label: '一人で抱える',
        description: '誰にも言わず、求人だけを眺める。',
        feedback: '静かに耐えるほど、助けは届きにくい。',
        effects: { career: -5, money: -6, relationshipCapital: -4, health: -4 },
        stateEffects: { careerInterrupted: true, companyBankrupt: true, unemployed: true, employed: false }
      }
    ]
  },
  {
    id: 'random_parent_hospitalized',
    stageId: 'stage_7',
    title: '親が急に入院する',
    description: '夜に病院から連絡が来た。誰と動く？',
    isRandom: true,
    probability: 0.16,
    anyConditions: [{ familyOriented: true }, { caregiverExperience: true }],
    choices: [
      {
        id: 'random_parent_A',
        label: '病院へ向かう',
        description: '仕事を切り上げ、状況を確認する。',
        feedback: '負担は増えるが、支援の現実を知る。',
        effects: { emergencySupport: 4, meaningCapital: 3, health: -2, freedom: -3, money: -2 },
        stateEffects: { caregiverExperience: true }
      },
      {
        id: 'random_parent_B',
        label: '親族で分担する',
        description: 'きょうだいと連絡を取り、役割を決める。',
        feedback: '一人で抱えない形ができる。',
        effects: { familyCapital: 3, emergencySupport: 5, meaningCapital: 2, freedom: -2 },
        stateEffects: { caregiverExperience: true }
      },
      {
        id: 'random_parent_C',
        label: '支援窓口を聞く',
        description: '病院や自治体に相談先を確認する。',
        feedback: '制度を知ることで、慌て方が少し変わる。',
        effects: { emergencySupport: 5, meaningCapital: 2, freedom: -1 },
        stateEffects: { caregiverExperience: true, usesSupportServices: true }
      }
    ]
  },
  {
    id: 'random_old_friend_message',
    stageId: 'stage_10',
    title: '昔の友人から連絡',
    description: '短い近況メッセージが届いた。返す？',
    isRandom: true,
    probability: 0.18,
    anyConditions: [{ hasOldFriends: true }, { keptSchoolFriends: true }, { reconnectedOldFriend: true }],
    choices: [
      {
        id: 'random_friend_A',
        label: 'すぐ返す',
        description: '短く近況を返す。',
        feedback: '関係は短い返事から戻る。',
        effects: { relationshipCapital: 5, emergencySupport: 2, meaningCapital: 2 },
        stateEffects: { reconnectedOldFriend: true, hasOldFriends: true }
      },
      {
        id: 'random_friend_B',
        label: '電話してみる',
        description: '五分だけ声を聞く。',
        feedback: '声を聞くと、時間の距離が縮む。',
        effects: { relationshipCapital: 7, emergencySupport: 3, freedom: -1 },
        stateEffects: { reconnectedOldFriend: true, hasEmergencyContact: true, noEmergencyContact: false }
      },
      {
        id: 'random_friend_C',
        label: '返しそびれる',
        description: 'あとで返そうとして忘れる。',
        feedback: '細い糸は、少しずつ遠のく。',
        effects: { freedom: 2, relationshipCapital: -3, emergencySupport: -2 },
        stateEffects: { lostOldFriends: true }
      }
    ]
  },
  {
    id: 'random_neighbor_help',
    stageId: 'stage_11',
    title: '近所の人に助けられる',
    description: '重い荷物を運ぶ時、声をかけられた。',
    isRandom: true,
    probability: 0.18,
    anyConditions: [{ hasLocalCommunity: true }, { communityActive: true }, { hasTrustedNeighbor: true }],
    choices: [
      {
        id: 'random_neighbor_A',
        label: 'お礼を伝える',
        description: '名前を聞き、次に会った時も挨拶する。',
        feedback: '近所の顔が、少しだけ支えに変わる。',
        effects: { outsideWorkBelonging: 4, relationshipCapital: 4, emergencySupport: 3 },
        stateEffects: { hasTrustedNeighbor: true, hasLocalCommunity: true }
      },
      {
        id: 'random_neighbor_B',
        label: 'お茶に誘う',
        description: '後日、短く話す時間を作る。',
        feedback: '偶然を、続く関係に変えた。',
        effects: { outsideWorkBelonging: 5, relationshipCapital: 5, emergencySupport: 4, freedom: -1 },
        stateEffects: { hasTrustedNeighbor: true, hasLocalCommunity: true }
      },
      {
        id: 'random_neighbor_C',
        label: '会釈だけで終える',
        description: '助かったが、深くは関わらない。',
        feedback: '負担はないが、関係はまだ細い。',
        effects: { relationshipCapital: 1, freedom: 1 }
      }
    ]
  },
  {
    id: 'random_health_down',
    stageId: 'stage_9',
    title: '体調を崩す',
    description: '数日寝込み、連絡先の少なさが気になる。',
    isRandom: true,
    probability: 0.15,
    choices: [
      {
        id: 'random_health_A',
        label: '誰かに連絡する',
        description: '友人や家族に短く状況を送る。',
        feedback: '頼る練習が、次の安心になる。',
        effects: { health: -3, emergencySupport: 5, relationshipCapital: 2 },
        stateEffects: { hasEmergencyContact: true, noEmergencyContact: false }
      },
      {
        id: 'random_health_B',
        label: '病院で相談する',
        description: '受診し、生活上の注意も聞く。',
        feedback: '体調不安を仕組みで支え始めた。',
        effects: { health: 2, emergencySupport: 3, money: -2 },
        stateEffects: { usesSupportServices: true }
      },
      {
        id: 'random_health_C',
        label: '一人で寝て治す',
        description: '連絡せず、数日休む。',
        feedback: '回復しても、不安の形は残る。',
        effects: { health: -4, freedom: 2, emergencySupport: -4 },
        stateEffects: { noEmergencyContact: true }
      }
    ]
  }
];
