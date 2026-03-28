import React from 'react';
import { Cloud, Shield, Camera, MessageCircle, TrendingUp, AlertTriangle, CheckCircle, CreditCard, Calendar } from 'lucide-react';
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
          className="bg-emerald-600 text-white p-3 rounded-3xl text-center font-semibold burmese-text leading-relaxed"
          variants={itemVariants}
        >
          {t.trustBanner}
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
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          variants={itemVariants}
        >
          <h2 className="text-lg font-semibold mb-4 tracking-tight burmese-text leading-relaxed">{t.subscriptionLedger}</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{t.nextPayment}:</span>
              <span className="font-semibold burmese-text leading-relaxed">{subscriptionState.nextPayment.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{t.premiumAmount}:</span>
              <span className="font-semibold burmese-text leading-relaxed">{subscriptionState.nextPayment.amount.toLocaleString()} MMK</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{t.coverageStatus}:</span>
              <span className="font-semibold text-emerald-600 burmese-text leading-relaxed">{subscriptionState.coverageStatus}</span>
            </div>
          </div>
        </motion.div>

        {/* Climate Risk Level */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          variants={itemVariants}
        >
          <h2 className="text-lg font-semibold mb-4 tracking-tight burmese-text leading-relaxed">{t.climateRisk}</h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {getRiskIcon(mockFarmData.climateRisk)}
            <span className={`text-2xl font-bold ${getRiskColor(mockFarmData.climateRisk)}`}>
              {t[mockFarmData.climateRisk]}
            </span>
          </div>
          {mockFarmData.climateRisk === 'safe' && (
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 40 Q30 20 40 30 Q50 40 60 30 Q70 20 80 30 Q90 40 100 30" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="35" r="3" fill="#059669" opacity="0.7"/>
                <circle cx="50" cy="25" r="2" fill="#059669" opacity="0.5"/>
                <circle cx="70" cy="35" r="4" fill="#059669" opacity="0.8"/>
                <circle cx="90" cy="25" r="2.5" fill="#059669" opacity="0.6"/>
                <path d="M15 50 L25 45 L35 50 L45 45 L55 50 L65 45 L75 50 L85 45 L95 50 L105 45" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.4"/>
              </svg>
            </motion.div>
          )}
          {mockFarmData.climateRisk === 'warning' && mockFarmData.riskDetails && (
            <motion.div
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800 burmese-text leading-relaxed mb-1">
                    {language === 'my' ? mockFarmData.riskDetails.titleMy || t.floodRiskDetails : mockFarmData.riskDetails.title}
                  </h3>
                  <p className="text-sm text-yellow-700 font-normal burmese-text leading-relaxed mb-2">
                    {language === 'my' ? mockFarmData.riskDetails.descriptionMy || t.floodRiskDesc : mockFarmData.riskDetails.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-yellow-600">
                    <span className="font-normal burmese-text leading-relaxed">
                      {language === 'my' ? 'မျှော်မှန်းချိန်:' : 'Expected:'} {mockFarmData.riskDetails.expectedTime}
                    </span>
                    <span className="font-normal burmese-text leading-relaxed">
                      {language === 'my' ? 'အဆင့်:' : 'Severity:'} {mockFarmData.riskDetails.severity}
                    </span>
                  </div>
                  <div className="mt-2 p-2 bg-yellow-100 rounded-lg">
                    <p className="text-xs text-yellow-800 font-normal burmese-text leading-relaxed">
                      {language === 'my' ? mockFarmData.riskDetails.actionMy || t.floodRiskAction : mockFarmData.riskDetails.action}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping-slow mr-2"></div>
            <p className="text-sm text-slate-600 font-normal burmese-text leading-relaxed">{t.lastSync}</p>
          </div>
        </motion.div>

        {/* Live Farm Status */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          variants={itemVariants}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center tracking-tight burmese-text leading-relaxed">
            <Cloud className="w-5 h-5 mr-2" />
            {t.liveFarmStatus}
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">Rainfall:</span>
              <span className="font-semibold">{mockFarmData.weatherData.currentRainfall} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">Temperature:</span>
              <span className="font-semibold">{mockFarmData.weatherData.temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">Humidity:</span>
              <span className="font-semibold">{mockFarmData.weatherData.humidity}%</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
          <motion.button
            className="bg-emerald-600 text-white p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-20"
            whileTap={{ scale: 0.98 }}
          >
            <Camera className="w-8 h-8" />
            <span className="font-semibold burmese-text leading-relaxed">{t.scanCropDisease}</span>
          </motion.button>
          <motion.button
            className="bg-slate-600 text-white p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-20"
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-8 h-8" />
            <span className="font-semibold burmese-text leading-relaxed">{t.askExpert}</span>
          </motion.button>
        </motion.div>

        {/* Navigation to other sections */}
        <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
          <motion.button
            onClick={() => onNavigate('insurance')}
            className="bg-white/80 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-20"
            whileTap={{ scale: 0.98 }}
          >
            <Shield className="w-6 h-6 text-emerald-600" />
            <span className="text-sm font-semibold burmese-text leading-relaxed">{t.smartInsurance}</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('academy')}
            className="bg-white/80 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-20"
            whileTap={{ scale: 0.98 }}
          >
            <Cloud className="w-6 h-6 text-emerald-600" />
            <span className="text-sm font-semibold burmese-text leading-relaxed">{t.knowledgeAcademy}</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('market')}
            className="bg-white/80 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-umbra flex flex-col items-center space-y-2 h-20"
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span className="text-sm font-semibold burmese-text leading-relaxed">{t.marketConnection}</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;