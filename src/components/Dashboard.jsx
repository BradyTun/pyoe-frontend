import React from 'react';
import { Cloud, Shield, Camera, MessageCircle, TrendingUp, AlertTriangle, CheckCircle, CreditCard, Calendar, BookOpen, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations, mockFarmData, subscriptionData } from '../mockData';
import { useAppContext } from '../AppContext';

const Dashboard = ({ language = 'en', onNavigate }) => {
  const { subscriptionState } = useAppContext();
  const t = translations[language];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'safe': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'safe': return <CheckCircle className="w-6 h-6" />;
      case 'warning': return <AlertTriangle className="w-6 h-6" />;
      case 'critical': return <TrendingUp className="w-6 h-6" />;
      default: return <Cloud className="w-6 h-6" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const isRenewalDue = () => {
    const today = new Date();
    const paymentDate = new Date(subscriptionState.nextPayment.date);
    const diffTime = paymentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 5 && diffDays > 0;
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md mx-auto space-y-6">
        {/* Trust Banner */}
        <motion.div
          className="bg-emerald-600 text-white p-4 rounded-3xl text-center font-semibold burmese-text leading-relaxed shadow-umbra"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>{t.trustBanner}</span>
          </div>
        </motion.div>

        {/* Renewal Notification */}
        {isRenewalDue() && (
          <motion.div
            className="bg-yellow-50 border border-yellow-200 p-4 rounded-3xl shadow-umbra"
            variants={itemVariants}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800 burmese-text leading-relaxed">{t.renewalNotification}</span>
              </div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold burmese-text leading-relaxed">
                {t.quickPay}
              </button>
            </div>
          </motion.div>
        )}

        {/* Subscription Ledger */}
        <motion.div
          className="bg-white/90 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-umbra"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-emerald-600" />
              <h2 className="text-fluid-lg font-semibold tracking-tight burmese-text leading-relaxed">{t.subscriptionLedger}</h2>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              subscriptionState.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {subscriptionState.status}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-sm text-slate-600 font-normal burmese-text leading-relaxed mb-1">{t.nextPayment}</p>
              <p className="text-lg font-semibold burmese-text leading-relaxed">{subscriptionState.nextPayment.date}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-sm text-slate-600 font-normal burmese-text leading-relaxed mb-1">{t.premiumAmount}</p>
              <p className="text-lg font-semibold burmese-text leading-relaxed">{subscriptionState.nextPayment.amount.toLocaleString()} MMK</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-800 burmese-text leading-relaxed">{t.coverageStatus}</span>
              <span className="text-sm font-semibold text-emerald-600 burmese-text leading-relaxed">{subscriptionState.coverageStatus}</span>
            </div>
          </div>
        </motion.div>

        {/* Climate Risk Assessment */}
        <motion.div
          className="bg-white/90 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-umbra"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Cloud className="w-6 h-6 text-emerald-600" />
              <h2 className="text-lg font-bold burmese-text leading-relaxed">{t.climateRisk}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'လက်ရှိ' : 'Live'}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Cloud className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{language === 'my' ? 'မိုးရွာနိုင်ခြေ' : 'Rain Probability'}</p>
                  <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'နောက် ၃ ရက်' : 'Next 3 days'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">85%</p>
                <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'မြင့်မား' : 'High'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{language === 'my' ? 'အပူချိန်' : 'Temperature'}</p>
                  <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-600">32°C</p>
                <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{language === 'my' ? 'လေတိုက်နှုန်း' : 'Wind Speed'}</p>
                  <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">15 km/h</p>
                <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Farm Status */}
        <motion.div
          className="bg-white/90 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-umbra"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Cloud className="w-6 h-6 text-emerald-600" />
              <h2 className="text-lg font-bold burmese-text leading-relaxed">{t.liveFarmStatus}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'လက်ရှိ' : 'Live'}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Cloud className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{language === 'my' ? 'မိုးရေချိန်' : 'Rainfall'}</p>
                  <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{mockFarmData.weatherData.currentRainfall} mm</p>
                <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{language === 'my' ? 'အပူချိန်' : 'Temperature'}</p>
                  <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-600">{mockFarmData.weatherData.temperature}°C</p>
                <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{language === 'my' ? 'စိုထိုင်းဆ' : 'Humidity'}</p>
                  <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">{mockFarmData.weatherData.humidity}%</p>
                <p className="text-sm text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
          <motion.button
            className="bg-emerald-600 text-white p-6 rounded-3xl shadow-umbra flex flex-col items-center space-y-3 h-24 hover:bg-emerald-700 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <Camera className="w-8 h-8" />
            <span className="font-semibold burmese-text leading-relaxed text-center">{t.scanCropDisease}</span>
          </motion.button>
          <motion.button
            className="bg-slate-600 text-white p-6 rounded-3xl shadow-umbra flex flex-col items-center space-y-3 h-24 hover:bg-slate-700 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-8 h-8" />
            <span className="font-semibold burmese-text leading-relaxed text-center">{t.askExpert}</span>
          </motion.button>
        </motion.div>

        {/* Navigation to other sections */}
        <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
          <motion.button
            onClick={() => onNavigate('insurance')}
            className="bg-white/90 backdrop-blur-md border border-white/30 p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-24 hover:shadow-lg transition-shadow"
            whileTap={{ scale: 0.98 }}
          >
            <Shield className="w-7 h-7 text-emerald-600" />
            <span className="text-sm font-semibold burmese-text leading-relaxed text-center">{t.smartInsurance}</span>
            <span className="text-xs text-slate-600 font-normal burmese-text leading-relaxed text-center">{language === 'my' ? 'အာမခံခြင်း' : 'Protection'}</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('academy')}
            className="bg-white/90 backdrop-blur-md border border-white/30 p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-24 hover:shadow-lg transition-shadow"
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="w-7 h-7 text-emerald-600" />
            <span className="text-sm font-semibold burmese-text leading-relaxed text-center">{t.knowledgeAcademy}</span>
            <span className="text-xs text-slate-600 font-normal burmese-text leading-relaxed text-center">{language === 'my' ? 'လေ့လာရန်' : 'Learn'}</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('market')}
            className="bg-white/90 backdrop-blur-md border border-white/30 p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-24 hover:shadow-lg transition-shadow"
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-7 h-7 text-emerald-600" />
            <span className="text-sm font-semibold burmese-text leading-relaxed text-center">{t.marketConnection}</span>
            <span className="text-xs text-slate-600 font-normal burmese-text leading-relaxed text-center">{language === 'my' ? 'ရောင်းချရန်' : 'Sell'}</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;