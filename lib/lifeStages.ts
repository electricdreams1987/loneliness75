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
      },
      {
        id: 'event_1_after_school_chat',
        stageId: 'stage_1',
        title: '卒業後のグループチャット',
        description: '卒業式の夜、クラスのグループチャットで春休みに集まろうという話が流れます。引っ越し準備や入学手続きもありますが、返事をしないとそのまま疎遠になりそうです。',
        choices: [
          {
            id: 'choice_1_chat_A',
            label: '予定を合わせて参加する',
            description: '荷造りの合間に日程を調整し、最後の集まりに行く。',
            feedback: 'あなたは古い関係に区切りをつけず、細く続く連絡先を残しました。進路準備の時間は少し減りますが、頼れる友人の芽が残ります。',
            effects: { relationshipCapital: 6, emergencySupport: 3, freedom: -1, career: -1 }
          },
          {
            id: 'choice_1_chat_B',
            label: '近況だけ送って欠席する',
            description: '忙しいと伝えつつ、進学先や近況を短く共有する。',
            feedback: 'あなたは距離を取りながらも連絡の糸を切りませんでした。無理なく次の生活へ向かえますが、関係の深まりは控えめです。',
            effects: { relationshipCapital: 2, career: 2, freedom: 1 }
          },
          {
            id: 'choice_1_chat_C',
            label: '返信せず準備に集中する',
            description: '通知を閉じ、進学や仕事の準備を優先する。',
            feedback: 'あなたは目の前の準備に集中しました。新生活の土台は整いますが、卒業後の友人関係は自然に薄くなり始めます。',
            effects: { career: 4, money: 1, relationshipCapital: -4, emergencySupport: -2 },
            stateEffects: { careerFocused: true }
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
      },
      {
        id: 'event_2_first_payday',
        stageId: 'stage_2',
        title: '初任給の使い道を決める',
        description: '初めてまとまった給料が入り、同期から飲み会に誘われ、家族からは近況を聞く電話が来ました。口座残高を見ながら、何に使うかをその場で決めます。',
        choices: [
          {
            id: 'choice_2_payday_A',
            label: '同期の飲み会に行く',
            description: '少し背伸びして参加し、職場の人となりを知る。',
            feedback: 'あなたは新しい環境の人間関係にお金を使いました。出費はありますが、職場で話しかけやすい相手が増えます。',
            effects: { relationshipCapital: 5, career: 2, money: -3, health: -1 }
          },
          {
            id: 'choice_2_payday_B',
            label: '家族に小さな贈り物を送る',
            description: '菓子折りや日用品を選び、感謝のメッセージを添える。',
            feedback: 'あなたは家族とのつながりに最初の給料を使いました。家族資本は温まり、離れていても頼れる感覚が残ります。',
            effects: { familyCapital: 6, emergencySupport: 3, money: -2, meaningCapital: 2 },
            stateEffects: { familyOriented: true }
          },
          {
            id: 'choice_2_payday_C',
            label: '生活防衛費に回す',
            description: '飲み会は断り、家賃や急な出費に備えて貯金する。',
            feedback: 'あなたは足元の安心を優先しました。お金の不安は少し減りますが、誘いに乗らない人という印象も少し残ります。',
            effects: { money: 6, freedom: 2, relationshipCapital: -2 }
          }
        ]
      },
      {
        id: 'event_2_weekend_invite',
        stageId: 'stage_2',
        title: '週末の趣味サークル募集',
        description: '駅前の掲示板で、初心者歓迎の料理サークルの募集を見つけました。土曜の午前だけですが、知らない人の輪に入るのは少し勇気がいります。',
        choices: [
          {
            id: 'choice_2_circle_A',
            label: '体験参加を申し込む',
            description: '予定を空け、初心者として一度だけ参加してみる。',
            feedback: 'あなたは仕事や学校以外の居場所を試しました。続くかはまだ分かりませんが、生活に新しい顔なじみが生まれます。',
            effects: { outsideWorkBelonging: 6, relationshipCapital: 4, money: -2, freedom: -1 },
            stateEffects: { communityActive: true }
          },
          {
            id: 'choice_2_circle_B',
            label: '友人を誘って行く',
            description: '一人では不安なので、近い友人に声をかける。',
            feedback: 'あなたは既存の友人を橋にして新しい場所へ入りました。安心感はありますが、相手の都合に少し左右されます。',
            effects: { relationshipCapital: 5, outsideWorkBelonging: 3, freedom: -1 }
          },
          {
            id: 'choice_2_circle_C',
            label: '今回は見送る',
            description: '休日は休息にあて、募集の写真だけ保存する。',
            feedback: 'あなたは疲れを取ることを選びました。体力は守れますが、仕事以外の人間関係を広げる機会は先送りになります。',
            effects: { health: 3, freedom: 3, outsideWorkBelonging: -3 }
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
      },
      {
        id: 'event_3_friend_wedding',
        stageId: 'stage_3',
        title: '友人の結婚式に呼ばれる',
        description: '学生時代の友人から結婚式の招待状が届きました。ご祝儀や交通費は痛い出費ですが、久しぶりに仲間が集まる貴重な機会でもあります。',
        choices: [
          {
            id: 'choice_3_wedding_A',
            label: '出席して友人に会う',
            description: '費用をやりくりし、二次会まで顔を出す。',
            feedback: 'あなたは友人の節目に立ち会いました。出費はありますが、久しぶりの会話から関係が温まり直します。',
            effects: { relationshipCapital: 7, emergencySupport: 3, money: -5, meaningCapital: 2 }
          },
          {
            id: 'choice_3_wedding_B',
            label: '式だけ出て早めに帰る',
            description: '祝う気持ちは伝えつつ、翌日の予定を守る。',
            feedback: 'あなたは無理のない範囲で関係を保ちました。深く話す時間は少ないものの、連絡を絶やさずに済みます。',
            effects: { relationshipCapital: 4, money: -3, health: 1 }
          },
          {
            id: 'choice_3_wedding_C',
            label: '祝電だけ送る',
            description: '仕事や費用を理由に欠席し、丁寧なメッセージを送る。',
            feedback: 'あなたは生活負担を抑えながら祝意を伝えました。お金と時間は守れますが、友人の輪に戻る機会は小さくなります。',
            effects: { money: 3, freedom: 3, relationshipCapital: -3 }
          }
        ]
      },
      {
        id: 'event_3_partner_move',
        stageId: 'stage_3',
        title: '恋人から同棲を提案される',
        description: '更新月が近づいた夜、恋人から「次の家、二人で探してみない？」と聞かれます。家賃は抑えられそうですが、生活リズムを合わせる必要があります。',
        conditions: { soloLifestyle: false },
        choices: [
          {
            id: 'choice_3_move_A',
            label: '物件探しを始める',
            description: '通勤時間や家賃を見ながら、二人で内見を予約する。',
            feedback: 'あなたは関係を生活の中に入れました。家族資本は強まりますが、一人だけで決められる時間は減ります。',
            effects: { familyCapital: 7, emergencySupport: 4, money: 2, freedom: -4 },
            stateEffects: { hasPartner: true, familyOriented: true }
          },
          {
            id: 'choice_3_move_B',
            label: '週末同棲から試す',
            description: 'いきなり引っ越さず、週末だけ生活を合わせてみる。',
            feedback: 'あなたは慎重に距離を縮めました。関係は進みますが、大きな決断はまだ保留です。',
            effects: { familyCapital: 4, emergencySupport: 2, freedom: -1 },
            stateEffects: { hasPartner: true }
          },
          {
            id: 'choice_3_move_C',
            label: '今の部屋を続ける',
            description: '一人の生活リズムを守りたいと正直に伝える。',
            feedback: 'あなたは自分の生活ペースを守りました。自由は保てますが、相手との将来話は少し遠のきます。',
            effects: { freedom: 5, familyCapital: -3, emergencySupport: -1 },
            stateEffects: { hasPartner: true, soloLifestyle: true }
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
            effects: { familyCapital: 12, emergencySupport: 8, meaningCapital: 5, freedom: -7, money: -4, career: -2 },
            stateEffects: { hasPartner: true, married: true, familyOriented: true, soloLifestyle: false }
          },
          {
            id: 'choice_4_B',
            label: '仕事で勝負をかける（転職・独立）',
            description: '人生で一番動けるこの時期に、スタートアップへの参画や独立・起業、あるいは海外赴任に挑戦する。',
            feedback: 'あなたはキャリアの最大化を選択しました。自身の市場価値とキャリア、将来のお金のチャンスは広がりましたが、プライベートの人間関係は極めて希薄化しています。',
            effects: { career: 15, money: 8, freedom: 3, relationshipCapital: -5, familyCapital: -5, health: -4 },
            stateEffects: { careerFocused: true }
          },
          {
            id: 'choice_4_C',
            label: '焦らず一人の自由な独身生活を継続する',
            description: '周囲の動向に惑わされず、今の自分のライフスタイル、自由な時間、自分のペースを崩さない暮らしを維持する。',
            feedback: 'あなたは自己のペースを守り、自由な生活を延長しました。プレッシャーから解放され高い自由を得ましたが、次のライフステージへ進む周囲と少しずつ話題が合わなくなってきました。',
            effects: { freedom: 10, health: 3, familyCapital: -4, relationshipCapital: -2, emergencySupport: -2 },
            stateEffects: { hasPartner: false, married: false, soloLifestyle: true }
          },
          {
            id: 'choice_4_D',
            label: '仕事以外の「第三の居場所」を開拓する',
            description: 'シェアハウスに入居したり、定期的に顔を合わせるバーや趣味のコミュニティに通い詰めて新たな友人関係を作る。',
            feedback: 'あなたは仕事と家庭以外のセーフティネット（サードプレイス）を作りました。仕事以外の所属感と友人の輪が広がりましたが、特定の誰かと将来を共にする意思決定は保留されています。',
            effects: { outsideWorkBelonging: 10, relationshipCapital: 7, emergencySupport: 4, freedom: 3, money: -3 },
            stateEffects: { communityActive: true }
          }
        ]
      },
      {
        id: 'event_4_partner_future',
        stageId: 'stage_4',
        title: 'パートナーとの将来について話し合う',
        description: '週末の帰り道、パートナーから「私たちはこれからどうする？」と聞かれました。友人の結婚式が続き、二人の関係を曖昧なままにしづらくなっています。',
        choices: [
          {
            id: 'choice_4_partner_A',
            label: '結婚を前提に話す',
            description: '時期や住まい、お金の分担まで具体的に話し合う。',
            feedback: 'あなたは関係を言葉にし、二人で将来を設計する方向へ踏み出しました。安心感は増しましたが、自由に動ける余白は少し減りました。',
            effects: { familyCapital: 8, emergencySupport: 4, meaningCapital: 3, freedom: -4, money: -2 },
            stateEffects: { hasPartner: true, married: true, familyOriented: true, soloLifestyle: false }
          },
          {
            id: 'choice_4_partner_B',
            label: '今は自由でいたいと伝える',
            description: '結婚の話は先延ばしにし、自分の時間を優先したいと話す。',
            feedback: 'あなたは正直に自由を守りたい気持ちを伝えました。自分のペースは保てますが、相手との将来像には距離が生まれました。',
            effects: { freedom: 7, familyCapital: -4, relationshipCapital: -2, emergencySupport: -2 },
            stateEffects: { hasPartner: false, married: false, soloLifestyle: true }
          },
          {
            id: 'choice_4_partner_C',
            label: '曖昧なまま関係を続ける',
            description: 'はっきり答えず、今まで通り会い続けることにする。',
            feedback: 'あなたは衝突を避け、今の関係を保ちました。短期的には穏やかですが、大事な話を先送りにした不安が残ります。',
            effects: { freedom: 2, familyCapital: 1, emergencySupport: -2, meaningCapital: -1 },
            stateEffects: { hasPartner: true }
          }
        ]
      },
      {
        id: 'event_4_parent_call',
        stageId: 'stage_4',
        title: '母親から帰省の相談が来る',
        description: '金曜の昼休み、母親から「年末は帰ってこられる？」とメッセージが来ました。仕事も友人との予定も詰まっていますが、最近父親の体調の話も少し出ています。',
        choices: [
          {
            id: 'choice_4_parent_A',
            label: '日程を決めて帰省する',
            description: '短くても顔を出し、家の様子を直接見る。',
            feedback: 'あなたは家族の近況を自分の目で確かめました。自由な予定は減りますが、家族との連絡網は強くなります。',
            effects: { familyCapital: 6, emergencySupport: 4, freedom: -3, money: -2 },
            stateEffects: { familyOriented: true }
          },
          {
            id: 'choice_4_parent_B',
            label: 'ビデオ通話で様子を見る',
            description: '帰省は保留し、週末に長めの通話時間を取る。',
            feedback: 'あなたは距離を保ちながら家族の様子を聞きました。直接の支援には届きませんが、連絡の習慣は残ります。',
            effects: { familyCapital: 3, emergencySupport: 2, freedom: -1 }
          },
          {
            id: 'choice_4_parent_C',
            label: '忙しいとだけ返す',
            description: '詳しく聞かず、仕事が落ち着いたら連絡すると送る。',
            feedback: 'あなたは今の予定を優先しました。短期的には楽ですが、家族の小さな変化に気づく機会は減ります。',
            effects: { career: 2, freedom: 2, familyCapital: -4, emergencySupport: -2 },
            stateEffects: { careerFocused: true }
          }
        ]
      },
      {
        id: 'event_4_shared_house',
        stageId: 'stage_4',
        title: '友人からシェアハウスに誘われる',
        description: '昔の友人から、空き部屋が出るシェアハウスに来ないかと誘われました。家賃は下がりそうですが、共同生活の気遣いも増えます。',
        conditions: { married: false },
        choices: [
          {
            id: 'choice_4_house_A',
            label: '内見に行ってみる',
            description: '住人の雰囲気を見て、生活が合うか確かめる。',
            feedback: 'あなたは新しい共同生活の可能性を試しました。自由は少し減りますが、日常的に話す相手が増えます。',
            effects: { relationshipCapital: 6, outsideWorkBelonging: 4, money: 3, freedom: -3 },
            stateEffects: { communityActive: true, soloLifestyle: false }
          },
          {
            id: 'choice_4_house_B',
            label: '今の一人暮らしを続ける',
            description: '静かな部屋と自分のペースを優先する。',
            feedback: 'あなたは一人の暮らしを守りました。気楽さはありますが、日常の雑談や気づかいの接点は増えません。',
            effects: { freedom: 5, health: 2, relationshipCapital: -3, outsideWorkBelonging: -2 },
            stateEffects: { soloLifestyle: true }
          },
          {
            id: 'choice_4_house_C',
            label: '近所の飲み会だけ参加する',
            description: '入居はせず、住人の集まりに一度だけ顔を出す。',
            feedback: 'あなたは住まいを変えずに関係だけ試しました。負担は小さく、ゆるい接点が一つ増えます。',
            effects: { relationshipCapital: 4, outsideWorkBelonging: 3, money: -1 },
            stateEffects: { communityActive: true }
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
            effects: { nextGeneration: 15, familyCapital: 10, meaningCapital: 8, freedom: -10, money: -6, career: -3 },
            stateEffects: { hasChildren: true, familyOriented: true }
          },
          {
            id: 'choice_5_B',
            label: '仕事の昇進・管理職としての安定を優先',
            description: 'プレイヤーからマネージャーへの昇進を受け入れ、会社内での自分の地位を確立し、生涯年収の最大化を図る。',
            feedback: 'あなたは社会的な地位と経済の安定を選択しました。役職と安定した給与を獲得しましたが、プライベートの人間関係の幅は狭まり、家族と過ごす時間は減少しました。',
            effects: { career: 12, money: 10, health: -3, familyCapital: -4, relationshipCapital: -3 },
            stateEffects: { managementTrack: true, careerFocused: true }
          },
          {
            id: 'choice_5_C',
            label: '社会貢献活動や地域のつながり作り',
            description: '地域ボランティアや、社会課題を解決するための市民グループなどに積極的に参加し、関係性を作る。',
            feedback: 'あなたは自分の生きがいを社会とのつながりに見出しました。地域や活動を通じた多くの仲間（関係資本・仕事以外の所属）ができ、深い意味資本を得ましたが、仕事での出世競争からは少し距離を置いています。',
            effects: { outsideWorkBelonging: 12, relationshipCapital: 8, meaningCapital: 6, career: -2, money: -3 },
            stateEffects: { communityActive: true }
          },
          {
            id: 'choice_5_D',
            label: '自分の健康と趣味に全資源を投資',
            description: 'ジム通いや良質な食事、一人の時間を守り、何にも邪魔されない極上のソロライフを追求する。',
            feedback: 'あなたは自分自身のウェルビーイングを最優先しました。健康ステータスと自由は極めて高く保たれていますが、他者と運命を共にする関係性（家族や共同体）の構築はさらに遠のきました。',
            effects: { health: 12, freedom: 10, familyCapital: -5, nextGeneration: -5, relationshipCapital: -3 },
            stateEffects: { soloLifestyle: true }
          }
        ]
      },
      {
        id: 'event_5_team_lead_offer',
        stageId: 'stage_5',
        title: '上司からチームリーダーを打診される',
        description: '月曜の1on1で、上司から「次のプロジェクトでチームリーダーをやらないか」と声をかけられました。残業は増えますが、評価にも直結しそうです。',
        choices: [
          {
            id: 'choice_5_lead_A',
            label: 'やってみる',
            description: '不安はあるが引き受け、メンバー調整にも踏み込む。',
            feedback: 'あなたは責任ある立場に踏み出しました。キャリアの伸びしろは広がりましたが、仕事以外の予定を調整する必要が出てきました。',
            effects: { career: 10, money: 4, health: -3, relationshipCapital: -2, freedom: -3 },
            stateEffects: { managementTrack: true, careerFocused: true }
          },
          {
            id: 'choice_5_lead_B',
            label: '今回は辞退する',
            description: '今の生活リズムを守りたいと伝え、担当者として働く。',
            feedback: 'あなたは生活の安定を優先しました。無理な負荷は避けられますが、昇進の波には少し乗り遅れます。',
            effects: { health: 4, freedom: 5, career: -3, money: -2 },
            stateEffects: { managementTrack: false }
          },
          {
            id: 'choice_5_lead_C',
            label: '条件を確認して考える',
            description: '権限、残業、評価条件を聞き、返答期限をもらう。',
            feedback: 'あなたは勢いだけで決めず、条件を確認しました。交渉の余地を残しながら、仕事への関与は少し強まりました。',
            effects: { career: 5, money: 2, freedom: -1, meaningCapital: 2 },
            stateEffects: { careerFocused: true }
          }
        ]
      },
      {
        id: 'event_5_children_decision',
        stageId: 'stage_5',
        title: '子どもを持つかどうかを話し合う',
        description: '夕食後、配偶者から「子どものこと、そろそろ本気で考えない？」と切り出されました。仕事や住まい、親の支援も含めて現実的に考える時期です。',
        conditions: { married: true },
        choices: [
          {
            id: 'choice_5_children_A',
            label: '子どもの準備を始める',
            description: '家計、住まい、働き方を見直し、具体的に動き出す。',
            feedback: 'あなたは次世代を迎える準備を始めました。家族の結束と意味は強まりますが、自分だけの時間とお金は大きく変わります。',
            effects: { nextGeneration: 12, familyCapital: 8, meaningCapital: 6, freedom: -7, money: -5 },
            stateEffects: { hasChildren: true, familyOriented: true }
          },
          {
            id: 'choice_5_children_B',
            label: 'まず夫婦の生活を整える',
            description: '貯金や仕事の安定を優先し、時期を半年後に見直す。',
            feedback: 'あなたは急がず生活基盤を整えることにしました。夫婦の対話は続きますが、次世代との接点はまだ増えません。',
            effects: { familyCapital: 4, money: 3, emergencySupport: 2, nextGeneration: -2 },
            stateEffects: { hasChildren: false }
          },
          {
            id: 'choice_5_children_C',
            label: '持たない前提で話し合う',
            description: '二人の暮らしを軸に、老後や親族との関係を考える。',
            feedback: 'あなたは子どもを持たない前提を言葉にしました。自由と生活設計は保てますが、次世代との接点は意識的に作る必要があります。',
            effects: { freedom: 6, money: 4, nextGeneration: -6, familyCapital: -2, meaningCapital: -1 },
            stateEffects: { hasChildren: false, soloLifestyle: true }
          }
        ]
      },
      {
        id: 'event_5_nursery_group',
        stageId: 'stage_5',
        title: '保育園の保護者LINEに招待される',
        description: '子どもの保育園で、同じクラスの保護者LINEに招待されました。行事の連絡には便利そうですが、雑談や役割分担が増える気配もあります。',
        conditions: { hasChildren: true },
        choices: [
          {
            id: 'choice_5_nursery_A',
            label: '自己紹介して参加する',
            description: '子どもの名前と一言を送り、行事にも協力する。',
            feedback: 'あなたは親同士の関係に入りました。手間は増えますが、子育ての情報と近所の支えが得られます。',
            effects: { nextGeneration: 6, relationshipCapital: 4, emergencySupport: 3, freedom: -3 },
            stateEffects: { familyOriented: true, communityActive: true }
          },
          {
            id: 'choice_5_nursery_B',
            label: '連絡用として静かに入る',
            description: '通知は確認するが、雑談にはほとんど参加しない。',
            feedback: 'あなたは必要な情報だけ受け取る距離感を選びました。負担は軽い一方、助け合いの輪は広がりにくくなります。',
            effects: { nextGeneration: 3, emergencySupport: 1, freedom: 1, relationshipCapital: -1 }
          },
          {
            id: 'choice_5_nursery_C',
            label: '配偶者に任せる',
            description: '自分は仕事を優先し、園との連絡は相手に頼む。',
            feedback: 'あなたは家庭内で役割を分けました。仕事には集中できますが、子ども周辺の関係からは少し遠ざかります。',
            effects: { career: 4, nextGeneration: -2, familyCapital: -2, relationshipCapital: -2 },
            stateEffects: { careerFocused: true }
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
            effects: { familyCapital: 10, nextGeneration: 10, emergencySupport: 6, freedom: -6, relationshipCapital: -2 },
            stateEffects: { familyOriented: true, hasChildren: true }
          },
          {
            id: 'choice_6_B',
            label: '意識的に「趣味を通じた新しい友人」を再開拓',
            description: '大人の趣味サークル、ゲームコミュニティ、習い事などに通い、今のライフスタイルに合う社外の友人関係を再構築する。',
            feedback: 'あなたはライフステージが変わっても続く新たな「共通の関心を持つ友人」を開発しました。仕事以外の所属と関係資本がリフレッシュされましたが、それなりの出費と時間が必要です。',
            effects: { relationshipCapital: 10, outsideWorkBelonging: 10, freedom: 3, money: -4, familyCapital: -2 },
            stateEffects: { communityActive: true }
          },
          {
            id: 'choice_6_C',
            label: '仕事のプロジェクトに没頭し、孤独感を紛らわせる',
            description: 'プライベートの静けさから目を背けるように、仕事の予定でカレンダーを埋め尽くし、深夜まで業務に邁進する。',
            feedback: 'あなたは社会的成果とキャリアの絶頂期を迎えました。お金と市場価値は積み上がりましたが、深夜に一人で帰宅する際の精神的な疲弊や健康状態の悪化が見え隠れしています。',
            effects: { career: 14, money: 8, health: -5, relationshipCapital: -5, emergencySupport: -3, meaningCapital: -2 },
            stateEffects: { careerFocused: true }
          },
          {
            id: 'choice_6_D',
            label: '一人の孤独を「ソロの気楽さ」として前向きに享受',
            description: 'ソロキャンプや読書、個人の創作に打ち込み、「他者に期待しない」自立した生活スタイルを確立する。',
            feedback: 'あなたは一人の時間を愛し、高度な自己完結力を身につけました。誰にも気を使わない自由は最高潮に達しましたが、有事の際にあなたの安否を確認する人はほとんどいなくなっています。',
            effects: { freedom: 10, meaningCapital: 5, relationshipCapital: -5, familyCapital: -5, emergencySupport: -5 },
            stateEffects: { soloLifestyle: true }
          }
        ]
      },
      {
        id: 'event_6_reunion_invite',
        stageId: 'stage_6',
        title: '高校の同窓会の案内が届く',
        description: '高校時代のグループLINEに、十数年ぶりの同窓会案内が届きました。懐かしい名前が並ぶ一方で、今さら何を話せばいいのか少し迷っています。',
        choices: [
          {
            id: 'choice_6_reunion_A',
            label: '参加する',
            description: '予定を空けて会場へ行き、近況を自分から話す。',
            feedback: 'あなたは昔の関係にもう一度顔を出しました。気まずさは少しありましたが、途切れていた地元のつながりが再び動き始めます。',
            effects: { relationshipCapital: 8, emergencySupport: 4, meaningCapital: 2, freedom: -2, money: -2 },
            stateEffects: { localFriendship: true }
          },
          {
            id: 'choice_6_reunion_B',
            label: '行かない',
            description: '仕事や家庭を理由に返信せず、そのまま通知を閉じる。',
            feedback: 'あなたは面倒な再会を避けました。その夜は気楽に過ごせますが、昔の友人との接点はさらに細くなりました。',
            effects: { freedom: 4, relationshipCapital: -4, emergencySupport: -2 },
            stateEffects: { localFriendship: false }
          },
          {
            id: 'choice_6_reunion_C',
            label: '親しい数人だけに連絡する',
            description: '大人数は避け、仲の良かった友人に個別で近況を聞く。',
            feedback: 'あなたは無理のない形で旧友に声をかけました。派手な再会ではありませんが、続けやすい関係の芽が残ります。',
            effects: { relationshipCapital: 6, emergencySupport: 3, freedom: 1, meaningCapital: 2 },
            stateEffects: { localFriendship: true }
          }
        ]
      },
      {
        id: 'event_6_subordinate_warning',
        stageId: 'stage_6',
        title: '部下の残業時間を指摘される',
        description: '人事から、チームの若手の残業が増えていると連絡が来ました。自分も忙しく、成果も求められていますが、このままだと誰かが潰れそうです。',
        conditions: { managementTrack: true },
        choices: [
          {
            id: 'choice_6_subordinate_A',
            label: '仕事量を組み替える',
            description: '納期を相談し、担当を見直して残業を減らす。',
            feedback: 'あなたは責任者として働き方を整えました。短期の成果は落ちますが、チームからの信頼は増します。',
            effects: { career: 3, relationshipCapital: 4, health: 3, money: -1 },
            stateEffects: { managementTrack: true }
          },
          {
            id: 'choice_6_subordinate_B',
            label: '自分が巻き取る',
            description: '若手を帰らせ、残りの調整を自分で引き受ける。',
            feedback: 'あなたは部下を守りましたが、自分の負荷を増やしました。信頼は得ますが、疲労が積み重なります。',
            effects: { career: 5, relationshipCapital: 3, health: -5, freedom: -3 }
          },
          {
            id: 'choice_6_subordinate_C',
            label: '成果優先で続ける',
            description: '今は踏ん張りどころだと伝え、体制は変えない。',
            feedback: 'あなたは成果を優先しました。数字は出ますが、チーム内の安心感と自分の健康に影が差します。',
            effects: { career: 7, money: 3, relationshipCapital: -4, health: -4 },
            stateEffects: { careerFocused: true }
          }
        ]
      },
      {
        id: 'event_6_solo_holiday',
        stageId: 'stage_6',
        title: '三連休の予定が真っ白になる',
        description: '三連休前の夜、予定表を見ると何も入っていません。気楽さもありますが、誰かに声をかけない限り、ほとんど会話せずに終わりそうです。',
        conditions: { soloLifestyle: true },
        choices: [
          {
            id: 'choice_6_holiday_A',
            label: '趣味イベントを探す',
            description: '当日参加できる映画会や読書会に申し込む。',
            feedback: 'あなたは一人の時間を外の場につなげました。自由は保ちながら、ゆるい会話の機会が増えます。',
            effects: { outsideWorkBelonging: 5, relationshipCapital: 4, money: -2, freedom: -1 },
            stateEffects: { communityActive: true }
          },
          {
            id: 'choice_6_holiday_B',
            label: '友人に短く連絡する',
            description: '久しぶりの相手に、昼だけ会えないか送ってみる。',
            feedback: 'あなたは小さく人に手を伸ばしました。断られる可能性はありますが、関係を温め直すきっかけになります。',
            effects: { relationshipCapital: 5, emergencySupport: 2, freedom: -1 }
          },
          {
            id: 'choice_6_holiday_C',
            label: '家で一人時間を満喫する',
            description: '外出せず、配信や料理で静かに過ごす。',
            feedback: 'あなたは自分だけの休日を楽しみました。回復にはなりますが、会話の少なさは日常化しやすくなります。',
            effects: { freedom: 5, health: 2, relationshipCapital: -3, outsideWorkBelonging: -2 }
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
            effects: { familyCapital: 10, emergencySupport: 10, meaningCapital: 5, freedom: -6, career: -3 },
            stateEffects: { caregiverExperience: true, familyOriented: true }
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
      },
      {
        id: 'event_7_father_stairs',
        stageId: 'stage_7',
        title: '父親から階段がきついと電話が来る',
        description: '日曜の夜、父親から「最近、階段が少しきつい」と電話がありました。本人は大げさにしたくなさそうですが、家の手すりや通院のことが気になります。',
        choices: [
          {
            id: 'choice_7_father_A',
            label: '週末に実家へ行く',
            description: '家の段差を見て、病院や手すりの話をする。',
            feedback: 'あなたは小さな異変を放置せず動きました。自由な時間は減りますが、介護や支援の入口を早めに作れます。',
            effects: { familyCapital: 7, emergencySupport: 5, meaningCapital: 3, freedom: -4, career: -1 },
            stateEffects: { caregiverExperience: true, familyOriented: true }
          },
          {
            id: 'choice_7_father_B',
            label: '地域窓口を調べて送る',
            description: '介護相談や病院の情報を集め、親に共有する。',
            feedback: 'あなたは距離を取りつつ実務的に支えました。直接の安心感は控えめですが、必要な情報の道筋はできます。',
            effects: { familyCapital: 4, emergencySupport: 4, freedom: -1, meaningCapital: 1 },
            stateEffects: { caregiverExperience: true }
          },
          {
            id: 'choice_7_father_C',
            label: '様子を見ることにする',
            description: '本人が大丈夫と言うので、次の電話まで待つ。',
            feedback: 'あなたは大ごとにしない選択をしました。今の生活は守れますが、家族の変化を拾う機会は遅れます。',
            effects: { freedom: 3, familyCapital: -3, emergencySupport: -3 }
          }
        ]
      },
      {
        id: 'event_7_school_meeting',
        stageId: 'stage_7',
        title: '子どもの担任から面談を勧められる',
        description: '学校から、子どもの様子について一度面談したいと連絡がありました。仕事の予定は詰まっていますが、最近家で口数が減っていることも気になっています。',
        conditions: { hasChildren: true },
        choices: [
          {
            id: 'choice_7_school_A',
            label: '仕事を調整して面談へ行く',
            description: '上司に相談し、担任と直接話す時間を作る。',
            feedback: 'あなたは子どもの変化に向き合いました。仕事の調整は必要ですが、家庭内の安心感と次世代との接点が強まります。',
            effects: { nextGeneration: 7, familyCapital: 5, career: -2, freedom: -2 },
            stateEffects: { familyOriented: true }
          },
          {
            id: 'choice_7_school_B',
            label: '配偶者に先に行ってもらう',
            description: '自分は後で共有を受け、必要なら次回参加する。',
            feedback: 'あなたは家庭内で役割を分けました。最低限の対応はできますが、子どもの悩みを直接聞く機会は減ります。',
            effects: { nextGeneration: 2, familyCapital: 1, career: 2 }
          },
          {
            id: 'choice_7_school_C',
            label: '子どもと二人で話す',
            description: '面談前に、夜の散歩へ誘って本人の話を聞く。',
            feedback: 'あなたは先に本人の言葉を聞こうとしました。解決には時間がかかりますが、親子の信頼は少し戻ります。',
            effects: { nextGeneration: 6, familyCapital: 3, meaningCapital: 2, freedom: -1 }
          }
        ]
      },
      {
        id: 'event_7_festival_staff',
        stageId: 'stage_7',
        title: '地域祭りの実行委員を頼まれる',
        description: '顔なじみの店主から、夏祭りの実行委員を一緒にやらないかと頼まれました。準備は面倒ですが、近所の人と深く関わるきっかけになりそうです。',
        conditions: { communityActive: true },
        choices: [
          {
            id: 'choice_7_festival_A',
            label: '会計係を引き受ける',
            description: '月数回の打ち合わせに出て、準備を手伝う。',
            feedback: 'あなたは地域の裏方に入りました。時間は取られますが、名前を覚えてくれる人が増えます。',
            effects: { outsideWorkBelonging: 7, relationshipCapital: 5, meaningCapital: 3, freedom: -3 },
            stateEffects: { communityActive: true }
          },
          {
            id: 'choice_7_festival_B',
            label: '当日の手伝いだけする',
            description: '準備会は避け、当日の受付や片付けを手伝う。',
            feedback: 'あなたは負担を絞って地域に関わりました。深い関係には届きませんが、顔の見える接点は保てます。',
            effects: { outsideWorkBelonging: 4, relationshipCapital: 3, freedom: -1 }
          },
          {
            id: 'choice_7_festival_C',
            label: '忙しいので断る',
            description: '仕事と家庭を理由に、今年は参加しない。',
            feedback: 'あなたは今の負担を増やさない選択をしました。生活は楽ですが、地域の輪の中心からは少し離れます。',
            effects: { freedom: 3, outsideWorkBelonging: -4, relationshipCapital: -2 }
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
      },
      {
        id: 'event_8_manager_review',
        stageId: 'stage_8',
        title: '部下の評価面談が続く週',
        description: '評価面談の時期になり、部下からキャリア相談が相次ぎます。自分の成果資料も作らなければならず、誰に時間を使うかで週末まで埋まりそうです。',
        conditions: { managementTrack: true },
        choices: [
          {
            id: 'choice_8_review_A',
            label: '一人ずつ丁寧に聞く',
            description: '面談時間を延ばし、異動希望や不満も聞き取る。',
            feedback: 'あなたは管理職として人に時間を使いました。自分の作業は圧迫されますが、職場で頼られる関係が残ります。',
            effects: { career: 4, relationshipCapital: 5, meaningCapital: 3, health: -2 }
          },
          {
            id: 'choice_8_review_B',
            label: '資料作成を優先する',
            description: '面談は定型的に済ませ、自分の評価資料に集中する。',
            feedback: 'あなたは自分の評価を守りました。成果は伝わりやすくなりますが、部下との信頼は少し薄くなります。',
            effects: { career: 6, money: 3, relationshipCapital: -3, meaningCapital: -1 },
            stateEffects: { careerFocused: true }
          },
          {
            id: 'choice_8_review_C',
            label: '相談枠を定例化する',
            description: '今週だけで抱えず、月1回の相談時間を作る。',
            feedback: 'あなたは無理なく関係を保つ仕組みにしました。即効性はほどほどですが、長く続く信頼につながります。',
            effects: { career: 3, relationshipCapital: 4, health: 2, freedom: -1 }
          }
        ]
      },
      {
        id: 'event_8_child_exam',
        stageId: 'stage_8',
        title: '子どもの進路費用を相談する',
        description: '子どもが進学や留学の希望を話し始めました。応援したい気持ちはありますが、住宅ローンや老後資金も見えてきて、家計表を前に悩みます。',
        conditions: { hasChildren: true },
        choices: [
          {
            id: 'choice_8_exam_A',
            label: '費用を出す前提で調べる',
            description: '奨学金や教育費を調べ、本人と計画を立てる。',
            feedback: 'あなたは子どもの挑戦を支える側に回りました。お金は減りますが、次世代との信頼が強まります。',
            effects: { nextGeneration: 8, familyCapital: 5, money: -6, meaningCapital: 3 }
          },
          {
            id: 'choice_8_exam_B',
            label: '本人にも負担を話す',
            description: '家計の現実を共有し、アルバイトや奨学金も含めて考える。',
            feedback: 'あなたは現実的な対話を選びました。少し厳しい話になりますが、家族で考える力が増します。',
            effects: { nextGeneration: 5, familyCapital: 3, money: -2, meaningCapital: 2 }
          },
          {
            id: 'choice_8_exam_C',
            label: 'まず老後資金を守る',
            description: '支援額に上限を決め、足りない分は本人に任せる。',
            feedback: 'あなたは将来の生活を守りました。お金の不安は抑えられますが、子どもとの温度差は生まれます。',
            effects: { money: 5, nextGeneration: -3, familyCapital: -2, freedom: 1 }
          }
        ]
      },
      {
        id: 'event_8_community_key',
        stageId: 'stage_8',
        title: '地域の鍵当番を頼まれる',
        description: '通っている地域スペースで、朝の鍵開け当番が足りないと相談されました。月2回だけですが、引き受けると休みの日の予定が固定されます。',
        conditions: { communityActive: true },
        choices: [
          {
            id: 'choice_8_key_A',
            label: '月2回なら引き受ける',
            description: '無理のない回数で、場の維持に関わる。',
            feedback: 'あなたは居場所を使う側から支える側へ少し進みました。責任は増えますが、地域での信頼も増えます。',
            effects: { outsideWorkBelonging: 6, relationshipCapital: 4, meaningCapital: 3, freedom: -2 }
          },
          {
            id: 'choice_8_key_B',
            label: '代わりに広報を手伝う',
            description: '鍵当番は難しいが、告知文や写真整理を手伝う。',
            feedback: 'あなたはできる形で関わりました。現場の接点は少なめですが、役割を持つことで所属感は続きます。',
            effects: { outsideWorkBelonging: 4, meaningCapital: 3, freedom: -1 }
          },
          {
            id: 'choice_8_key_C',
            label: '利用者のままでいる',
            description: '責任は持たず、参加できる日にだけ顔を出す。',
            feedback: 'あなたは負担を増やさない距離を保ちました。自由はありますが、場の中心からは少し離れます。',
            effects: { freedom: 3, outsideWorkBelonging: -2, relationshipCapital: -1 }
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
      },
      {
        id: 'event_9_child_independence',
        stageId: 'stage_9',
        title: '子どもが一人暮らしを始める',
        description: '子どもから、就職に合わせて一人暮らしを始めたいと相談されました。家具や初期費用を助けたい気持ちと、手を出しすぎたくない気持ちがぶつかります。',
        conditions: { hasChildren: true },
        choices: [
          {
            id: 'choice_9_independence_A',
            label: '初期費用を一部助ける',
            description: '上限額を決め、家具や引っ越し費用を支援する。',
            feedback: 'あなたは子どもの自立を現実的に支えました。お金は減りますが、頼り合える関係は残ります。',
            effects: { nextGeneration: 7, familyCapital: 4, money: -5, emergencySupport: 2 }
          },
          {
            id: 'choice_9_independence_B',
            label: '手続きだけ一緒に確認する',
            description: '契約書や保険を見ながら、本人が払う形にする。',
            feedback: 'あなたは手を出しすぎずに支えました。自立を尊重しつつ、親子の相談関係は保たれます。',
            effects: { nextGeneration: 5, familyCapital: 3, money: -1, freedom: -1 }
          },
          {
            id: 'choice_9_independence_C',
            label: '本人に任せる',
            description: '困ったら相談してと言い、費用や準備は任せる。',
            feedback: 'あなたは自立を強く促しました。自分の資金は守れますが、少し距離を感じさせる場面にもなります。',
            effects: { money: 4, freedom: 2, nextGeneration: -3, familyCapital: -2 }
          }
        ]
      },
      {
        id: 'event_9_spouse_weekend',
        stageId: 'stage_9',
        title: '夫婦二人の週末が増える',
        description: '子どもや仕事の予定が減り、配偶者と二人だけの週末が増えてきました。会話の量も減っていて、このまま同じ家で別々に過ごす日も多くなりそうです。',
        conditions: { married: true },
        choices: [
          {
            id: 'choice_9_spouse_A',
            label: '二人で予定を作る',
            description: '散歩や映画など、月1回の外出を提案する。',
            feedback: 'あなたは夫婦関係を放置せず、軽い予定から作り直しました。自由は少し減りますが、家族資本は温まります。',
            effects: { familyCapital: 7, emergencySupport: 4, meaningCapital: 2, freedom: -2 }
          },
          {
            id: 'choice_9_spouse_B',
            label: '家事を一つ引き受ける',
            description: '会話より先に、負担になっている家事を担当する。',
            feedback: 'あなたは言葉より日常の負担を減らしました。大きな変化ではありませんが、家の空気は少し柔らかくなります。',
            effects: { familyCapital: 5, health: 1, freedom: -1 }
          },
          {
            id: 'choice_9_spouse_C',
            label: 'それぞれ自由に過ごす',
            description: '無理に会話を増やさず、互いの時間を尊重する。',
            feedback: 'あなたは距離のある平和を選びました。気楽さはありますが、緊急時に頼る感覚は少し弱まります。',
            effects: { freedom: 4, familyCapital: -3, emergencySupport: -2 },
            stateEffects: { soloLifestyle: true }
          }
        ]
      },
      {
        id: 'event_9_solo_apartment_notice',
        stageId: 'stage_9',
        title: 'マンションの更新通知が届く',
        description: '一人暮らしの部屋に、家賃値上げを含む更新通知が届きました。便利な場所ですが、近所に話す相手は少なく、今後の住まいを考える時期かもしれません。',
        conditions: { soloLifestyle: true },
        choices: [
          {
            id: 'choice_9_apartment_A',
            label: '地域交流のある物件を探す',
            description: '共有スペースや見守りのある住まいを候補に入れる。',
            feedback: 'あなたは住まいを関係性の入口として見直しました。自由は少し変わりますが、日常の接点が増える可能性があります。',
            effects: { outsideWorkBelonging: 5, emergencySupport: 3, money: -2, freedom: -2 },
            stateEffects: { communityActive: true }
          },
          {
            id: 'choice_9_apartment_B',
            label: '今の部屋を更新する',
            description: '生活を変えず、家賃上昇分だけ支出を調整する。',
            feedback: 'あなたは慣れた暮らしを守りました。落ち着きはありますが、人との接点は現状のままです。',
            effects: { freedom: 3, health: 1, money: -3, relationshipCapital: -1 }
          },
          {
            id: 'choice_9_apartment_C',
            label: '友人の近くへ引っ越す',
            description: '昔からの友人が住む沿線で部屋を探す。',
            feedback: 'あなたは住む場所を人間関係に寄せました。費用はかかりますが、会える距離の友人が増えます。',
            effects: { relationshipCapital: 5, emergencySupport: 3, money: -4, freedom: -1 },
            stateEffects: { localFriendship: true }
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
      },
      {
        id: 'event_10_farewell_speech',
        stageId: 'stage_10',
        title: '退職挨拶で何を話すか迷う',
        description: '最終出社日の前日、送別会で一言話してほしいと言われました。仕事の実績だけ話すこともできますが、後輩や同僚との関係をどう残すかを考えます。',
        conditions: { managementTrack: true },
        choices: [
          {
            id: 'choice_10_speech_A',
            label: '後輩への感謝を話す',
            description: '成果より、支えてくれた人への言葉を中心にする。',
            feedback: 'あなたは肩書を下ろす前に、人への感謝を残しました。退職後も連絡しやすい空気ができます。',
            effects: { relationshipCapital: 6, meaningCapital: 4, career: 1 }
          },
          {
            id: 'choice_10_speech_B',
            label: '実績と今後の予定を話す',
            description: '仕事で積み上げた成果と再雇用の意欲を伝える。',
            feedback: 'あなたは仕事人としての継続を示しました。キャリアの延長線は見えますが、私的な関係は増えにくいままです。',
            effects: { career: 5, money: 2, relationshipCapital: -1 },
            stateEffects: { careerFocused: true }
          },
          {
            id: 'choice_10_speech_C',
            label: '連絡先を交換して回る',
            description: '挨拶の後、数人と個別に連絡先を交換する。',
            feedback: 'あなたは職場の関係を退職後にも持ち出しました。全員とは続きませんが、孤立を防ぐ細い線が残ります。',
            effects: { relationshipCapital: 5, emergencySupport: 2, freedom: -1 }
          }
        ]
      },
      {
        id: 'event_10_morning_routine',
        stageId: 'stage_10',
        title: '朝の予定がなくなった初日',
        description: '退職後の最初の月曜、目覚ましを止めても行く場所がありません。自由で嬉しい一方、このままだと昼まで誰とも話さない日が続きそうです。',
        choices: [
          {
            id: 'choice_10_morning_A',
            label: '朝の散歩コースを作る',
            description: '毎朝同じ時間に歩き、店や公園に寄る。',
            feedback: 'あなたは自由時間に小さな型を作りました。健康と日常の顔なじみが少しずつ育ちます。',
            effects: { health: 6, outsideWorkBelonging: 3, relationshipCapital: 2, freedom: -1 }
          },
          {
            id: 'choice_10_morning_B',
            label: '週一の予定を先に入れる',
            description: '講座やサークルを予約し、予定表に固定する。',
            feedback: 'あなたは白紙の時間に外との接点を入れました。自由は少し減りますが、生活のリズムができます。',
            effects: { outsideWorkBelonging: 6, meaningCapital: 3, money: -2, freedom: -2 },
            stateEffects: { communityActive: true }
          },
          {
            id: 'choice_10_morning_C',
            label: 'しばらく何もしない',
            description: '疲れを抜くため、予定を入れず家で過ごす。',
            feedback: 'あなたは休息を選びました。回復にはなりますが、会話の少ない日が続く入口にもなります。',
            effects: { freedom: 5, health: 1, relationshipCapital: -3, outsideWorkBelonging: -3 },
            stateEffects: { soloLifestyle: true }
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
      },
      {
        id: 'event_11_clinic_neighbor',
        stageId: 'stage_11',
        title: '病院帰りに近所の人と会う',
        description: '定期通院の帰り、同じマンションの人に声をかけられました。体調の話をするのは少し抵抗がありますが、顔を覚えてもらう機会でもあります。',
        conditions: { soloLifestyle: true },
        choices: [
          {
            id: 'choice_11_neighbor_A',
            label: '少し立ち話をする',
            description: '通院帰りだと軽く話し、相手の近況も聞く。',
            feedback: 'あなたは日常の小さな接点を受け取りました。深い関係ではなくても、異変に気づく人が増えます。',
            effects: { relationshipCapital: 4, emergencySupport: 4, health: 1, freedom: -1 }
          },
          {
            id: 'choice_11_neighbor_B',
            label: '挨拶だけして帰る',
            description: '詳しい話は避け、笑顔で短く済ませる。',
            feedback: 'あなたは距離を保ちながら顔見知りを維持しました。負担は少ないですが、頼れる関係にはまだ届きません。',
            effects: { relationshipCapital: 1, freedom: 1 }
          },
          {
            id: 'choice_11_neighbor_C',
            label: '気づかないふりをする',
            description: '話しかけられる前に、別の出口から帰る。',
            feedback: 'あなたは干渉されない静けさを選びました。気楽さはありますが、近所の見守りからは遠ざかります。',
            effects: { freedom: 3, relationshipCapital: -3, emergencySupport: -3 }
          }
        ]
      },
      {
        id: 'event_11_community_cleaning',
        stageId: 'stage_11',
        title: '地域清掃の班長が回ってくる',
        description: '自治会から、来月の地域清掃の班長をお願いできないかと連絡が来ました。重い作業は不安ですが、近所の人と話す機会にはなりそうです。',
        conditions: { communityActive: true },
        choices: [
          {
            id: 'choice_11_cleaning_A',
            label: '軽作業中心で引き受ける',
            description: '無理な作業は避け、受付や声かけを担当する。',
            feedback: 'あなたは体力に合わせて地域の役割を続けました。無理なく所属感と見守りの関係が育ちます。',
            effects: { outsideWorkBelonging: 5, relationshipCapital: 4, emergencySupport: 3, health: -1 }
          },
          {
            id: 'choice_11_cleaning_B',
            label: '副担当を探して受ける',
            description: '一人で抱えず、近所の人と分担して進める。',
            feedback: 'あなたは助けを借りる形で役割を受けました。頼り頼られる関係が自然に増えます。',
            effects: { outsideWorkBelonging: 4, relationshipCapital: 5, emergencySupport: 4, freedom: -1 }
          },
          {
            id: 'choice_11_cleaning_C',
            label: '体調を理由に断る',
            description: '無理はせず、参加できる日にだけ顔を出すと伝える。',
            feedback: 'あなたは体調を守りました。無理をしないのは大事ですが、地域の役割からは少し離れます。',
            effects: { health: 3, freedom: 2, outsideWorkBelonging: -3 }
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
      },
      {
        id: 'event_12_emergency_contact',
        stageId: 'stage_12',
        title: '緊急連絡先の欄で手が止まる',
        description: '病院の書類で、緊急連絡先を書く欄がありました。家族、友人、近所の人、民間サービスのどれを頼るのか、名前を書く瞬間に現実味が出ます。',
        choices: [
          {
            id: 'choice_12_contact_A',
            label: '家族に事前確認する',
            description: '名前を書く前に電話し、連絡先にしてよいか聞く。',
            feedback: 'あなたは頼ることを言葉にしました。少し照れくさいですが、いざという時の連絡は確実になります。',
            effects: { familyCapital: 6, emergencySupport: 6, freedom: -1 }
          },
          {
            id: 'choice_12_contact_B',
            label: '友人や近所の人に頼む',
            description: '最近会っている相手に、緊急時の連絡先を相談する。',
            feedback: 'あなたは血縁以外の支えを現実の仕組みにしました。頼る勇気が、老後の安全網になります。',
            effects: { relationshipCapital: 6, outsideWorkBelonging: 3, emergencySupport: 6, freedom: -1 }
          },
          {
            id: 'choice_12_contact_C',
            label: '有料サービスを調べる',
            description: '迷惑をかけない方法として、身元保証や見守りを探す。',
            feedback: 'あなたは制度で支えを補う道を探しました。お金は必要ですが、頼れる先を空欄にしない選択です。',
            effects: { emergencySupport: 5, money: -5, freedom: 2, meaningCapital: -1 }
          },
          {
            id: 'choice_12_contact_D',
            label: '空欄のまま提出する',
            description: '今は決められないので、あとで考えることにする。',
            feedback: 'あなたは決定を先送りしました。書類は進みますが、緊急時の不安はそのまま残ります。',
            effects: { freedom: 2, emergencySupport: -6, relationshipCapital: -2, familyCapital: -2 }
          }
        ]
      }
    ]
  }
];
