// JLPT N5 Starter Questions Seed Data
export const jlptQuestionsSeed = [
  // ─── VOCABULARY ─────────────────────────────────────────────
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 1,
    question: "「たべる」の意味は何ですか？", options: JSON.stringify(["to eat", "to drink", "to run", "to sleep"]),
    answer: "to eat", explanation: "食べる (たべる) means 'to eat'. It is a Group 2 (ichidan) verb.", tags: JSON.stringify(["furigana:食べる:たべる"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 1,
    question: "「のむ」の意味は何ですか？", options: JSON.stringify(["to drink", "to eat", "to read", "to write"]),
    answer: "to drink", explanation: "飲む (のむ) means 'to drink'. It is a Group 1 (godan) verb.", tags: JSON.stringify(["furigana:飲む:のむ"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 1,
    question: "「みる」の意味は何ですか？", options: JSON.stringify(["to see/watch", "to hear", "to speak", "to walk"]),
    answer: "to see/watch", explanation: "見る (みる) means 'to see' or 'to watch'.", tags: JSON.stringify(["furigana:見る:みる"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 1,
    question: "「がっこう」は英語で何ですか？", options: JSON.stringify(["school", "hospital", "library", "station"]),
    answer: "school", explanation: "学校 (がっこう) means 'school'.", tags: JSON.stringify(["furigana:学校:がっこう"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 1,
    question: "「おおきい」の意味は？", options: JSON.stringify(["big", "small", "fast", "slow"]),
    answer: "big", explanation: "大きい (おおきい) means 'big' or 'large'.", tags: JSON.stringify(["furigana:大きい:おおきい"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "「びょういん」は英語で何ですか？", options: JSON.stringify(["hospital", "school", "park", "office"]),
    answer: "hospital", explanation: "病院 (びょういん) means 'hospital'.", tags: JSON.stringify(["furigana:病院:びょういん"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "「あたらしい」の意味は？", options: JSON.stringify(["new", "old", "expensive", "cheap"]),
    answer: "new", explanation: "新しい (あたらしい) means 'new'.", tags: JSON.stringify(["furigana:新しい:あたらしい"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "「でんわ」は英語で何ですか？", options: JSON.stringify(["telephone", "television", "computer", "clock"]),
    answer: "telephone", explanation: "電話 (でんわ) means 'telephone'.", tags: JSON.stringify(["furigana:電話:でんわ"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "「しごと」の意味は？", options: JSON.stringify(["work/job", "hobby", "sport", "study"]),
    answer: "work/job", explanation: "仕事 (しごと) means 'work' or 'job'.", tags: JSON.stringify(["furigana:仕事:しごと"]),
  },
  {
    subject: "jlpt", level: "n5", category: "vocabulary", type: "multiple_choice", difficulty: 3,
    question: "「けっこん」の意味は何ですか？", options: JSON.stringify(["marriage", "graduation", "birthday", "vacation"]),
    answer: "marriage", explanation: "結婚 (けっこん) means 'marriage'.", tags: JSON.stringify(["furigana:結婚:けっこん"]),
  },
  // ─── GRAMMAR ────────────────────────────────────────────────
  {
    subject: "jlpt", level: "n5", category: "grammar", type: "multiple_choice", difficulty: 1,
    question: "わたし＿＿がくせいです。", options: JSON.stringify(["は", "を", "が", "に"]),
    answer: "は", explanation: "は (wa) is the topic marker particle. わたしは = 'As for me' (topic).", tags: JSON.stringify(["particle"]),
  },
  {
    subject: "jlpt", level: "n5", category: "grammar", type: "multiple_choice", difficulty: 1,
    question: "コーヒー＿＿のみます。", options: JSON.stringify(["を", "は", "に", "で"]),
    answer: "を", explanation: "を (wo) marks the direct object of a verb. コーヒーを飲みます = 'I drink coffee'.", tags: JSON.stringify(["particle"]),
  },
  {
    subject: "jlpt", level: "n5", category: "grammar", type: "multiple_choice", difficulty: 1,
    question: "えき＿＿いきます。", options: JSON.stringify(["に", "を", "は", "で"]),
    answer: "に", explanation: "に (ni) indicates direction/destination. 駅に行きます = 'I go to the station'.", tags: JSON.stringify(["particle"]),
  },
  {
    subject: "jlpt", level: "n5", category: "grammar", type: "multiple_choice", difficulty: 2,
    question: "きのう テレビ＿＿みました。", options: JSON.stringify(["を", "が", "に", "で"]),
    answer: "を", explanation: "を is used with action verbs to mark what you watch. テレビを見ました = 'I watched TV'.", tags: JSON.stringify(["particle", "past-tense"]),
  },
  {
    subject: "jlpt", level: "n5", category: "grammar", type: "multiple_choice", difficulty: 2,
    question: "としょかん＿＿べんきょうします。", options: JSON.stringify(["で", "に", "を", "は"]),
    answer: "で", explanation: "で (de) marks the location where an action takes place. 図書館で = 'at the library'.", tags: JSON.stringify(["particle", "location"]),
  },
  {
    subject: "jlpt", level: "n5", category: "grammar", type: "multiple_choice", difficulty: 2,
    question: "このりんご＿＿おいしいです。", options: JSON.stringify(["は", "を", "が", "に"]),
    answer: "は", explanation: "は marks the topic. このりんごは = 'As for this apple, it is delicious'.", tags: JSON.stringify(["particle"]),
  },
  {
    subject: "jlpt", level: "n5", category: "grammar", type: "multiple_choice", difficulty: 3,
    question: "にほんご＿＿えいご＿＿はなします。", options: JSON.stringify(["と / を", "は / が", "で / に", "を / は"]),
    answer: "と / を", explanation: "～と～を話します: 'I speak Japanese and English'. と connects nouns, を marks the object.", tags: JSON.stringify(["particle", "conjunction"]),
  },
  // ─── KANJI ──────────────────────────────────────────────────
  {
    subject: "jlpt", level: "n5", category: "kanji", type: "multiple_choice", difficulty: 1,
    question: "「山」の読み方は？", options: JSON.stringify(["やま", "かわ", "もり", "うみ"]),
    answer: "やま", explanation: "山 (やま) means 'mountain'. On-reading: サン, Kun-reading: やま.", tags: JSON.stringify(["kanji:山"]),
  },
  {
    subject: "jlpt", level: "n5", category: "kanji", type: "multiple_choice", difficulty: 1,
    question: "「水」の読み方は？", options: JSON.stringify(["みず", "ひ", "つち", "き"]),
    answer: "みず", explanation: "水 (みず) means 'water'. On-reading: スイ, Kun-reading: みず.", tags: JSON.stringify(["kanji:水"]),
  },
  {
    subject: "jlpt", level: "n5", category: "kanji", type: "multiple_choice", difficulty: 1,
    question: "「日」の読み方は？", options: JSON.stringify(["にち / ひ", "げつ / つき", "か / ひ", "すい / みず"]),
    answer: "にち / ひ", explanation: "日 means 'day' or 'sun'. On: ニチ/ジツ, Kun: ひ/か.", tags: JSON.stringify(["kanji:日"]),
  },
  {
    subject: "jlpt", level: "n5", category: "kanji", type: "multiple_choice", difficulty: 2,
    question: "「先生」の読み方は？", options: JSON.stringify(["せんせい", "がくせい", "せいと", "きょうし"]),
    answer: "せんせい", explanation: "先生 (せんせい) means 'teacher' or 'doctor' (respectful).", tags: JSON.stringify(["kanji:先生"]),
  },
  {
    subject: "jlpt", level: "n5", category: "kanji", type: "multiple_choice", difficulty: 2,
    question: "「食べる」の「食」の音読みは？", options: JSON.stringify(["ショク", "タベ", "タ", "ジキ"]),
    answer: "ショク", explanation: "食 has On-reading ショク (e.g. 食事 = しょくじ = meal).", tags: JSON.stringify(["kanji:食"]),
  },
  // ─── READING ────────────────────────────────────────────────
  {
    subject: "jlpt", level: "n5", category: "reading", type: "multiple_choice", difficulty: 2,
    question: "「わたしは まいにち ６じに おきます。あさごはんを たべて、がっこうに いきます。」\n\nこの人は何時に起きますか？",
    options: JSON.stringify(["6時", "7時", "8時", "5時"]),
    answer: "6時", explanation: "The passage says 6じに おきます = 'I wake up at 6 o'clock'.", tags: JSON.stringify(["reading-comprehension"]),
  },
  {
    subject: "jlpt", level: "n5", category: "reading", type: "multiple_choice", difficulty: 2,
    question: "「きのう ともだちと えいがを みました。とても おもしろかったです。」\n\n何をしましたか？",
    options: JSON.stringify(["映画を見た", "本を読んだ", "音楽を聞いた", "テレビを見た"]),
    answer: "映画を見た", explanation: "えいがをみました = 'watched a movie'. ともだちと = 'with a friend'.", tags: JSON.stringify(["reading-comprehension"]),
  },
  {
    subject: "jlpt", level: "n5", category: "reading", type: "multiple_choice", difficulty: 3,
    question: "「たなかさんは にほんじんです。えいごと フランスごを はなします。かいしゃで はたらいています。」\n\n田中さんは何語を話しますか？",
    options: JSON.stringify(["英語とフランス語", "日本語と英語", "フランス語と中国語", "英語と中国語"]),
    answer: "英語とフランス語", explanation: "えいごとフランスごをはなします = 'speaks English and French'.", tags: JSON.stringify(["reading-comprehension"]),
  },
  // ─── N4 VOCABULARY ──────────────────────────────────────────
  {
    subject: "jlpt", level: "n4", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "「けいけん」の意味は？", options: JSON.stringify(["experience", "economy", "scenery", "police"]),
    answer: "experience", explanation: "経験 (けいけん) means 'experience'.", tags: JSON.stringify(["furigana:経験:けいけん"]),
  },
  {
    subject: "jlpt", level: "n4", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "「しんぱい」の意味は？", options: JSON.stringify(["worry", "happiness", "anger", "surprise"]),
    answer: "worry", explanation: "心配 (しんぱい) means 'worry' or 'concern'.", tags: JSON.stringify(["furigana:心配:しんぱい"]),
  },
  {
    subject: "jlpt", level: "n4", category: "vocabulary", type: "multiple_choice", difficulty: 3,
    question: "「せつめい」の意味は？", options: JSON.stringify(["explanation", "invitation", "reservation", "introduction"]),
    answer: "explanation", explanation: "説明 (せつめい) means 'explanation'.", tags: JSON.stringify(["furigana:説明:せつめい"]),
  },
  // ─── N4 GRAMMAR ─────────────────────────────────────────────
  {
    subject: "jlpt", level: "n4", category: "grammar", type: "multiple_choice", difficulty: 2,
    question: "彼は毎朝コーヒーを＿＿＿飲みます。", options: JSON.stringify(["ながら", "ために", "ように", "まで"]),
    answer: "ながら", explanation: "ながら connects two simultaneous actions by the same subject. Verb stem + ながら.", tags: JSON.stringify(["grammar:ながら"]),
  },
  {
    subject: "jlpt", level: "n4", category: "grammar", type: "multiple_choice", difficulty: 3,
    question: "雨が降った＿＿＿、試合は中止になりました。", options: JSON.stringify(["ので", "のに", "ながら", "ために"]),
    answer: "ので", explanation: "ので expresses a reason/cause. 雨が降ったので = 'Because it rained'.", tags: JSON.stringify(["grammar:ので"]),
  },
  {
    subject: "jlpt", level: "n4", category: "grammar", type: "multiple_choice", difficulty: 3,
    question: "日本語が＿＿＿ようになりました。", options: JSON.stringify(["話せる", "話す", "話して", "話した"]),
    answer: "話せる", explanation: "～ようになる means 'to become able to'. Uses potential form: 話せるようになる.", tags: JSON.stringify(["grammar:ようになる"]),
  },
  // ─── TOEFL VOCABULARY ───────────────────────────────────────
  {
    subject: "toefl", level: "toefl_vocab", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "Choose the word closest in meaning to 'ubiquitous':", options: JSON.stringify(["omnipresent", "rare", "ancient", "fragile"]),
    answer: "omnipresent", explanation: "Ubiquitous means 'found everywhere' — synonym: omnipresent.", tags: JSON.stringify(["academic-vocab"]),
  },
  {
    subject: "toefl", level: "toefl_vocab", category: "vocabulary", type: "multiple_choice", difficulty: 3,
    question: "Choose the word closest in meaning to 'ambiguous':", options: JSON.stringify(["unclear", "obvious", "rapid", "permanent"]),
    answer: "unclear", explanation: "Ambiguous means 'open to more than one interpretation' — synonym: unclear, vague.", tags: JSON.stringify(["academic-vocab"]),
  },
  {
    subject: "toefl", level: "toefl_vocab", category: "vocabulary", type: "multiple_choice", difficulty: 2,
    question: "The researcher tried to _____ the results of the experiment.", options: JSON.stringify(["replicate", "ignore", "diminish", "postpone"]),
    answer: "replicate", explanation: "To replicate means to reproduce or repeat (common academic verb).", tags: JSON.stringify(["academic-vocab"]),
  },
  // ─── TOEFL GRAMMAR ──────────────────────────────────────────
  {
    subject: "toefl", level: "toefl_grammar", category: "grammar", type: "multiple_choice", difficulty: 2,
    question: "Neither the students nor the teacher _____ aware of the schedule change.", options: JSON.stringify(["was", "were", "is being", "are"]),
    answer: "was", explanation: "With 'neither...nor', the verb agrees with the nearest subject. 'teacher' is singular → 'was'.", tags: JSON.stringify(["subject-verb-agreement"]),
  },
  {
    subject: "toefl", level: "toefl_grammar", category: "grammar", type: "multiple_choice", difficulty: 3,
    question: "Had I known about the meeting, I _____ attended.", options: JSON.stringify(["would have", "will have", "would", "had"]),
    answer: "would have", explanation: "Past unreal conditional: Had I known → I would have attended (third conditional).", tags: JSON.stringify(["conditionals"]),
  },
  // ─── TOEFL READING ──────────────────────────────────────────
  {
    subject: "toefl", level: "toefl_reading", category: "reading", type: "multiple_choice", difficulty: 3,
    question: "Photosynthesis is the process by which green plants convert sunlight into chemical energy. This process is essential for life on Earth as it produces oxygen and forms the basis of most food chains.\n\nWhat is the main purpose of the passage?",
    options: JSON.stringify(["To describe what photosynthesis does", "To argue plants are superior", "To compare animal and plant cells", "To explain why sunlight is harmful"]),
    answer: "To describe what photosynthesis does", explanation: "The passage defines photosynthesis and explains its importance — a descriptive/informational purpose.", tags: JSON.stringify(["main-idea"]),
  },
];
