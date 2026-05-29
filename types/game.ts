export type GameStats = {
  money: number;
  career: number;
  health: number;
  freedom: number;
  relationshipCapital: number;
  familyCapital: number;
  nextGeneration: number;
  outsideWorkBelonging: number;
  meaningCapital: number;
  emergencySupport: number;
};

export type PlayerFlags = {
  hasPartner: boolean;
  married: boolean;
  hasChildren: boolean;
  hasChild: boolean;
  noChild: boolean;
  single: boolean;
  divorced: boolean;
  livingAlone: boolean;
  livingWithFamily: boolean;
  employed: boolean;
  unemployed: boolean;
  careerInterrupted: boolean;
  companyBankrupt: boolean;
  managementTrack: boolean;
  careerFocused: boolean;
  communityActive: boolean;
  hasLocalCommunity: boolean;
  noLocalCommunity: boolean;
  hasOldFriends: boolean;
  lostOldFriends: boolean;
  localFriendship: boolean;
  familyOriented: boolean;
  soloLifestyle: boolean;
  caregiverExperience: boolean;
  keptSchoolFriends: boolean;
  joinedHobbyCommunity: boolean;
  hasTrustedNeighbor: boolean;
  hasEmergencyContact: boolean;
  noEmergencyContact: boolean;
  reconnectedOldFriend: boolean;
  workIdentityDependent: boolean;
  familyPresentButDistant: boolean;
  choseSolitudeWithStructure: boolean;
  usesSupportServices: boolean;
  hasIntergenerationalContact: boolean;
};

export type GameState = {
  stats: GameStats;
  flags: PlayerFlags;
};

export type Choice = {
  id: string;
  label: string;
  description: string;
  feedback: string;
  effects: Partial<GameStats>;
  stateEffects?: Partial<PlayerFlags>;
};

export type LifeEvent = {
  id: string;
  stageId: string;
  title: string;
  description: string;
  conditions?: Partial<PlayerFlags>;
  anyConditions?: Partial<PlayerFlags>[];
  isRandom?: boolean;
  probability?: number;
  /** イベント固有の画像パス（将来的に各イベントごとに差し替え可能） */
  image?: string;
  /** イベント画像のaltテキスト */
  imageAlt?: string;
  choices: Choice[];
};

export type LifeStage = {
  id: string;
  label: string;
  ageRange: string;
  /** ステージのメイン画像パス（/public/images/stages/ 配下） */
  image?: string;
  /** ステージ画像のaltテキスト */
  imageAlt?: string;
  events: LifeEvent[];
};

export type ChoiceHistory = {
  eventId: string;
  eventTitle: string;
  choiceId: string;
  stageLabel: string;
  choiceLabel: string;
  choiceDescription: string;
  effectsApplied: Partial<GameStats>;
  stateEffectsApplied?: Partial<PlayerFlags>;
  meaning?: string;
};

export type LifeReflection = {
  stageLabel: string;
  text: string;
  intensity: number;
};

export type DayScene = {
  type: 'lowRisk' | 'mediumRisk' | 'highRisk' | 'matureFreedom';
  title: string;
  paragraphs: string[];
  note: string;
};

export type GameResult = {
  stats: GameStats;
  lonelinessRisk: number;
  riskBand: 'low' | 'semiLow' | 'medium' | 'high' | 'critical';
  riskBandLabel: string;
  endingName: string;
  routeName: string;
  /** エンディングの識別ID */
  endingId: string;
  /** エンディング画像パス */
  endingImage?: string;
  /** エンディング画像のaltテキスト */
  endingImageAlt?: string;
  scenario: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};
