import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cloud, Shield, Camera, MessageCircle, TrendingUp, AlertTriangle, CheckCircle, CreditCard, Calendar, BookOpen, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockFarmData, subscriptionData } from '../mockData';
import { useAppContext } from '../AppContext';

const Dashboard = ({ onNavigate }) => {
  const { subscriptionState } = useAppContext();
  const { t, i18n } = useTranslation();

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
      className="p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md mx-auto space-y-6">
        {/* Trust Banner */}
        <motion.div
          className="bg-primary text-white p-4 rounded-2xl text-center font-medium burmese-text leading-relaxed shadow-soft"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>{t('trustBanner')}</span>
          </div>
        </motion.div>

        {/* Renewal Notification */}
        {isRenewalDue() && (
          <motion.div
            className="bg-accent-warning/10 border border-accent-warning/30 p-4 rounded-2xl shadow-soft"
            variants={itemVariants}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-accent-warning" />
                <span className="font-semibold text-accent-warning/80 burmese-text leading-relaxed">{t('renewalNotification')}</span>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold burmese-text leading-relaxed shadow-soft hover:bg-primary-dark transition-colors">
                {t('quickPay')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Subscription Ledger - HIGHLIGHTED */}
        <motion.div
          className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-8 rounded-3xl shadow-2xl overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight burmese-text leading-relaxed">
                    {t('subscriptionLedger')}
                  </h2>
                  <p className="text-emerald-100 text-sm burmese-text leading-relaxed">
                    {t('premiumManagement')}
                  </p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                subscriptionState.status === 'active'
                  ? 'bg-white/20 backdrop-blur-sm border border-white/30'
                  : 'bg-orange-500/80 backdrop-blur-sm'
              }`}>
                {subscriptionState.status === 'active' ? '✓ ACTIVE' : subscriptionState.status.toUpperCase()}
              </div>
            </div>

            {/* Payment Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-white" />
                  <p className="text-sm text-white/80 font-medium burmese-text leading-relaxed">{t('nextPayment')}</p>
                </div>
                <p className="text-xl font-bold text-white burmese-text leading-relaxed">
                  {subscriptionState.nextPayment.date}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <p className="text-sm text-white/80 font-medium burmese-text leading-relaxed">{t('premiumAmount')}</p>
                </div>
                <p className="text-xl font-bold text-white burmese-text leading-relaxed">
                  {subscriptionState.nextPayment.amount.toLocaleString()} MMK
                </p>
              </div>
            </div>

            {/* Coverage Status - Highlighted */}
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-white" />
                  <span className="text-lg font-bold text-white burmese-text leading-relaxed">{t('coverageStatus')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-lg font-bold text-white burmese-text leading-relaxed">
                    {subscriptionState.coverageStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <motion.button
              className="w-full mt-6 bg-white text-emerald-600 py-4 px-6 rounded-2xl font-bold text-lg burmese-text leading-relaxed shadow-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('manageSubscription') || 'Manage Subscription'}
            </motion.button>
          </div>
        </motion.div>

        {/* Climate Risk Assessment */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-soft"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Cloud className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-bold burmese-text leading-relaxed">{t('climateRisk')}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent-success rounded-full animate-pulse"></div>
              <span className="text-sm text-text-light burmese-text leading-relaxed">{t('live')}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center space-x-3">
                <Cloud className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{t('rainProbability')}</p>
                  <p className="text-sm text-text-light burmese-text leading-relaxed">{t('next3days')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">85%</p>
                <p className="text-sm text-text-light burmese-text leading-relaxed">{t('high')}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-accent-warning" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{t('temperature')}</p>
                  <p className="text-sm text-text-light burmese-text leading-relaxed">{t('today')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent-warning">32°C</p>
                <p className="text-sm text-text-light burmese-text leading-relaxed">{t('normal')}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{t('windSpeed')}</p>
                  <p className="text-sm text-text-light burmese-text leading-relaxed">{t('today')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-500">15 km/h</p>
                <p className="text-sm text-text-light burmese-text leading-relaxed">{t('normal')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Farm Status */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-soft"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Cloud className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-bold burmese-text leading-relaxed">{t('liveFarmStatus')}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent-success rounded-full animate-pulse"></div>
              <span className="text-sm text-text-light burmese-text leading-relaxed">{t('live')}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center space-x-3">
                <Cloud className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{i18n.language === 'my' ? 'မိုးရေချိန်' : 'Rainfall'}</p>
                  <p className="text-sm text-text-light burmese-text leading-relaxed">{i18n.language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-500">{mockFarmData.weatherData.currentRainfall} mm</p>
                <p className="text-sm text-text-light burmese-text leading-relaxed">{i18n.language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-accent-warning" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{i18n.language === 'my' ? 'အပူချိန်' : 'Temperature'}</p>
                  <p className="text-sm text-text-light burmese-text leading-relaxed">{i18n.language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent-warning">{mockFarmData.weatherData.temperature}°C</p>
                <p className="text-sm text-text-light burmese-text leading-relaxed">{i18n.language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold burmese-text leading-relaxed">{i18n.language === 'my' ? 'စိုထိုင်းဆ' : 'Humidity'}</p>
                  <p className="text-sm text-text-light burmese-text leading-relaxed">{i18n.language === 'my' ? 'ယနေ့' : 'Today'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{mockFarmData.weatherData.humidity}%</p>
                <p className="text-sm text-text-light burmese-text leading-relaxed">{i18n.language === 'my' ? 'သာမာန်' : 'Normal'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ad Banner Placeholder */}
        <motion.div
          className="bg-gray-200 p-6 rounded-2xl shadow-soft flex items-center justify-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 font-semibold">Advertisement Banner</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
          <motion.button
            className="bg-primary text-white p-6 rounded-2xl shadow-soft flex flex-col items-center justify-center space-y-2 h-28 hover:bg-primary-dark transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <Camera className="w-8 h-8" />
            <span className="font-semibold burmese-text leading-relaxed text-center">{t('scanCropDisease')}</span>
          </motion.button>
          <motion.button
            className="bg-white text-text-main p-6 rounded-2xl shadow-soft flex flex-col items-center justify-center space-y-2 h-28 hover:shadow-lifted transition-shadow"
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-8 h-8" />
            <span className="font-semibold burmese-text leading-relaxed text-center">{t('askExpert')}</span>
          </motion.button>
        </motion.div>

        {/* Navigation to other sections */}
        <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
          <motion.button
            onClick={() => onNavigate('insurance')}
            className="bg-white p-4 rounded-2xl shadow-soft flex flex-col items-center justify-center space-y-2 h-28 hover:shadow-lifted transition-shadow"
            whileTap={{ scale: 0.98 }}
          >
            <Shield className="w-7 h-7 text-primary" />
            <span className="text-sm font-semibold burmese-text leading-relaxed text-center">{t('smartInsurance')}</span>
            <span className="text-xs text-text-light font-normal burmese-text leading-relaxed text-center">{i18n.language === 'my' ? 'အာမခံခြင်း' : 'Protection'}</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('academy')}
            className="bg-white p-4 rounded-2xl shadow-soft flex flex-col items-center justify-center space-y-2 h-28 hover:shadow-lifted transition-shadow"
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="w-7 h-7 text-primary" />
            <span className="text-sm font-semibold burmese-text leading-relaxed text-center">{t('knowledgeAcademy')}</span>
            <span className="text-xs text-text-light font-normal burmese-text leading-relaxed text-center">{i18n.language === 'my' ? 'လေ့လာရန်' : 'Learn'}</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('market')}
            className="bg-white p-4 rounded-2xl shadow-soft flex flex-col items-center justify-center space-y-2 h-28 hover:shadow-lifted transition-shadow"
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-7 h-7 text-primary" />
            <span className="text-sm font-semibold burmese-text leading-relaxed text-center">{t('marketConnection')}</span>
            <span className="text-xs text-text-light font-normal burmese-text leading-relaxed text-center">{i18n.language === 'my' ? 'ရောင်းချရန်' : 'Sell'}</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;