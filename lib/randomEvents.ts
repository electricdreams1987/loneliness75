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
        stateEffects: { hasChildren: true, hasChild: true, noChild: false, familyOriented: true, livingWithFamily: true },
        lifeStatusEffects: { childrenCountDelta: 1, housingStatus: 'withFamily' }
      },
      {
        id: 'random_child_birth_B',
        label: '家計を見直す',
        description: '支出と働き方を整理して備える。',
        feedback: '派手さはないが、支える準備が進む。',
        effects: { familyCapital: 5, nextGeneration: 7, money: 2, freedom: -4 },
        stateEffects: { hasChildren: true, hasChild: true, noChild: false, familyOriented: true },
        lifeStatusEffects: { childrenCountDelta: 1, housingStatus: 'withFamily' }
      },
      {
        id: 'random_child_birth_C',
        label: '周囲に助けを頼む',
        description: '親族や友人に、必要な支援を相談する。',
        feedback: '頼る経験が、家族の外にも支えを作る。',
        effects: { familyCapital: 5, nextGeneration: 7, emergencySupport: 5, freedom: -3 },
        stateEffects: { hasChildren: true, hasChild: true, noChild: false, familyOriented: true },
        lifeStatusEffects: { childrenCountDelta: 1, housingStatus: 'withFamily', hasEmergencyContact: true }
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
        stateEffects: { careerInterrupted: true, companyBankrupt: true, employed: true, unemployed: false },
        lifeStatusEffects: { jobStatus: 'employee' }
      },
      {
        id: 'random_bankrupt_B',
        label: '学び直す',
        description: '講座や職業訓練を調べる。',
        feedback: '時間はかかるが、新しい居場所も見える。',
        effects: { career: 2, money: -5, outsideWorkBelonging: 4, meaningCapital: 4 },
        stateEffects: { careerInterrupted: true, companyBankrupt: true },
        lifeStatusEffects: { jobStatus: 'freelance' }
      },
      {
        id: 'random_bankrupt_C',
        label: '一人で抱える',
        description: '誰にも言わず、求人だけを眺める。',
        feedback: '静かに耐えるほど、助けは届きにくい。',
        effects: { career: -5, money: -6, relationshipCapital: -4, health: -4 },
        stateEffects: { careerInterrupted: true, companyBankrupt: true, unemployed: true, employed: false },
        lifeStatusEffects: { jobStatus: 'unemployed' }
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
        stateEffects: { caregiverExperience: true, usesSupportServices: true },
        lifeStatusEffects: { hasEmergencyContact: true }
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
        stateEffects: { reconnectedOldFriend: true, hasEmergencyContact: true, noEmergencyContact: false },
        lifeStatusEffects: { hasEmergencyContact: true }
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
        stateEffects: { hasTrustedNeighbor: true, hasLocalCommunity: true },
        lifeStatusEffects: { hasLocalCommunity: true }
      },
      {
        id: 'random_neighbor_B',
        label: 'お茶に誘う',
        description: '後日、短く話す時間を作る。',
        feedback: '偶然を、続く関係に変えた。',
        effects: { outsideWorkBelonging: 5, relationshipCapital: 5, emergencySupport: 4, freedom: -1 },
        stateEffects: { hasTrustedNeighbor: true, hasLocalCommunity: true },
        lifeStatusEffects: { hasLocalCommunity: true, hasEmergencyContact: true }
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
        stateEffects: { hasEmergencyContact: true, noEmergencyContact: false },
        lifeStatusEffects: { hasEmergencyContact: true }
      },
      {
        id: 'random_health_B',
        label: '病院で相談する',
        description: '受診し、生活上の注意も聞く。',
        feedback: '体調不安を仕組みで支え始めた。',
        effects: { health: 2, emergencySupport: 3, money: -2 },
        stateEffects: { usesSupportServices: true },
        lifeStatusEffects: { hasEmergencyContact: true }
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
  },
  {
    id: 'random_neighbor_moves',
    stageId: 'stage_11',
    title: '親しい隣人が引っ越す',
    description: 'よく挨拶していた隣人が、来月引っ越すらしい。',
    isRandom: true,
    probability: 0.14,
    anyConditions: [{ hasTrustedNeighbor: true }, { hasLocalCommunity: true }],
    choices: [
      {
        id: 'random_neighbor_moves_A',
        label: '連絡先を交換する',
        description: '引っ越し後も近況を送れるようにする。',
        feedback: '場所が変わっても、関係は少し残せる。',
        effects: { relationshipCapital: 4, emergencySupport: 3 },
        stateEffects: { neighborMovedAway: true, hasEmergencyContact: true, noEmergencyContact: false },
        lifeStatusEffects: { hasEmergencyContact: true }
      },
      {
        id: 'random_neighbor_moves_B',
        label: '別の顔見知りを作る',
        description: '店や清掃の日に、別の人にも挨拶する。',
        feedback: '一つの支えが消えても、次の接点を作った。',
        effects: { outsideWorkBelonging: 4, relationshipCapital: 3 },
        stateEffects: { hasLocalCommunity: true },
        lifeStatusEffects: { hasLocalCommunity: true }
      },
      {
        id: 'random_neighbor_moves_C',
        label: 'そのまま見送る',
        description: '寂しいが、特に連絡先は聞かない。',
        feedback: '静かに見送るほど、地域の線は少し細くなる。',
        effects: { freedom: 2, emergencySupport: -3, relationshipCapital: -2 },
        stateEffects: { neighborMovedAway: true }
      }
    ]
  },
  {
    id: 'random_partner_health',
    stageId: 'stage_9',
    title: 'パートナーが体調を崩す',
    description: '配偶者が検査を勧められた。暮らしをどう変える？',
    isRandom: true,
    probability: 0.14,
    conditions: { married: true },
    choices: [
      {
        id: 'random_partner_health_A',
        label: '受診に付き添う',
        description: '予定を動かして、一緒に病院へ行く。',
        feedback: '身近な支えとして、関係が現実の形を持った。',
        effects: { familyCapital: 5, emergencySupport: 4, health: -2, freedom: -3 },
        stateEffects: { partnerCareExperience: true, familyOriented: true }
      },
      {
        id: 'random_partner_health_B',
        label: '予定を見直す',
        description: '家事や仕事量を調整し、無理を減らす。',
        feedback: '日常を組み直すことで、支えやすくなった。',
        effects: { familyCapital: 3, money: 2, freedom: -2 },
        stateEffects: { partnerCareExperience: true }
      },
      {
        id: 'random_partner_health_C',
        label: '外部支援を調べる',
        description: '病院、制度、家事支援の相談先を見る。',
        feedback: '夫婦だけで抱えず、使える支えを増やした。',
        effects: { emergencySupport: 5, money: -2, meaningCapital: 2 },
        stateEffects: { usesSupportServices: true, partnerCareExperience: true },
        lifeStatusEffects: { hasEmergencyContact: true }
      }
    ]
  },
  {
    id: 'random_scam_call',
    stageId: 'stage_11',
    title: '怪しい電話が来る',
    description: '役所を名乗る相手から、口座情報を聞かれた。',
    isRandom: true,
    probability: 0.16,
    choices: [
      {
        id: 'random_scam_A',
        label: '家族や友人に確認する',
        description: 'すぐ切って、信頼できる人に聞く。',
        feedback: '迷った時に聞ける相手が、被害を遠ざけた。',
        effects: { emergencySupport: 4, relationshipCapital: 2 },
        stateEffects: { scamAware: true, hasEmergencyContact: true, noEmergencyContact: false },
        lifeStatusEffects: { hasEmergencyContact: true }
      },
      {
        id: 'random_scam_B',
        label: '消費生活窓口に相談する',
        description: '公的な相談先に電話し、対応を確認する。',
        feedback: '制度に頼ることで、一人の判断にしなかった。',
        effects: { emergencySupport: 5, meaningCapital: 2 },
        stateEffects: { scamAware: true, usesPublicConsultation: true }
      },
      {
        id: 'random_scam_C',
        label: '一人で判断する',
        description: '不安だが、誰にも聞かずに対応する。',
        feedback: '一人で抱えるほど、危ない話を見分けにくい。',
        effects: { money: -4, emergencySupport: -2, freedom: 1 },
        stateEffects: { scamAware: false }
      }
    ]
  },
  {
    id: 'random_animal_encounter',
    stageId: 'stage_10',
    title: '動物との出会い',
    description: '散歩中、保護猫の譲渡会の案内を見つけた。',
    isRandom: true,
    probability: 0.12,
    anyConditions: [{ livingAlone: true }, { soloLifestyle: true }],
    choices: [
      {
        id: 'random_animal_A',
        label: '世話を始める',
        description: '迎える準備をして、日々のリズムを作る。',
        feedback: '一人の暮らしに、世話をする朝が生まれた。',
        effects: { meaningCapital: 5, health: 2, money: -3, freedom: -2 },
        stateEffects: { hasCompanionAnimal: true, choseSolitudeWithStructure: true }
      },
      {
        id: 'random_animal_B',
        label: '保護団体を手伝う',
        description: '飼わずに、譲渡会の手伝いを申し出る。',
        feedback: '動物をきっかけに、人との接点も増えた。',
        effects: { outsideWorkBelonging: 4, relationshipCapital: 3, meaningCapital: 4 },
        stateEffects: { hasCompanionAnimal: true, communityActive: true },
        lifeStatusEffects: { hasLocalCommunity: true }
      },
      {
        id: 'random_animal_C',
        label: '見守るだけにする',
        description: '写真を保存し、今は生活を変えない。',
        feedback: '心は少し動いたが、日常はそのまま続いた。',
        effects: { meaningCapital: 2, freedom: 2 },
        stateEffects: { hasCompanionAnimal: false }
      }
    ]
  },
  {
    id: 'random_shop_closes',
    stageId: 'stage_11',
    title: 'なじみの店が閉店する',
    description: '朝に寄っていた店が、今月で閉まると知った。',
    isRandom: true,
    probability: 0.13,
    anyConditions: [{ hasLocalCommunity: true }, { communityActive: true }],
    choices: [
      {
        id: 'random_shop_A',
        label: '店主に挨拶する',
        description: '最後の日に行き、お礼を伝える。',
        feedback: '場所は消えても、関係の記憶は残った。',
        effects: { relationshipCapital: 3, meaningCapital: 2 },
        stateEffects: { lostLocalPlace: true }
      },
      {
        id: 'random_shop_B',
        label: '次の行き先を探す',
        description: '近くの店や集まりを一つ試してみる。',
        feedback: '居場所を失った後、次の接点を探し始めた。',
        effects: { outsideWorkBelonging: 4, relationshipCapital: 2 },
        stateEffects: { lostLocalPlace: true, hasLocalCommunity: true },
        lifeStatusEffects: { hasLocalCommunity: true }
      },
      {
        id: 'random_shop_C',
        label: '家にいる時間を増やす',
        description: '外へ出る理由が減り、家で過ごす。',
        feedback: '静かな時間は増えたが、朝の会話は減った。',
        effects: { freedom: 3, outsideWorkBelonging: -3 },
        stateEffects: { lostLocalPlace: true }
      }
    ]
  }
];
