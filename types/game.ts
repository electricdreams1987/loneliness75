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

export type Choice = {
  id: string;
  label: string;
  description: string;
  feedback: string;
  effects: Partial<GameStats>;
};

export type LifeEvent = {
  id: string;
  stageId: string;
  title: string;
  description: string;
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
  choiceId: string;
  stageLabel: string;
  choiceLabel: string;
  effectsApplied: Partial<GameStats>;
};

export type GameResult = {
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
