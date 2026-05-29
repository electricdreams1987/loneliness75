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
  hasCompanionAnimal: boolean;
  scamAware: boolean;
  partnerCareExperience: boolean;
  lostLocalPlace: boolean;
  neighborMovedAway: boolean;
  usesPublicConsultation: boolean;
  partnerRelationshipRepaired: boolean;
  partnerRelationshipDistant: boolean;
};

export type LifeStatus = {
  age: number;
  maritalStatus: 'single' | 'dating' | 'married' | 'divorced' | 'widowed';
  childrenCount: number;
  jobStatus: 'student' | 'employee' | 'manager' | 'executive' | 'owner' | 'freelance' | 'unemployed' | 'retired';
  housingStatus: 'withParents' | 'alone' | 'withPartner' | 'withFamily' | 'shared' | 'careFacility';
  hasEmergencyContact: boolean;
  hasLocalCommunity: boolean;
  healthLabel: '良い' | 'ふつう' | '不安';
};

export type LifeStatusEffects = Partial<Omit<LifeStatus, 'childrenCount'>> & {
  childrenCount?: number;
  childrenCountDelta?: number;
};

export type LifeStatusConditions = {
  maritalStatus?: LifeStatus['maritalStatus'][];
  childrenCount?: number;
  childrenCountMin?: number;
  childrenCountMax?: number;
  jobStatus?: LifeStatus['jobStatus'][];
  housingStatus?: LifeStatus['housingStatus'][];
  hasEmergencyContact?: boolean;
  hasLocalCommunity?: boolean;
  healthLabel?: LifeStatus['healthLabel'][];
};

export type GameState = {
  stats: GameStats;
  flags: PlayerFlags;
  lifeStatus: LifeStatus;
};

export type Choice = {
  id: string;
  label: string;
  description: string;
  feedback: string;
  effects: Partial<GameStats>;
  stateEffects?: Partial<PlayerFlags>;
  lifeStatusEffects?: LifeStatusEffects;
};

export type LifeEvent = {
  id: string;
  stageId: string;
  title: string;
  description: string;
  conditions?: Partial<PlayerFlags>;
  anyConditions?: Partial<PlayerFlags>[];
  lifeStatusConditions?: LifeStatusConditions;
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
  lifeStatusEffectsApplied?: LifeStatusEffects;
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
