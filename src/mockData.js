// mockData.js
export const weatherThresholds = {
  rainfallTrigger: 500, // mm
  droughtTrigger: 30, // days without rain
  floodTrigger: 1000, // mm in 24 hours
};

export const insuranceStatuses = {
  monitoring: 'monitoring',
  eventDetected: 'eventDetected',
  disbursing: 'disbursing',
  disbursed: 'disbursed',
};

export const mockFarmData = {
  climateRisk: 'warning', // safe, warning, critical
  lastSync: '2 minutes ago',
  riskDetails: {
    type: 'flood',
    title: 'Flood Risk Alert',
    titleMy: 'ရေကြီးအန္တရာယ် သတိပေးချက်',
    description: 'Heavy rainfall expected in your area. Rivers may overflow.',
    descriptionMy: 'သင့်ဒေသ၌ မိုးသည်းထန်စွာ ရွာသွန်းနိုင်သည်။ မြစ်များ ရေလွှမ်းမိုးနိုင်သည်။',
    action: 'Prepare emergency supplies and monitor water levels.',
    actionMy: 'အရေးပေါ် ကုန်စုံများကို ပြင်ဆင်ထားပြီး ရေမျက်နှာပြင်ကို စောင့်ကြည့်ပါ။',
    severity: 'moderate',
    expectedTime: '24-48 hours',
  },
  weatherData: {
    currentRainfall: 450, // mm
    temperature: 28, // C
    humidity: 75, // %
  },
  insuranceStatus: 'monitoring',
  policy: {
    coverage: 1000000, // MMK
    triggers: ['Rainfall > 500mm', 'Drought > 30 days'],
  },
};

export const cropRecommendations = [
  {
    id: 1,
    name: 'Rice',
    image: 'https://via.placeholder.com/150', // Replace with actual image
    description: 'High-yield variety suitable for monsoon season.',
  },
  {
    id: 2,
    name: 'Maize',
    image: 'https://via.placeholder.com/150',
    description: 'Drought-resistant crop for dry regions.',
  },
  // Add more
];

export const verifiedBuyers = [
  {
    id: 1,
    name: 'Myanmar Agri Corp',
    emergency: true,
    contact: '+95 123 456 789',
  },
  {
    id: 2,
    name: 'Green Valley Traders',
    emergency: false,
    contact: '+95 987 654 321',
  },
];

// New data structures for comprehensive platform
export const subscriptionData = {
  status: 'active', // active, expiring, overdue
  nextPayment: {
    date: '2026-04-15',
    amount: 15000, // MMK
  },
  coverageStatus: 'active',
  paymentHistory: [
    {
      id: 1,
      date: '2026-01-15',
      amount: 15000,
      type: 'premium',
      status: 'paid',
    },
    {
      id: 2,
      date: '2026-02-15',
      amount: 15000,
      type: 'premium',
      status: 'paid',
    },
    {
      id: 3,
      date: '2026-03-01',
      amount: 50000,
      type: 'disbursement',
      status: 'received',
    },
  ],
};

export const academyPosts = [
  {
    id: 1,
    title: 'How to Grow Rice in Drought Conditions',
    titleMy: 'ရေခန်းခြောက်သွေ့မှုများတွင် စပါးကို မည်ကဲ့သို့ စိုက်ပျိုးရမည်နည်း',
    category: 'Climate',
    categoryMy: 'ရာသီဥတု',
    readTime: 5,
    thumbnail: 'https://www.pccmarkets.com/wp-content/uploads/2018/02/farm-landscape-with-barn-1600.jpg',
    date: '2026-03-28',
    excerpt: 'Learn climate-smart techniques for rice cultivation...',
    excerptMy: 'စပါးစိုက်ပျိုးရေးအတွက် ရာသီဥတု-ဉာဏ်ကောင်းသော နည်းလမ်းများကို လေ့လာပါ...',
  },
  {
    id: 2,
    title: 'Market Price Trends for Maize',
    titleMy: 'ပြောင်းစပါးအတွက် စျေးနှုန်းလမ်းကြောင်းများ',
    category: 'MarketTrends',
    categoryMy: 'စျေးကွက်လမ်းကြောင်းများ',
    readTime: 3,
    thumbnail: 'https://www.pccmarkets.com/wp-content/uploads/2018/02/farm-landscape-with-barn-1600.jpg',
    date: '2026-03-27',
    excerpt: 'Current market analysis for maize prices...',
    excerptMy: 'ပြောင်းစပါးစျေးနှုန်းများအတွက် လက်ရှိ စျေးကွက် ခွဲခြမ်းစိတ်ဖြာခြင်း...',
  },
  {
    id: 3,
    title: 'Success Story: From Flood to Fortune',
    titleMy: 'တာလီးရေကြီးမှ ကြွယ်ဝမှုသို့',
    category: 'SuccessStories',
    categoryMy: 'အောင်မြင်မှုဇာတ်လမ်းများ',
    readTime: 7,
    thumbnail: 'https://www.pccmarkets.com/wp-content/uploads/2018/02/farm-landscape-with-barn-1600.jpg',
    date: '2026-03-26',
    excerpt: 'How one farmer recovered from flood damage...',
    excerptMy: 'တာလီးရေကြီးထိခိုက်မှုမှ တစ်ဦးဦးက ကျေးလက်လယ်သမားက မည်ကဲ့သို့ ပြန်လည်ထူထောင်ခဲ့သည်...',
  },
];

export const diseaseDatabase = [
  {
    id: 1,
    name: 'Rice Blast',
    nameMy: 'စပါးပေါက်ရောဂါ',
    symptoms: 'Lesions on leaves and stems',
    symptomsMy: 'အရွက်များနှင့် အမြစ်များပေါ်တွင် ဒဏ်ရာများ',
    treatment: 'Fungicide application',
    treatmentMy: 'ပိုးသတ်ဆေးအသုံးပြုခြင်း',
    prevention: 'Proper field drainage',
    preventionMy: 'လယ်ကွင်းကောင်းမွန်သော ရေစီးဆင်းမှု',
  },
  {
    id: 2,
    name: 'Maize Borer',
    nameMy: 'ပြောင်းစပါးကောက်ရောဂါ',
    symptoms: 'Holes in stems and ears',
    symptomsMy: 'အမြစ်များနှင့် နားရွက်များပေါ်တွင် ပေါက်များ',
    treatment: 'Insecticide spray',
    treatmentMy: 'ပိုးသတ်ဆေးပြန်ခြင်း',
    prevention: 'Crop rotation',
    preventionMy: 'ပင်မျိုးလှည့်လည်စိုက်ပျိုးခြင်း',
  },
];

export const insuranceMonitoring = {
  isActive: true,
  monitoringSince: '2026-01-01',
  telemetry: {
    gpsLocation: { lat: 21.9162, lng: 95.9560 }, // Sample Myanmar coordinates
    nearestStation: 'Mandalay Weather Station',
    distance: '15 km',
  },
  policy: {
    coverage: 1000000, // MMK
    triggers: ['Rainfall > 500mm', 'Drought > 30 days'],
  },
  partners: [
    {
      id: 1,
      name: 'Myanmar Insurance Corporation',
      role: 'Primary Insurance Provider',
      verified: true,
      icon: 'Shield',
    },
    {
      id: 2,
      name: 'AgriProtect Myanmar',
      role: 'Agricultural Risk Specialist',
      verified: true,
      icon: 'Building',
    },
  ],
};