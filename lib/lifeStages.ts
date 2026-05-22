import { LifeStage } from '@/types/game';

export const lifeStages: LifeStage[] = [
  {
    id: 'stage_1',
    label: '10代後半',
    ageRange: '18〜19歳',
    image: '/images/stages/late-teens.png',
    imageAlt: '駅のホームで街を見つめる18歳。新しい人生の一歩を踏み出す瞬間。',
    events: [
      {
        id: 'event_1',
        stageId: 'stage_1',
        title: '人生の最初の岐路：進路と人間関係',
        description: '高校を卒業し、成人としての第一歩を踏み出す時期です。地元に残るか、都会に出て新しい挑戦をするか。同時にこれまでの人間関係とどう向き合うかを迫られています。',
        choices: [
          {
            id: 'choice_1_A',
            label: '進学・キャリアに全力投球',
            description: '地元の人間関係は一旦脇に置き、都会の難関校への進学ややりがいのある仕事に没頭する。',
            feedback: 'あなたはキャリアと未来の可能性を優先しました。新たな知識とキャリアの土台を築き始めましたが、地元の旧友や家族との連絡は少し疎遠になりました。',
            effects: { career: 10, money: 5, freedom: 3, relationshipCapital: -3, familyCapital: -3 }
          },
          {
            id: 'choice_1_B',
            label: '友人や恋人との時間を最優先',
            description: '勉強や仕事はほどほどにし、今しかできない友人たちとの遊びや恋人との時間を全力で楽しむ。',
            feedback: 'あなたは今の人間関係に熱中することを選びました。かけがえのない思い出と親しい友人関係を築けましたが、キャリアの準備や将来の蓄えは後回しになっています。',
            effects: { relationshipCapital: 10, emergencySupport: 4, freedom: -2, money: -2, career: -3 }
          },
          {
            id: 'choice_1_C',
            label: '地元と家族との深いつながりを残す',
            description: '地元の企業や近くの大学を選び、家族を助けながら地域のなじみ深い関係性を大切にして暮らす。',
            feedback: 'あなたは地元と家族の強い絆を最優先しました。家族資本と地域での安心感を得ましたが、自分の個人的な自由やキャリアの選択肢は少し制限されました。',
            effects: { familyCapital: 10, relationshipCapital: 5, meaningCapital: 3, freedom: -4, career: -2 }
          },
          {
            id: 'choice_1_D',
            label: '誰にも縛られない一人の自由を追求',
            description: '特定の人間関係や進路に縛られず、一人での一人旅や趣味、フリーター生活で気ままに過ごす。',
            feedback: 'あなたは絶対的な自由を選びました。誰にも邪魔されない時間と自己との対話を通じて精神的な自由を得ましたが、周囲との関係性や将来の保障は薄れています。',
            effects: { freedom: 10, health: 3, relationshipCapital: -4, familyCapital: -3, emergencySupport: -4 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_2',
    label: '20代前半',
    ageRange: '20〜24歳',
    image: '/images/stages/early-20s.png',
    imageAlt: '都会の雑踏の中、スマホを見ながら歩く20代前半の若者。',
    events: [
      {
        id: 'event_2',
        stageId: 'stage_2',
        title: '新環境での人間関係と社会への適応',
        description: '社会に出る、または専門性を高める中で、人間関係や価値観が大きく広がる時期です。限られた時間の中で、あなたは何に時間とエネルギーを投資しますか？',
        choices: [
          {
            id: 'choice_2_A',
            label: '仕事のスキル習得と資格取得に没頭',
            description: '平日は夜遅くまで働き、週末も仕事のためのインプットや勉強会に費やす。',
            feedback: 'あなたはビジネスマンとしての強固な基盤を作り始めました。上司からの評価やスキルが向上した一方で、仕事以外の時間はほとんどなくなっています。',
            effects: { career: 12, money: 6, freedom: -4, relationshipCapital: -3, health: -2 }
          },
          {
            id: 'choice_2_B',
            label: '仕事以外の交友関係・サークルを広げる',
            description: '社外のコミュニティや趣味の集まりに積極的に参加し、多様なバックグラウンドを持つ友人を増やす。',
            feedback: 'あなたは社会に出てからも多様なコミュニティとつながりを作りました。視野が広がり関係資本が増えましたが、お金の出費が重なっています。',
            effects: { relationshipCapital: 10, outsideWorkBelonging: 8, freedom: 3, money: -5, career: -2 }
          },
          {
            id: 'choice_2_C',
            label: '一途なパートナーシップの構築',
            description: '将来を共に歩めるような真剣な交際相手との時間や、親しい家族とのだんらんを大切にする。',
            feedback: 'あなたは特定の親密な関係を育む決意をしました。深い信頼関係と情緒的な安定（家族資本）を得ましたが、外に広がる交友関係や個人の自由は落ち着いたものになりました。',
            effects: { familyCapital: 10, emergencySupport: 6, meaningCapital: 5, freedom: -4, money: -3 }
          },
          {
            id: 'choice_2_D',
            label: '自己探求と一人の趣味に没頭',
            description: '自分の興味のあるコアな趣味や、オンラインで完結する創作活動に一人の時間を捧げる。',
            feedback: 'あなたは自分だけの深い精神世界を守ることに集中しました。自由度は最大化され、高い個人の満足感を得ましたが、現実のリアルな人間関係は希薄化しつつあります。',
            effects: { freedom: 10, meaningCapital: 6, relationshipCapital: -4, familyCapital: -3, emergencySupport: -3 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_3',
    label: '20代中盤',
    ageRange: '25〜27歳',
    image: '/images/stages/mid-20s.png',
    imageAlt: '居酒屋で友人たちと笑いながら食事を楽しむ20代中盤。',
    events: [
      {
        id: 'event_3',
        stageId: 'stage_3',
        title: '可処分所得の増加と価値観の多様化',
        description: '少しずつ仕事に慣れ、自分で自由に使えるお金と時間が増えてきました。この資源をどこに振り分けるかで、30代以降の生き方が大きく変わり始めます。',
        choices: [
          {
            id: 'choice_3_A',
            label: 'キャリアのステップアップと資産形成',
            description: '転職活動や自己投資にお金を使い、早期リタイア（FIRE）やキャリアアップを目指して貯蓄を始める。',
            feedback: 'あなたは将来の経済的安定と社会的地位に焦点を当てました。マネーリテラシーが高まり資産とキャリアが積み上がりましたが、今楽しむ余白は減少しました。',
            effects: { money: 12, career: 8, freedom: -3, relationshipCapital: -3, meaningCapital: -2 }
          },
          {
            id: 'choice_3_B',
            label: '今しかできない旅行や高級な趣味の体験',
            description: '海外旅行、フェス、トレンドの食事など、若いうちにしかできない体験に給与の多くを費やす。',
            feedback: 'あなたは豊かな今という瞬間の体験を重視しました。視野が広がり自由な精神を得ましたが、将来に向けた貯金や家族形成の準備はゼロに近いです。',
            effects: { freedom: 10, meaningCapital: 7, money: -8, familyCapital: -3, emergencySupport: -2 }
          },
          {
            id: 'choice_3_C',
            label: '将来の家族形成に向けた同棲や準備',
            description: 'パートナーとの生活を本格化させたり、将来の家庭を持つための節約や生活基盤の整理を始める。',
            feedback: 'あなたは具体的な人生のパートナーシップに向けた土台作りに入りました。家族資本が強化され、共同生活による連帯感が芽生えましたが、一人の自由度は低下しました。',
            effects: { familyCapital: 10, emergencySupport: 7, meaningCapital: 5, freedom: -6, money: -3 }
          },
          {
            id: 'choice_3_D',
            label: '同じ志を持つコミュニティの運営や手伝い',
            description: '地域のNPOやインディーズサークル、趣味のコミュニティの運営側に入り、広く人と関わる。',
            feedback: 'あなたは社会や趣味を通じた他者との共同作業に身を投じました。社外での強固な所属と関係資本を得ましたが、労働時間外の余力はほとんど削られています。',
            effects: { outsideWorkBelonging: 10, relationshipCapital: 8, meaningCapital: 5, freedom: -4, money: -2 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_4',
    label: '20代後半',
    ageRange: '28〜29歳',
    image: '/images/stages/late-20s.png',
    imageAlt: '結婚式場で未来を考える20代後半。人生の分岐点。',
    events: [
      {
        id: 'event_4',
        stageId: 'stage_4',
        title: '人生の分岐点と周囲の結婚ラッシュ',
        description: '20代の終わりが見え、周囲で結婚・転職・独立などの人生の大きな決断をする人が急増します。焦りや社会的プレッシャーが強まる中で、あなたはどの道を選択しますか？',
        choices: [
          {
            id: 'choice_4_A',
            label: '結婚し、新たな家族としての歩みを始める',
            description: 'パートナーと婚姻関係を結び、二人の世帯としての生活設計と経済的統合を行う。',
            feedback: 'あなたは家庭を持つ道を選びました。強力な家族資本と将来の心理的安心感を得ましたが、自由な転職や自分のためだけに全額のお金を使う暮らしからは離れました。',
            effects: { familyCapital: 12, emergencySupport: 8, meaningCapital: 5, freedom: -7, money: -4, career: -2 }
          },
          {
            id: 'choice_4_B',
            label: '仕事で勝負をかける（転職・独立）',
            description: '人生で一番動けるこの時期に、スタートアップへの参画や独立・起業、あるいは海外赴任に挑戦する。',
            feedback: 'あなたはキャリアの最大化を選択しました。自身の市場価値とキャリア、将来のお金のチャンスは広がりましたが、プライベートの人間関係は極めて希薄化しています。',
            effects: { career: 15, money: 8, freedom: 3, relationshipCapital: -5, familyCapital: -5, health: -4 }
          },
          {
            id: 'choice_4_C',
            label: '焦らず一人の自由な独身生活を継続する',
            description: '周囲の動向に惑わされず、今の自分のライフスタイル、自由な時間、自分のペースを崩さない暮らしを維持する。',
            feedback: 'あなたは自己のペースを守り、自由な生活を延長しました。プレッシャーから解放され高い自由を得ましたが、次のライフステージへ進む周囲と少しずつ話題が合わなくなってきました。',
            effects: { freedom: 10, health: 3, familyCapital: -4, relationshipCapital: -2, emergencySupport: -2 }
          },
          {
            id: 'choice_4_D',
            label: '仕事以外の「第三の居場所」を開拓する',
            description: 'シェアハウスに入居したり、定期的に顔を合わせるバーや趣味のコミュニティに通い詰めて新たな友人関係を作る。',
            feedback: 'あなたは仕事と家庭以外のセーフティネット（サードプレイス）を作りました。仕事以外の所属感と友人の輪が広がりましたが、特定の誰かと将来を共にする意思決定は保留されています。',
            effects: { outsideWorkBelonging: 10, relationshipCapital: 7, emergencySupport: 4, freedom: 3, money: -3 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_5',
    label: '30代前半',
    ageRange: '30〜34歳',
    image: '/images/stages/early-30s.png',
    imageAlt: '小さなアパートで赤ちゃんを抱く30代前半の親。',
    events: [
      {
        id: 'event_5',
        stageId: 'stage_5',
        title: '30代の現実と子育て・次世代への視点',
        description: '仕事の責任がさらに重くなり、中長期的なライフプランがより現実味を帯びてきます。特に「子ども（次世代）との関わり」について真剣に検討する時期が訪れます。',
        choices: [
          {
            id: 'choice_5_A',
            label: '妊活・育児へのコミットや次世代支援',
            description: '子どもを授かるための活動や、または養育・親族の子どもへの支援に時間と経済資源を大きく割く。',
            feedback: 'あなたは次世代を育む道へ踏み出しました。あなたの人生に強固な次世代接点と深い生きる意味が生まれましたが、日々の生活は子ども中心となり、自由や個人的なお金、キャリアの進捗は大幅に制限されます。',
            effects: { nextGeneration: 15, familyCapital: 10, meaningCapital: 8, freedom: -10, money: -6, career: -3 }
          },
          {
            id: 'choice_5_B',
            label: '仕事の昇進・管理職としての安定を優先',
            description: 'プレイヤーからマネージャーへの昇進を受け入れ、会社内での自分の地位を確立し、生涯年収の最大化を図る。',
            feedback: 'あなたは社会的な地位と経済の安定を選択しました。役職と安定した給与を獲得しましたが、プライベートの人間関係の幅は狭まり、家族と過ごす時間は減少しました。',
            effects: { career: 12, money: 10, health: -3, familyCapital: -4, relationshipCapital: -3 }
          },
          {
            id: 'choice_5_C',
            label: '社会貢献活動や地域のつながり作り',
            description: '地域ボランティアや、社会課題を解決するための市民グループなどに積極的に参加し、関係性を作る。',
            feedback: 'あなたは自分の生きがいを社会とのつながりに見出しました。地域や活動を通じた多くの仲間（関係資本・仕事以外の所属）ができ、深い意味資本を得ましたが、仕事での出世競争からは少し距離を置いています。',
            effects: { outsideWorkBelonging: 12, relationshipCapital: 8, meaningCapital: 6, career: -2, money: -3 }
          },
          {
            id: 'choice_5_D',
            label: '自分の健康と趣味に全資源を投資',
            description: 'ジム通いや良質な食事、一人の時間を守り、何にも邪魔されない極上のソロライフを追求する。',
            feedback: 'あなたは自分自身のウェルビーイングを最優先しました。健康ステータスと自由は極めて高く保たれていますが、他者と運命を共にする関係性（家族や共同体）の構築はさらに遠のきました。',
            effects: { health: 12, freedom: 10, familyCapital: -5, nextGeneration: -5, relationshipCapital: -3 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_6',
    label: '30代後半',
    ageRange: '35〜39歳',
    image: '/images/stages/late-30s.png',
    imageAlt: '仕事帰りにバーで一人スマホを見る30代後半。孤立の兆候。',
    events: [
      {
        id: 'event_6',
        stageId: 'stage_6',
        title: '疎遠になる友人関係と孤立の兆候',
        description: '多くの友人が家庭や仕事で多忙を極め、昔の仲間との「何となくの集まり」が激減します。放っておくとプライベートのチャット通知が何日も鳴らない日が増えてきます。',
        choices: [
          {
            id: 'choice_6_A',
            label: '家族イベントや子ども主体の関係を重視',
            description: '子どもの学校や地域の親同士のネットワーク、家族旅行などを生活の中心に据える。',
            feedback: 'あなたは家族と次世代を中心とした強固な共同体を形成しました。家族資本と次世代接点は強まり、孤独感とは無縁ですが、かつての「個人的な友人」との関わりはほぼ無くなりました。',
            effects: { familyCapital: 10, nextGeneration: 10, emergencySupport: 6, freedom: -6, relationshipCapital: -2 }
          },
          {
            id: 'choice_6_B',
            label: '意識的に「趣味を通じた新しい友人」を再開拓',
            description: '大人の趣味サークル、ゲームコミュニティ、習い事などに通い、今のライフスタイルに合う社外の友人関係を再構築する。',
            feedback: 'あなたはライフステージが変わっても続く新たな「共通の関心を持つ友人」を開発しました。仕事以外の所属と関係資本がリフレッシュされましたが、それなりの出費と時間が必要です。',
            effects: { relationshipCapital: 10, outsideWorkBelonging: 10, freedom: 3, money: -4, familyCapital: -2 }
          },
          {
            id: 'choice_6_C',
            label: '仕事のプロジェクトに没頭し、孤独感を紛らわせる',
            description: 'プライベートの静けさから目を背けるように、仕事の予定でカレンダーを埋め尽くし、深夜まで業務に邁進する。',
            feedback: 'あなたは社会的成果とキャリアの絶頂期を迎えました。お金と市場価値は積み上がりましたが、深夜に一人で帰宅する際の精神的な疲弊や健康状態の悪化が見え隠れしています。',
            effects: { career: 14, money: 8, health: -5, relationshipCapital: -5, emergencySupport: -3, meaningCapital: -2 }
          },
          {
            id: 'choice_6_D',
            label: '一人の孤独を「ソロの気楽さ」として前向きに享受',
            description: 'ソロキャンプや読書、個人の創作に打ち込み、「他者に期待しない」自立した生活スタイルを確立する。',
            feedback: 'あなたは一人の時間を愛し、高度な自己完結力を身につけました。誰にも気を使わない自由は最高潮に達しましたが、有事の際にあなたの安否を確認する人はほとんどいなくなっています。',
            effects: { freedom: 10, meaningCapital: 5, relationshipCapital: -5, familyCapital: -5, emergencySupport: -5 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_7',
    label: '40代',
    ageRange: '40〜49歳',
    image: '/images/stages/40s.png',
    imageAlt: '親の介護に向き合う40代。人生の重圧が押し寄せる時期。',
    events: [
      {
        id: 'event_7',
        stageId: 'stage_7',
        title: 'ミッドライフ・クライシスと重なる重圧',
        description: '自分の体力の衰えを自覚し始め、親の介護問題、仕事の責任のピーク、あるいは家庭環境の変化など、人生の重圧が一度に押し寄せる40代です。',
        choices: [
          {
            id: 'choice_7_A',
            label: '親のサポートや親族関係の再構築',
            description: '実家の親の介護準備や親族間の関係調整に時間とエネルギーを割き、実家とのつながりを深める。',
            feedback: 'あなたは血縁関係の責任を果たし、親族間のネットワークを強化しました。家族資本と緊急時の協力体制は強まりましたが、仕事のキャリアアップスピードは鈍化し、自分の自由な時間は削られました。',
            effects: { familyCapital: 10, emergencySupport: 10, meaningCapital: 5, freedom: -6, career: -3 }
          },
          {
            id: 'choice_7_B',
            label: '徹底的な健康習慣の見直しと維持',
            description: '人間ドックを毎年受け、食事・睡眠・ランニングなどの健康管理に時間とお金を最優先で投資する。',
            feedback: 'あなたは人生の後半を戦い抜くための「身体の資本」を確保しました。健康ステータスは大幅に改善しましたが、ストイックな生活によって友人との飲み会などの気軽な付き合いは減少しました。',
            effects: { health: 15, freedom: -2, money: -3, relationshipCapital: -3 }
          },
          {
            id: 'choice_7_C',
            label: 'キャリアの最終成果と市場価値の極大化',
            description: '役員昇進や起業による経済的な大成功を目指し、睡眠時間を削ってでもビジネスでの成果を追求する。',
            feedback: 'あなたはお金と地位を強力に引き上げました。老後資金への不安は大幅に和らぎましたが、家庭内の冷え込みや慢性的な疲労、家族と話す時間の喪失という代償を払っています。',
            effects: { career: 15, money: 12, health: -6, familyCapital: -6, relationshipCapital: -4 }
          },
          {
            id: 'choice_7_D',
            label: 'サードプレイス（居場所）でのアイデンティティ確立',
            description: '地域のサークル活動や趣味のオンラインコミュニティのリーダーとなり、仕事以外の自分の役割を育てる。',
            feedback: 'あなたは肩書のない「素の自分」としての居場所と役割を見出しました。仕事以外の所属感と関係資本は非常に豊かになり、精神的な幸福度（意味資本）が高まりました。',
            effects: { outsideWorkBelonging: 12, relationshipCapital: 8, meaningCapital: 6, money: -3, career: -2 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_8',
    label: '50代前半',
    ageRange: '50〜54歳',
    image: '/images/stages/early-50s.png',
    imageAlt: '若い世代に知識を伝える50代前半。次世代への継承。',
    events: [
      {
        id: 'event_8',
        stageId: 'stage_8',
        title: '人生後半の現実味と次世代への継承',
        description: '会社の定年や老後の生活が視界に入り始め、仕事のスキルだけでなく「自分は何を遺せるか」を考え始めます。',
        choices: [
          {
            id: 'choice_8_A',
            label: '職場の後輩や若い世代の教育・育成に回る',
            description: '第一線で自ら成果を出すことから身を引き、若手へのノウハウ伝承やメンター活動に時間を使う。',
            feedback: 'あなたは若い世代へと知恵を繋ぐことを選びました。若い世代との強固な信頼関係（次世代接点）と、社会に必要とされている実感（意味資本）を深く得ました。',
            effects: { nextGeneration: 12, meaningCapital: 10, relationshipCapital: 4, freedom: -2, money: -2 }
          },
          {
            id: 'choice_8_B',
            label: 'プライベートの友人と定期的に集まる仕組み作り',
            description: '昔の同級生や趣味の仲間と、年数回の定例旅行や食事会を自ら企画して「つながりを固定化」する。',
            feedback: 'あなたは自ら能動的に働きかけることで、疎遠になりがちな年齢でも維持できる人間関係のネットワークを強固にしました。定期的な笑いと安心感（関係資本）を得ています。',
            effects: { relationshipCapital: 12, emergencySupport: 6, money: -4, career: -2 }
          },
          {
            id: 'choice_8_C',
            label: '老後資金の貯蓄・投資を最大化する',
            description: '支出を極限まで見直し、投資信託や資産運用を徹底して老後のためのキャッシュを蓄える。',
            feedback: 'あなたは老後資金という最強の盾を作りました。経済的な不安はほぼ解消されましたが、付き合いの悪さから知人からの誘いはさらに減ってしまいました。',
            effects: { money: 15, career: 4, relationshipCapital: -4, meaningCapital: -2, freedom: -2 }
          },
          {
            id: 'choice_8_D',
            label: '定年なき個人の「複業・スキル開発」に注力',
            description: '定年後も一人で稼げるように、新たな技術の習得や個人のブランド構築に時間を費やす。',
            feedback: 'あなたは仕事中心の生き方を磨き続けました。定年後のキャリアの継続性は高まりましたが、プライベートの人間関係や家族との団らんは極めてドライな状態です。',
            effects: { career: 10, money: 6, freedom: -3, familyCapital: -4, relationshipCapital: -3 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_9',
    label: '50代後半',
    ageRange: '55〜59歳',
    image: '/images/stages/late-50s.png',
    imageAlt: '秋の住宅街を歩く50代後半の夫婦。家族構造の変化。',
    events: [
      {
        id: 'event_9',
        stageId: 'stage_9',
        title: '家族構造の変化とライフスタイルの再定義',
        description: '子どもの独立、親の看取り、あるいはパートナーとの関係性の変化など、家庭内の「これまでの当たり前」が変化し、新たな関係構築を求められます。',
        choices: [
          {
            id: 'choice_9_A',
            label: '家族・親族のサポートや密な連絡の継続',
            description: '独立した子ども世帯への物心両面のサポートや、実家の親戚関係の行事に顔を出し、血縁の輪を維持する。',
            feedback: 'あなたは血のつながりを最優先にケアし続けました。子どもや孫との次世代接点、親族との緊急時サポートは最高レベルに保たれていますが、自身の個人的な活動は制限されます。',
            effects: { familyCapital: 10, nextGeneration: 10, emergencySupport: 8, freedom: -5, money: -5 }
          },
          {
            id: 'choice_9_B',
            label: 'パートナー（夫婦）との関係の再構築',
            description: '共通の趣味を始めたり、感謝の言葉を日常的に伝えるなど、子ども抜きでも豊かに過ごせる夫婦関係を育む。',
            feedback: 'あなたは一番身近な他人であるパートナーとの絆を修復・強化しました。最重要の家族資本と精神的安定を得ましたが、一人の時間や独自の友人作りは控えめになりました。',
            effects: { familyCapital: 12, emergencySupport: 10, meaningCapital: 5, freedom: -4, relationshipCapital: -2 }
          },
          {
            id: 'choice_9_C',
            label: '一人の生活を自立して楽しむ基盤の完成',
            description: 'パートナーがいてもいなくても、一人で静かに暮らすための読書、園芸、料理などの日常習慣を究める。',
            feedback: 'あなたは高度な「個の確立」を実現しました。他人に依存しない精神的な強さと自由を得ましたが、他者が日常的にあなたを心配する動機は薄れています。',
            effects: { freedom: 10, health: 4, relationshipCapital: -4, familyCapital: -4, emergencySupport: -4 }
          },
          {
            id: 'choice_9_D',
            label: '地域活動や市民団体への本格的な参入',
            description: '地元の自治会やボランティア、または市民講座に参加し、定年後を見据えた「地域の隣人」を作る。',
            feedback: 'あなたは会社を離れた後の現実世界のセーフティネットを作り上げました。日常で言葉を交わす地域内の関係資本や仕事以外の所属を確保しましたが、付き合いのための時間と労力が必要です。',
            effects: { outsideWorkBelonging: 12, relationshipCapital: 8, meaningCapital: 5, money: -3, freedom: -3 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_10',
    label: '60代前半',
    ageRange: '60〜64歳',
    image: '/images/stages/early-60s.png',
    imageAlt: '定年退職を迎えた60代前半。突然の自由な時間の到来。',
    events: [
      {
        id: 'event_10',
        stageId: 'stage_10',
        title: '定年退職と突然の「時間的自由」',
        description: '多くの人が組織の退職を迎え、カレンダーから日々の予定が消失します。毎朝決まった時間に行く場所がなくなり、膨大な自由時間が目の前に現れました。',
        choices: [
          {
            id: 'choice_10_A',
            label: '再雇用や関連会社で仕事を第一に継続する',
            description: 'これまで培ったスキルを使い、週5日フルタイムで働き続けることで、社会との接点をキープする。',
            feedback: 'あなたは「仕事人」としてのアイデンティティと一定の収入を維持しました。しかし、会社内での立場は変わり、かつてのプライドとの葛藤がありつつも、仕事以外の人間関係を作る機会は先送りされました。',
            effects: { career: 8, money: 8, freedom: -6, relationshipCapital: -3, health: -2 }
          },
          {
            id: 'choice_10_B',
            label: '趣味の教室やサークルに週3で通い詰める',
            description: 'ゴルフ、陶芸、囲碁・将棋、歴史散歩など、仕事と関係のない趣味のコミュニティに通い、仲間を作る。',
            feedback: 'あなたは新たなライフスタイルを積極的に構築しました。仕事と関係のない共通の話題で笑い合える仲間（仕事以外の所属）を多数得て、毎日にハリが出ましたが、それなりの経済的出費があります。',
            effects: { outsideWorkBelonging: 12, relationshipCapital: 8, meaningCapital: 6, money: -5, freedom: 2 }
          },
          {
            id: 'choice_10_C',
            label: '子ども家族や孫、若い世代のサポートに時間を使う',
            description: '孫の保育園の送り迎えを手伝ったり、地域の青少年育成活動にボランティアとして参加する。',
            feedback: 'あなたは自身の時間を次世代の成長のために捧げました。圧倒的な感謝と愛され、強い次世代接点と家族資本、深い意味資本を得ましたが、同世代の個人的な友人と遊ぶ時間は減少しています。',
            effects: { nextGeneration: 12, familyCapital: 8, meaningCapital: 8, emergencySupport: 6, freedom: -4 }
          },
          {
            id: 'choice_10_D',
            label: '何も決めず、自宅で本を読んだりテレビを見てゆっくり過ごす',
            description: 'これまでの激務の疲れを癒やすため、スケジュールを白紙にし、一日中誰とも話さず静かに過ごす。',
            feedback: 'あなたは究極の休息と自由を得ました。何のプレッシャーもありませんが、声を出す機会が急激に減り、精神的な活力が少しずつ削がれていくのを感じています。',
            effects: { freedom: 10, health: -2, relationshipCapital: -5, outsideWorkBelonging: -5, emergencySupport: -4 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_11',
    label: '60代後半',
    ageRange: '65〜69歳',
    image: '/images/stages/late-60s.png',
    imageAlt: '平日の静けさの中で日常の対話相手を求める60代後半。',
    events: [
      {
        id: 'event_11',
        stageId: 'stage_11',
        title: '平日の静けさと「日常の対話相手」',
        description: '年齢を重ね、日常会話の有無が心身の健康に直接影響を及ぼし始めます。平日に「今日、誰とも喋らなかった」という日を防ぐための日常の習慣が必要になります。',
        choices: [
          {
            id: 'choice_11_A',
            label: '行きつけのカフェや地域コミュニティに毎日顔を出す',
            description: '朝の散歩がてら地元の個人商店や喫茶店、またはコワーキングやサロンに通い、顔なじみの店員や隣人と挨拶を交わす。',
            feedback: 'あなたは日常のささやかな挨拶を交わす関係（弱い紐帯）のセーフティネットを作りました。日常的な対話が確保され、地域社会に包摂されている安心感を得ています。',
            effects: { relationshipCapital: 10, outsideWorkBelonging: 8, health: 4, money: -3 }
          },
          {
            id: 'choice_11_B',
            label: '友人と定期的に電話や対面で話す日を「システム化」する',
            description: '週に1回は昔の同僚や学生時代の友人に必ず連絡する、あるいは月1回の飲み会を主催し続ける。',
            feedback: 'あなたは自ら能動的につながりをメンテナンスし続けました。信頼できる友人関係と緊急時サポートが最高水準で維持され、孤独の危機を回避しています。',
            effects: { relationshipCapital: 12, emergencySupport: 8, meaningCapital: 5, money: -4, freedom: -2 }
          },
          {
            id: 'choice_11_C',
            label: '子どもや親族とチャットや通話で頻繁に連絡を取る',
            description: 'スマートフォンのアプリを使い、離れて暮らす子どもや親族と日常の様子を写真付きで毎日のように共有し合う。',
            feedback: 'あなたは離れていても繋がれる現代の家族の絆を守りました。家族資本と次世代との強固な信頼関係により、精神的な支えは盤石ですが、足元のリアルな地域生活は少し孤立しています。',
            effects: { familyCapital: 10, nextGeneration: 10, emergencySupport: 8, outsideWorkBelonging: -3 }
          },
          {
            id: 'choice_11_D',
            label: 'ネット動画やSNSでの情報収集を中心に静かに過ごす',
            description: '外出が面倒になり、家の中でインターネットやテレビ、ゲームを通じて社会の動きを眺めて過ごす。',
            feedback: 'あなたは一人の娯楽を極めました。しかし、他者とのリアルなキャッチボールは存在せず、認知機能の低下や、何かあったときの発見遅れなどの潜在的なリスクが静かに進行しています。',
            effects: { freedom: 8, health: -4, relationshipCapital: -6, outsideWorkBelonging: -5, emergencySupport: -5 }
          }
        ]
      }
    ]
  },
  {
    id: 'stage_12',
    label: '70代前半から75歳',
    ageRange: '70〜75歳',
    image: '/images/stages/75.png',
    imageAlt: '75歳を迎え、本当に頼れる人が誰かを問われる最終局面。',
    events: [
      {
        id: 'event_12',
        stageId: 'stage_12',
        title: '老後の仕上げと「緊急時の信頼」',
        description: 'いよいよ75歳を迎えました。身体の自由が利かなくなる場面や、突然の体調不良、役所の手続きなどの緊急時に「本当に頼れる人は誰か」が問われる現実的な岐路です。',
        choices: [
          {
            id: 'choice_12_A',
            label: '家族や子どもに心を開き、身の振りを相談する',
            description: 'プライドを捨てて、同居の検討や近くへの引っ越し、今後の支援について子どもや近い家族に深く相談する。',
            feedback: 'あなたは最も確かなセーフティネットである家族と対話し、支えを受け入れる体制を整えました。高い緊急時サポートと家族資本が確保され、老後の安心感を得ました。',
            effects: { familyCapital: 10, emergencySupport: 12, nextGeneration: 6, freedom: -6 }
          },
          {
            id: 'choice_12_B',
            label: '友人や信頼できる地域の人々と助け合う約束をする',
            description: '互いの体調を確認し合うペアを作ったり、地域の福祉ネットワーク、または信頼できる隣人と合鍵を預け合うなどの関係を築く。',
            feedback: 'あなたは血の繋がらない人々との相互扶助の仕組みを自分の手で作り上げました。地域で自立しつつも守られる温かな関係資本と高い緊急時サポートを獲得しました。',
            effects: { relationshipCapital: 10, emergencySupport: 10, outsideWorkBelonging: 6, freedom: -2 }
          },
          {
            id: 'choice_12_C',
            label: 'お金で解決できる民間の介護・生活支援サービスを契約する',
            description: '自分のプライドや他人への迷惑を考え、資産を切り崩して、見守りサービスや身元保証サービス等の専門契約を結ぶ。',
            feedback: 'あなたはお金の力で尊厳と安心を買いました。他者へ気兼ねすることなく、ドライで確実な緊急時サポートを確立しましたが、そこに温かな感情の交流や人間味のある関係はありません。',
            effects: { emergencySupport: 10, money: -15, freedom: 3, meaningCapital: -2 }
          },
          {
            id: 'choice_12_D',
            label: '「なるようになる」と、特に準備をせず一人で暮らす',
            description: '誰かに迷惑をかけるのも、高いお金を払うのも嫌なので、今のまま特別な対策はせず、一人で日々を過ごす。',
            feedback: 'あなたは最後まで孤高を貫く道を進んでいます。しかし、もし今夜倒れたら、誰があなたを見つけるでしょうか。緊急時のサポートは皆無に近く、危険な状況に隣り合わせです。',
            effects: { freedom: 6, health: -5, relationshipCapital: -6, familyCapital: -5, emergencySupport: -8 }
          }
        ]
      }
    ]
  }
];
