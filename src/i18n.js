import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: 'my', // Default language on first start
    fallbackLng: 'my',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          dashboard: 'Dashboard',
          insurance: 'Insurance',
          academy: 'Academy',
          market: 'Market',
          profile: 'Profile',
          climateRisk: 'Climate Risk Level',
          safe: 'Safe',
          warning: 'Warning',
          critical: 'Critical',
          liveFarmStatus: 'Live Farm Status',
          scanCropDisease: 'Scan Crop Disease',
          askExpert: 'Ask Expert',
          smartInsurance: 'Smart Insurance',
          liveMonitoring: 'Live Monitoring',
          eventDetected: 'Event Detected',
          automaticDisbursement: 'Automatic Disbursement',
          policyDetail: 'Policy Detail',
          coverageLimits: 'Coverage Limits',
          activeTriggers: 'Active Weather Triggers',
          knowledgeAcademy: 'Knowledge Academy',
          cropRecommendations: 'Crop Recommendations',
          aiDiagnosis: 'AI Diagnosis',
          marketConnection: 'Market Connection',
          verifiedBuyers: 'Verified Buyers',
          emergencySell: 'Emergency Sell',
          trustBanner: 'Backed by Professional Insurance Partners',
          lastSync: 'Last sync: 2 minutes ago',
          subscriptionLedger: 'Subscription Ledger',
          nextPayment: 'Next Payment',
          premiumAmount: 'Premium Amount',
          coverageStatus: 'Coverage Status',
          renewalNotification: 'Renewal Due Soon',
          quickPay: 'Quick Pay',
          paymentHistory: 'Payment History',
          blogFeed: 'For You',
          readTime: 'min read',
          diseaseDatabase: 'Disease Database',
          liveTelemetry: 'Live Telemetry',
          monitoringActive: 'Monitoring Active',
          verifiedPartner: 'Verified Partner',
          securityPrivacy: 'Security & Privacy',
          sslEncryption: 'SSL Encryption',
          partnerVerification: 'Partner Verification',
          floodRiskDetails: 'Flood Risk Alert',
          floodRiskDesc: 'Heavy rainfall expected in your area. Rivers may overflow.',
          floodRiskAction: 'Prepare emergency supplies and monitor water levels.',
          droughtRiskDetails: 'Drought Risk Alert',
          droughtRiskDesc: 'Extended dry period detected. Water conservation recommended.',
          droughtRiskAction: 'Implement water-saving irrigation techniques.',
          live: 'Live',
          rainProbability: 'Rain Probability',
          next3days: 'Next 3 days',
          high: 'High',
          temperature: 'Temperature',
          today: 'Today',
          normal: 'Normal',
          windSpeed: 'Wind Speed',
          currentLocation: 'Current Location:',
          nearestWeatherStation: 'Nearest Weather Station:',
          monitoringStatus: 'Monitoring Status:',
          trustedPartners: 'Trusted Partners',
          active: 'Active',
          searchArticles: 'Search articles...',
          all: 'All',
          climate: 'Climate',
          marketTrends: 'Market Trends',
          successStories: 'Success Stories',
          symptoms: 'Symptoms:',
          treatment: 'Treatment:',
          pointCamera: 'Point camera at crop to scan',
          scanning: 'Scanning...',
        }
      },
      my: {
        translation: {
          // General
          dashboard: 'ပင်မစာမျက်နှာ',
          insurance: 'အာမခံ',
          academy: 'ဗဟုသုတ',
          market: 'ဈေးကွက်',
          profile: 'ပရိုဖိုင်',
          live: 'တိုက်ရိုက်',
          active: 'အသက်ဝင်နေသည်',
          today: 'ယနေ့',
          normal: 'ပုံမှန်',
          high: 'မြင့်မား',
          all: 'အားလုံး',
          readTime: 'မိနစ်စာ',

          // Trust & Security
          trustBanner: 'ကျွမ်းကျင်အာမခံမိတ်ဖက်များမှ အကာအကွယ်ပေးထားသည်',
          trustedPartners: 'ယုံကြည်စိတ်ချရသော မိတ်ဖက်များ',
          verifiedPartner: 'အတည်ပြုပြီး မိတ်ဖက်',
          securityPrivacy: 'လုံခြုံရေးနှင့် ကိုယ်ရေးအချက်အလက်',
          sslEncryption: 'SSL Encryption ဖြင့် လုံခြုံသည်',
          partnerVerification: 'မိတ်ဖက်စိစစ်မှု',
          dataProtection: 'ဒေတာကာကွယ်မှု',

          // Dashboard
          scanCropDisease: 'AI ဖြင့် သီးနှံရောဂါစစ်ဆေးရန်',
          askExpert: 'ကျွမ်းကျင်သူနှင့် ဆွေးနွေးရန်',
          climateRisk: 'ရာသီဥတုအန္တရာယ်အဆင့်',
          safe: 'စိတ်ချရ',
          warning: 'သတိပြုရန်',
          critical: 'အရေးကြီး',
          liveFarmStatus: 'ခြံ၏ တိုက်ရိုက်အခြေအနေ',
          rainProbability: 'မိုးရွာနိုင်ခြေ',
          next3days: 'နောက် ၃ ရက်',
          temperature: 'အပူချိန်',
          windSpeed: 'လေတိုက်နှုန်း',

          // Subscription
          subscriptionLedger: 'အာမခံ ပရီမီယံမှတ်တမ်း',
          premiumManagement: 'သင်၏ ပရီမီယံကြေး စီမံခန့်ခွဲရန်',
          nextPayment: 'နောက်တစ်ကြိမ် ပေးချေရန်',
          premiumAmount: 'ပရီမီယံ ပမာဏ',
          coverageStatus: 'အာမခံ အကျုံးဝင်မှု',
          renewalNotification: 'သက်တမ်းတိုးရန် နီးကပ်နေပါပြီ',
          quickPay: 'အမြန်ငွေပေးချေရန်',
          manageSubscription: 'အာမခံ စီမံခန့်ခွဲရန်',

          // Insurance Hub
          smartInsurance: 'စမတ်အာမခံ',
          insuranceDescription: 'AI စနစ်သုံး ရာသီဥတုစောင့်ကြည့်မှုနှင့် အလိုအလျောက် အာမခံလျော်ကြေးပေးချေမှုများဖြင့် သင်၏သီးနှံများကို ကာကွယ်ပါ။',
          coverageAmount: 'အာမခံပမာဏ',
          liveMonitoring: 'တိုက်ရိုက်စောင့်ကြည့်မှု',
          realTimeProtection: 'အချိန်နှင့်တပြေးညီ ကာကွယ်မှု',
          monitoringDesc: 'ရာသီဥတုကို အချိန်နှင့်တပြေးညီ စောင့်ကြည့်နေသည်',
          eventDetected: 'အန္တရာယ်ဖြစ်စဉ်တွေ့ရှိ',
          eventDesc: 'အာမခံလျော်ကြေးအတွက် ဖြစ်စဉ်ကို တွေ့ရှိပါသည်',
          automaticDisbursement: 'အလိုအလျောက်လျော်ကြေးပေးချေခြင်း',
          disbursementDesc: 'လျော်ကြေးငွေကို အလိုအလျောက် ပေးချေပါမည်',
          inProgress: 'ဆောင်ရွက်နေသည်',
          liveTelemetry: 'တိုက်ရိုက် အချက်အလက်များ',
          locationTracking: 'တည်နေရာနှင့် ရာသီဥတု အချက်အလက်',
          currentLocation: 'လက်ရှိတည်နေရာ',
          weatherStation: 'ရာသီဥတုစခန်း',
          away: 'အကွာ',
          monitoringStatus: 'စောင့်ကြည့်မှု အခြေအနေ',
          partnersDescription: 'သင်၏အကာအကွယ်ကို သေချာစေရန် အတည်ပြုပြီးသော အာမခံကုမ္ပဏီများနှင့် လက်တွဲဆောင်ရွက်ပါသည်။',
          policyDetails: 'အာမခံအသေးစိတ်',
          policyDescription: 'သင်၏ ပြည့်စုံသော သီးနှံအာမခံ အကျုံးဝင်မှု အသေးစိတ်',
          coverage: 'အကျုံးဝင်မှု',
          maximumPayout: 'အများဆုံးပေးလျော်နိုင်မှု',
          triggers: 'လျော်ကြေးပေးရန် အချက်များ',

          // Knowledge Academy
          knowledgeAcademy: 'ဗဟုသုတကဏ္ဍ',
          searchArticles: 'ဆောင်းပါးများ ရှာဖွေရန်...',
          climate: 'ရာသီဥတု',
          marketTrends: 'ဈေးကွက်လမ်းကြောင်း',
          successStories: 'အောင်မြင်မှု ဇာတ်လမ်းများ',
          blogFeed: 'သင့်အတွက်',
          diseaseDatabase: 'ရောဂါဒေတာဘေ့စ်',
          symptoms: 'ရောဂါလက္ခဏာများ:',
          treatment: 'ကုသရန်နည်းလမ်းများ:',

          // Market Connection
          marketConnection: 'ဈေးကွက်ချိတ်ဆက်မှု',
          verifiedBuyers: 'အတည်ပြုပြီး ဝယ်လက်များ',
          emergencySell: 'အရေးပေါ် ရောင်းချရန်',
          pointCamera: 'သီးနှံကို စစ်ဆေးရန် ကင်မရာဖြင့်ချိန်ရွယ်ပါ',
          scanning: 'စစ်ဆေးနေသည်...',

          // Profile
          personalInformation: 'ကိုယ်ရေးအချက်အလက်',
          updatePersonalDetails: 'သင်၏ ကိုယ်ရေးအချက်အလက်များကို ပြင်ဆင်ရန်',
          accountSettings: 'အကောင့်ဆက်တင်များ',
          manageAccountPreferences: 'သင်၏အကောင့် နှစ်သက်မှုများကို စီမံခန့်ခွဲရန်',
          securityPrivacyProfile: 'လုံခြုံရေးနှင့် ကိုယ်ရေးကိုယ်တာ',
          passwordPrivacySettings: 'စကားဝှက်၊ ကိုယ်ရေးကိုယ်တာ ဆက်တင်များ',
          paymentMethods: 'ငွေပေးချေမှုနည်းလမ်းများ',
          managePaymentOptions: 'ငွေပေးချေမှု ရွေးချယ်စရာများကို စီမံခန့်ခွဲရန်',
          notifications: 'အသိပေးချက်များ',
          customizeAlerts: 'သင်၏ သတိပေးချက်များကို စိတ်ကြိုက်ပြင်ဆင်ရန်',
          helpSupport: 'အကူအညီနှင့် ပံ့ပိုးမှု',
          getHelpContactSupport: 'အကူအညီရယူပြီး ပံ့ပိုးကူညီရေးဌာနသို့ ဆက်သွယ်ရန်',
          farmSize: 'ခြံအရွယ်အစား',
          memberSince: 'အဖွဲ့ဝင်ဖြစ်သည့်အချိန်',
          riskLevel: 'အန္တရာယ်အဆင့်',
          premiumStatus: 'ပရီမီယံအခြေအနေ',
          activeAccount: 'အသက်ဝင်နေသောအကောင့်',
          signOut: 'ထွက်ရန်',
        }
      },
    }
  });

export default i18n;
