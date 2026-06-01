export interface Quest {
  id: string;
  name: string;
  era: string;
  historicalContext: string;
  culturalSignificance: string;
  architecturalNotes: string;
  localTip: string;
  challengeType: 'trivia' | 'photo' | 'explore' | 'taste' | 'decode';
  difficulty: 'moderate' | 'challenging' | 'expert';
  estimatedTime: string;
  points: number;
  coordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number };
  imageUrl: string;
  resources: {
    title: string;
    url: string;
    type: 'article' | 'book' | 'video' | 'podcast';
  }[];
  triviaQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const quests: Quest[] = [
  {
    id: 'colosseum',
    name: 'The Colosseum',
    era: '70-80 AD (Flavian Dynasty)',
    historicalContext: 'Commissioned by Emperor Vespasian and completed by his son Titus, the Flavian Amphitheatre was a deliberate political statement. Built on the drained site of Nero\'s private lake, it symbolized the return of public land to the people. The inaugural games lasted 100 days and reportedly saw the death of over 9,000 animals.',
    culturalSignificance: 'Beyond mere entertainment, the Colosseum served as a sophisticated tool of social control. The seating arrangement (cavea) rigidly enforced social hierarchy - senators at the bottom, women and slaves at the top. Free bread and spectacles (panem et circenses) kept the populace placated during times of political instability.',
    architecturalNotes: 'The ingenious velarium (retractable awning) required 1,000 sailors to operate. The hypogeum beneath the arena floor contained 80 vertical shafts with elevators powered by counterweights, capable of lifting animals and scenery to dramatic effect. Roman concrete (opus caementicium) made this engineering marvel possible.',
    localTip: 'Visit at sunset when the travertine stone glows golden. The nearby Enoteca Provincia serves excellent Lazio wines - perfect for contemplating the passage of empires.',
    challengeType: 'trivia',
    difficulty: 'challenging',
    estimatedTime: '45 min',
    points: 150,
    coordinates: { lat: 41.8902, lng: 12.4922 },
    mapPosition: { x: 85, y: 65 },
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    resources: [
      { title: 'The Colosseum: A History', url: 'https://www.worldhistory.org/Colosseum/', type: 'article' },
      { title: 'SPQR: A History of Ancient Rome', url: 'https://www.goodreads.com/book/show/28789711-spqr', type: 'book' },
      { title: 'Secrets of the Colosseum (Smithsonian)', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
    ],
    triviaQuestions: [
      {
        question: 'What was the original name of the Colosseum?',
        options: ['Flavian Amphitheatre', 'Nero\'s Arena', 'Circus Maximus', 'Forum Romanum'],
        correctIndex: 0,
        explanation: 'Named after the Flavian dynasty (Vespasian and Titus), "Colosseum" came later, possibly from the nearby Colossus of Nero statue.',
      },
      {
        question: 'How many spectators could the Colosseum hold at its peak?',
        options: ['25,000', '50,000', '80,000', '100,000'],
        correctIndex: 2,
        explanation: 'Recent studies suggest 50,000-80,000 spectators, with sophisticated crowd management via 76 numbered entrances called vomitoria.',
      },
      {
        question: 'What innovation allowed the arena floor to flood for naval battles?',
        options: ['Underground aqueducts', 'Portable pools', 'It was never flooded', 'The hypogeum drainage system'],
        correctIndex: 0,
        explanation: 'Before the hypogeum was built, the arena could be flooded via specially designed channels connected to aqueducts for naumachia (naval spectacles).',
      },
    ],
  },
  {
    id: 'roman-forum',
    name: 'Roman Forum',
    era: '7th Century BC - 6th Century AD',
    historicalContext: 'Originally a marshy burial ground, the Forum was drained by the Cloaca Maxima (still functioning today). For over a millennium, this was the beating heart of Western civilization - where Caesar\'s body was cremated, where Cicero delivered his philippics, and where the fate of empires was decided.',
    culturalSignificance: 'The Forum embodied the Roman concept of res publica (public affairs). Citizens gathered here not just for politics but for banking (around the Temple of Castor), religious ceremonies, and commercial transactions. The rostra (speaker\'s platform) decorated with captured ship prows represents Rome\'s Mediterranean dominance.',
    architecturalNotes: 'Notice how the buildings span republican austerity to imperial grandeur. The Temple of Saturn (497 BC) shows early Etruscan influence, while the Arch of Septimius Severus (203 AD) displays late imperial propaganda. The Umbilicus Urbis marked the symbolic center of Rome and thus the world.',
    localTip: 'Enter from Via dei Fori Imperiali for the grand reveal. Visit the Capitoline Museums afterward to see the original Marcus Aurelius equestrian statue and contemplate Stoic philosophy over an aperitivo at the museum\'s rooftop cafe.',
    challengeType: 'explore',
    difficulty: 'expert',
    estimatedTime: '60 min',
    points: 200,
    coordinates: { lat: 41.8925, lng: 12.4853 },
    mapPosition: { x: 72, y: 52 },
    imageUrl: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800&q=80',
    resources: [
      { title: 'The Roman Forum: A Reconstruction', url: 'https://www.khanacademy.org/humanities/ap-art-history/ancient-mediterranean-ap/ap-ancient-rome/a/forum-romanum-roman-forum', type: 'article' },
      { title: 'Rubicon: The Last Years of the Roman Republic', url: 'https://www.goodreads.com/book/show/91017.Rubicon', type: 'book' },
      { title: 'The History of Rome Podcast', url: 'https://thehistoryofrome.typepad.com/', type: 'podcast' },
    ],
    triviaQuestions: [
      {
        question: 'Where exactly was Julius Caesar cremated?',
        options: ['Temple of Saturn', 'Temple of Divus Julius', 'The Rostra', 'Basilica Julia'],
        correctIndex: 1,
        explanation: 'The Temple of Divus Julius was built on the exact spot where Caesar\'s body was cremated. Romans still leave flowers there today.',
      },
      {
        question: 'What does SPQR stand for?',
        options: ['Senate and People of Rome', 'Soldiers and Protectors of the Realm', 'Sacred Power of Roman Quinquennials', 'Supreme Pontiff\'s Quarterly Register'],
        correctIndex: 0,
        explanation: 'Senatus Populusque Romanus - still seen on Roman manhole covers today, a remarkable continuity of identity.',
      },
      {
        question: 'What was the Cloaca Maxima?',
        options: ['A temple', 'A sewer system', 'A marketplace', 'A prison'],
        correctIndex: 1,
        explanation: 'One of the world\'s earliest sewage systems, dating to 600 BC, still drains the Forum area into the Tiber today.',
      },
    ],
  },
  {
    id: 'pantheon',
    name: 'Pantheon',
    era: '125 AD (Hadrian)',
    historicalContext: 'Hadrian\'s architectural masterpiece replaced Agrippa\'s earlier temple (the misleading inscription honors the original patron). As the best-preserved ancient Roman building, it offers an unmatched window into imperial engineering genius. Converted to a church in 609 AD, saving it from medieval quarrying.',
    culturalSignificance: 'The Pantheon embodies Roman religious syncretism - "temple to all gods." Its perfect geometry (the dome\'s height equals its diameter at 43.3m) represents cosmic harmony. Renaissance artists including Raphael chose burial here, and Michelangelo reportedly called it "angelic, not human design."',
    architecturalNotes: 'The unreinforced concrete dome remains the world\'s largest, achieved through graduated aggregate (heavy basalt at base, light pumice at top) and stress-relieving coffers. The oculus (8.2m diameter) creates a moving sunbeam that illuminates the interior like a cosmic clock.',
    localTip: 'Arrive at noon when the sun streams directly through the oculus. Then walk to Sant\'Eustachio Il Caffe for arguably Rome\'s finest espresso, a tradition since 1938.',
    challengeType: 'decode',
    difficulty: 'moderate',
    estimatedTime: '30 min',
    points: 120,
    coordinates: { lat: 41.8986, lng: 12.4769 },
    mapPosition: { x: 45, y: 38 },
    imageUrl: 'https://images.unsplash.com/photo-1588090207636-f6c310d52299?w=800&q=80',
    resources: [
      { title: 'The Pantheon: From Antiquity to Present', url: 'https://www.khanacademy.org/humanities/ap-art-history/ancient-mediterranean-ap/ap-ancient-rome/a/the-pantheon-rome', type: 'article' },
      { title: 'Hadrian and the Triumph of Rome', url: 'https://www.goodreads.com/book/show/2708353-hadrian-and-the-triumph-of-rome', type: 'book' },
      { title: 'Engineering an Empire: Rome', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
    ],
    triviaQuestions: [
      {
        question: 'Why does the Pantheon\'s dome not collapse?',
        options: ['Hidden steel supports', 'Graduated concrete density and coffers', 'It\'s actually hollow', 'Constant modern maintenance'],
        correctIndex: 1,
        explanation: 'The dome uses lighter materials toward the top and the coffers reduce weight while creating a beautiful pattern - pure Roman engineering brilliance.',
      },
      {
        question: 'What famous artist is buried in the Pantheon?',
        options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Botticelli'],
        correctIndex: 2,
        explanation: 'Raphael requested burial here. His epitaph reads: "Here lies Raphael, by whom Nature feared to be outdone while he lived, and when he died, feared that she herself would die."',
      },
      {
        question: 'What happens when it rains through the oculus?',
        options: ['The interior floods', 'Priests cover it', 'The sloped floor drains it away', 'Rain never enters'],
        correctIndex: 2,
        explanation: 'The slightly convex floor and 22 drainage holes efficiently channel rainwater away - ancient Romans thought of everything.',
      },
    ],
  },
  {
    id: 'trevi-fountain',
    name: 'Trevi Fountain',
    era: '1762 (Baroque)',
    historicalContext: 'Designed by Nicola Salvi and completed by Giuseppe Pannini, the Trevi marks the terminal point of the Aqua Virgo aqueduct, built in 19 BC to supply Rome\'s baths. Legend has it that a virgin (virgo) showed thirsty Roman soldiers the spring\'s location.',
    culturalSignificance: 'The theatrical facade transforms water supply into urban spectacle - quintessentially Baroque. Fellini\'s La Dolce Vita (1960) immortalized it in cinema history. The coin-throwing tradition generates roughly 3,000 euros daily, donated to Caritas for Rome\'s homeless.',
    architecturalNotes: 'The fountain merges with Palazzo Poli\'s facade, creating the illusion that the building is the water\'s source. Ocean (Oceanus) commands the central niche, flanked by allegories of Abundance and Health. Note the realistic "rocky reef" carved from travertine, the same stone as the Colosseum.',
    localTip: 'Come at dawn (6-7 AM) for photos without crowds. The adjacent Vicus Caprarius archaeological site reveals the ancient aqueduct beneath. For dinner, book at Piccolo Arancio nearby - excellent Roman cuisine without tourist markup.',
    challengeType: 'photo',
    difficulty: 'moderate',
    estimatedTime: '20 min',
    points: 100,
    coordinates: { lat: 41.9009, lng: 12.4833 },
    mapPosition: { x: 55, y: 28 },
    imageUrl: 'https://images.unsplash.com/photo-1575230891044-21e17406cb66?w=800&q=80',
    resources: [
      { title: 'The Trevi Fountain and Baroque Rome', url: 'https://www.rome.net/trevi-fountain', type: 'article' },
      { title: 'La Dolce Vita Film Analysis', url: 'https://www.criterion.com/films/540-la-dolce-vita', type: 'video' },
      { title: 'Roman Baroque Architecture', url: 'https://www.goodreads.com/book/show/1162866.Baroque_Architecture', type: 'book' },
    ],
    triviaQuestions: [
      {
        question: 'Which ancient aqueduct feeds the Trevi Fountain?',
        options: ['Aqua Claudia', 'Aqua Virgo', 'Aqua Marcia', 'Aqua Appia'],
        correctIndex: 1,
        explanation: 'The Aqua Virgo, built by Agrippa in 19 BC, still supplies several Roman fountains including the Trevi after 2,000 years.',
      },
      {
        question: 'In La Dolce Vita, which actress wades into the fountain?',
        options: ['Sophia Loren', 'Anita Ekberg', 'Monica Vitti', 'Gina Lollobrigida'],
        correctIndex: 1,
        explanation: 'Anita Ekberg\'s midnight wade became one of cinema\'s most iconic scenes, forever linking the fountain to la dolce vita lifestyle.',
      },
      {
        question: 'What organization receives the coins thrown into the fountain?',
        options: ['The Vatican', 'Caritas (Catholic charity)', 'Rome municipality', 'Italian government'],
        correctIndex: 1,
        explanation: 'Since 2007, Caritas has received approximately 1.5 million euros annually from Trevi coins to fund a supermarket for Rome\'s poor.',
      },
    ],
  },
  {
    id: 'vatican',
    name: 'Vatican City & St. Peter\'s',
    era: '1506-1626 (Renaissance/Baroque)',
    historicalContext: 'The world\'s smallest sovereign state sits atop the traditional burial site of St. Peter. Constantine\'s original 4th-century basilica was demolished by Julius II to build the current structure, employing Bramante, Michelangelo, and Bernini over 120 years.',
    culturalSignificance: 'Beyond its religious significance for 1.3 billion Catholics, the Vatican houses humanity\'s greatest art collection. Michelangelo\'s Sistine Chapel ceiling represents the apex of Renaissance achievement, while Bernini\'s colonnade physically embraces visitors in the arms of the church.',
    architecturalNotes: 'Michelangelo\'s dome (136.6m high) inspired Christopher Wren\'s St. Paul\'s and the US Capitol. Bernini\'s baldachin (bronze canopy) stands 29m tall, cast from bronze stripped from the Pantheon\'s porch - a controversial act even then. The colonnade\'s 284 columns are arranged to appear as single rows from two focal points.',
    localTip: 'Book Vatican Museum tickets weeks ahead for early entry (8:30 AM). After the crowds, find tranquility at the nearby Passetto di Borgo - the secret elevated corridor popes used to escape to Castel Sant\'Angelo.',
    challengeType: 'explore',
    difficulty: 'expert',
    estimatedTime: '90 min',
    points: 250,
    coordinates: { lat: 41.9022, lng: 12.4539 },
    mapPosition: { x: 12, y: 42 },
    imageUrl: 'https://images.unsplash.com/photo-1523732291917-c8f56469b445?w=800&q=80',
    resources: [
      { title: 'Michelangelo and the Sistine Chapel', url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina.html', type: 'article' },
      { title: 'The Agony and the Ecstasy', url: 'https://www.goodreads.com/book/show/321552.The_Agony_and_the_Ecstasy', type: 'book' },
      { title: 'Vatican: The Hidden World', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
    ],
    triviaQuestions: [
      {
        question: 'How long did it take Michelangelo to paint the Sistine Chapel ceiling?',
        options: ['2 years', '4 years', '8 years', '12 years'],
        correctIndex: 1,
        explanation: 'From 1508-1512, Michelangelo painted over 5,000 square feet while lying on scaffolding, permanently damaging his eyesight.',
      },
      {
        question: 'What is the Swiss Guard famous for?',
        options: ['Banking secrets', 'Protecting the Pope since 1506', 'Swiss chocolate distribution', 'Diplomatic immunity'],
        correctIndex: 1,
        explanation: 'The Swiss Guard has protected popes since 1506. Their colorful uniforms are often attributed to Michelangelo\'s design.',
      },
      {
        question: 'Where did the bronze for Bernini\'s baldachin come from?',
        options: ['Colosseum', 'Pantheon portico', 'Castel Sant\'Angelo', 'Newly mined'],
        correctIndex: 1,
        explanation: 'Pope Urban VIII\'s decision to strip the Pantheon\'s porch ceiling led to the famous quip: "What the barbarians didn\'t do, the Barberini did."',
      },
    ],
  },
  {
    id: 'trastevere',
    name: 'Trastevere',
    era: 'Ancient Rome to Present',
    historicalContext: 'Literally "across the Tiber," Trastevere was originally settled by foreign merchants, sailors, and Rome\'s Jewish community. This working-class neighborhood maintained distinct traditions while the center gentrified. Santa Maria in Trastevere (340 AD) is possibly Rome\'s oldest church dedicated to the Virgin.',
    culturalSignificance: 'Trastevere represents the living tradition of "Romanesco" culture - the authentic Roman dialect, cuisine, and street life. The annual Festa de\' Noantri celebrates this unique identity. Today it balances authentic Roman life with the city\'s most vibrant nightlife.',
    architecturalNotes: 'The organic medieval street plan contrasts with ancient Rome\'s grid. Look for "talking statues" like Pasquino where Romans posted satirical commentary. The gilded 13th-century mosaics in Santa Maria rival those of Ravenna. Notice travertine doorframes repurposed from ancient ruins.',
    localTip: 'Start at Porta Settimiana at sunset. Dine at Da Enzo al 29 (book ahead) for legendary cacio e pepe. End at Bar San Calisto with the locals - no tourists, no pretense, just perfect aperitivo culture.',
    challengeType: 'taste',
    difficulty: 'moderate',
    estimatedTime: '45 min',
    points: 130,
    coordinates: { lat: 41.8893, lng: 12.4697 },
    mapPosition: { x: 22, y: 68 },
    imageUrl: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=800&q=80',
    resources: [
      { title: 'The Soul of Rome: Trastevere', url: 'https://www.nytimes.com/2019/08/20/travel/trastevere-rome-neighborhood.html', type: 'article' },
      { title: 'Eating Rome: Living the Good Life', url: 'https://www.goodreads.com/book/show/22716424-eating-rome', type: 'book' },
      { title: 'Trastevere: Rome\'s Greenwich Village', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
    ],
    triviaQuestions: [
      {
        question: 'What does "Trastevere" literally mean?',
        options: ['Beautiful crossing', 'Across the Tiber', 'Three streets', 'Ancient village'],
        correctIndex: 1,
        explanation: 'From Latin "trans Tiberim" (across the Tiber), the neighborhood\'s name reflects its geographic separation from central Rome.',
      },
      {
        question: 'What is the traditional Roman pasta "cacio e pepe"?',
        options: ['Tomato and basil', 'Cheese and black pepper', 'Bacon and egg', 'Garlic and oil'],
        correctIndex: 1,
        explanation: 'The deceptively simple dish requires only pecorino romano, black pepper, and pasta water - yet takes years to master.',
      },
      {
        question: 'What is the Festa de\' Noantri?',
        options: ['Wine festival', 'Trastevere\'s annual neighborhood celebration', 'Roman New Year', 'Art exhibition'],
        correctIndex: 1,
        explanation: '"Noantri" means "we others" in Romanesco dialect - the festival celebrates Trastevere\'s distinct identity since 1535.',
      },
    ],
  },
  {
    id: 'campo-de-fiori',
    name: 'Campo de\' Fiori',
    era: 'Medieval to Present',
    historicalContext: 'The "Field of Flowers" hosted papal executions, including philosopher Giordano Bruno in 1600 for heresy (he proposed infinite worlds). His hooded statue now dominates the square, facing the Vatican in eternal accusation. The morning market has operated continuously since 1869.',
    culturalSignificance: 'The square embodies Rome\'s contradictions: sacred and profane, historical and hedonistic. By day, a lively food market; by night, Rome\'s most boisterous bar scene. The lack of a church (unusual for Rome) stems from its association with executions.',
    architecturalNotes: 'Unlike designed piazzas, Campo de\' Fiori evolved organically. Palazzo Farnese (now French Embassy) nearby represents High Renaissance architecture at its finest, designed by Antonio da Sangallo and Michelangelo. The underground Pompey\'s Theatre ruins are where Caesar was assassinated.',
    localTip: 'Shop the market before 10 AM for the best produce. Forno Campo de\' Fiori sells Rome\'s finest pizza bianca (since 1960). At night, skip the tourist bars and walk to the sophisticated Roscioli Salumeria for natural wines and exquisite cured meats.',
    challengeType: 'taste',
    difficulty: 'moderate',
    estimatedTime: '35 min',
    points: 110,
    coordinates: { lat: 41.8956, lng: 12.4722 },
    mapPosition: { x: 38, y: 55 },
    imageUrl: 'https://images.unsplash.com/photo-1549464694-5c6c3b4c6156?w=800&q=80',
    resources: [
      { title: 'Giordano Bruno and the Infinite Universe', url: 'https://plato.stanford.edu/entries/bruno/', type: 'article' },
      { title: 'The Swerve: How the World Became Modern', url: 'https://www.goodreads.com/book/show/10352002-the-swerve', type: 'book' },
      { title: 'Philosophy and Rome\'s Campo de\' Fiori', url: 'https://www.youtube.com/watch?v=example', type: 'podcast' },
    ],
    triviaQuestions: [
      {
        question: 'Why was Giordano Bruno executed in Campo de\' Fiori?',
        options: ['Murder', 'Theft', 'Heresy (philosophical ideas)', 'Political conspiracy'],
        correctIndex: 2,
        explanation: 'Bruno proposed heliocentrism and infinite worlds. The Inquisition condemned him as a heretic and burned him alive in 1600.',
      },
      {
        question: 'What happened to Julius Caesar near Campo de\' Fiori?',
        options: ['He gave speeches', 'He was assassinated in Pompey\'s Theatre', 'He built a temple', 'He held markets'],
        correctIndex: 1,
        explanation: 'The Theatre of Pompey, where Caesar was stabbed 23 times on the Ides of March 44 BC, lies beneath the modern streets here.',
      },
      {
        question: 'What is pizza bianca?',
        options: ['Pizza with white sauce', 'Flatbread with olive oil and salt', 'Cheese-only pizza', 'Pizza with white truffles'],
        correctIndex: 1,
        explanation: 'Rome\'s iconic street food - crispy, olive oil-brushed flatbread sold by weight. Simple perfection.',
      },
    ],
  },
  {
    id: 'castel-santangelo',
    name: 'Castel Sant\'Angelo',
    era: '135 AD (converted 5th century)',
    historicalContext: 'Built as Emperor Hadrian\'s mausoleum, it became a fortress when Rome fell. The name derives from Pope Gregory I\'s vision of Archangel Michael sheathing his sword atop the structure, signaling the end of plague in 590 AD. It served as papal refuge during the Sack of Rome (1527).',
    culturalSignificance: 'The castle embodies Rome\'s layered history: imperial tomb, medieval fortress, papal prison (Benvenuto Cellini escaped from here), papal apartments, and now museum. The Passetto di Borgo - secret elevated corridor to the Vatican - enabled papal escapes.',
    architecturalNotes: 'The original cylindrical mausoleum was clad in white marble with a garden roof. The spiral ramp inside dates to Hadrian. Medieval additions include the defensive bastions, while Renaissance popes added luxurious apartments. The bronze angel statue (1753) is the sixth version.',
    localTip: 'Visit at sunset for stunning views from the terrace - the dome of St. Peter\'s glows gold. The castle appears dramatically in Puccini\'s opera Tosca; imagine her fatal leap as you overlook the Tiber.',
    challengeType: 'trivia',
    difficulty: 'challenging',
    estimatedTime: '40 min',
    points: 140,
    coordinates: { lat: 41.9031, lng: 12.4663 },
    mapPosition: { x: 18, y: 25 },
    imageUrl: 'https://images.unsplash.com/photo-1648994404203-73a22e295ece?w=800&q=80',
    resources: [
      { title: 'Hadrian\'s Mausoleum to Papal Fortress', url: 'https://www.rome.net/castel-sant-angelo', type: 'article' },
      { title: 'Puccini\'s Tosca and Castel Sant\'Angelo', url: 'https://www.youtube.com/watch?v=example', type: 'video' },
      { title: 'The Autobiography of Benvenuto Cellini', url: 'https://www.goodreads.com/book/show/682393.Autobiography', type: 'book' },
    ],
    triviaQuestions: [
      {
        question: 'Who originally built Castel Sant\'Angelo?',
        options: ['Pope Gregory I', 'Emperor Hadrian', 'Constantine', 'Michelangelo'],
        correctIndex: 1,
        explanation: 'Hadrian built it as his family mausoleum, completed in 139 AD. It held the remains of emperors until Caracalla.',
      },
      {
        question: 'What is the Passetto di Borgo?',
        options: ['A wine cellar', 'Secret corridor to the Vatican', 'Underground prison', 'Ancient aqueduct'],
        correctIndex: 1,
        explanation: 'This 800-meter elevated corridor allowed popes to flee to the castle\'s safety. Pope Clement VII used it during the 1527 Sack of Rome.',
      },
      {
        question: 'In which opera does the heroine leap from Castel Sant\'Angelo?',
        options: ['La Traviata', 'Tosca', 'Aida', 'Carmen'],
        correctIndex: 1,
        explanation: 'In Puccini\'s Tosca, the heroine leaps to her death from the castle ramparts after her lover\'s execution.',
      },
    ],
  },
];

export const getChallengeTypeLabel = (type: Quest['challengeType']): string => {
  const labels: Record<Quest['challengeType'], string> = {
    trivia: 'Historical Quiz',
    photo: 'Photo Challenge',
    explore: 'Guided Exploration',
    taste: 'Culinary Discovery',
    decode: 'Architectural Decode',
  };
  return labels[type];
};

export const getDifficultyColor = (difficulty: Quest['difficulty']): string => {
  const colors: Record<Quest['difficulty'], string> = {
    moderate: '#22C55E',
    challenging: '#F59E0B',
    expert: '#EF4444',
  };
  return colors[difficulty];
};
