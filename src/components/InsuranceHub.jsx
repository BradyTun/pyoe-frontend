import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Shield,
  Eye,
  Banknote,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Wifi,
  Lock,
  Users,
  Building,
  TrendingUp,
  Activity,
  Zap,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockFarmData, insuranceStatuses, insuranceMonitoring } from '../mockData';
import { useAppContext } from '../AppContext';

const InsuranceHub = () => {
  const { insuranceState } = useAppContext();
  const { t } = useTranslation();

  const phases = [
    { key: 'monitoring', icon: Eye, label: t('liveMonitoring'), description: t('monitoringDesc') || 'Real-time weather monitoring' },
    { key: 'eventDetected', icon: AlertCircle, label: t('eventDetected'), description: t('eventDesc') || 'Risk event detected' },
    { key: 'automaticDisbursement', icon: Banknote, label: t('automaticDisbursement'), description: t('disbursementDesc') || 'Automatic payout initiated' },
  ];

  const getPhaseStatus = (phase) => {
    const current = mockFarmData.insuranceStatus;
    if (phase === current) return 'current';
    if (phases.findIndex(p => p.key === phase) < phases.findIndex(p => p.key === current)) return 'completed';
    return 'pending';
  };

  const getPhaseColor = (status) => {
    switch (status) {
      case 'completed': return 'from-green-400 to-green-600';
      case 'current': return 'from-emerald-400 to-emerald-600';
      case 'pending': return 'from-slate-300 to-slate-500';
      default: return 'from-slate-300 to-slate-500';
    }
  };

  const getPhaseBgColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'current': return 'bg-emerald-50 border-emerald-200';
      case 'pending': return 'bg-slate-50 border-slate-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const renderPartnerIcon = (iconName) => {
    const iconProps = { className: "w-6 h-6 text-white" };
    switch (iconName) {
      case 'Shield': return <Shield {...iconProps} />;
      case 'Building': return <Building {...iconProps} />;
      default: return <Shield {...iconProps} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="max-w-md mx-auto p-4 space-y-8 md:max-w-6xl md:p-6">
        {/* Hero Section */}
        <motion.div
          className="text-center py-8 md:py-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 burmese-text leading-tight">
            {t('smartInsurance')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto burmese-text leading-relaxed">
            {t('insuranceDescription') || 'Protect your crops with AI-powered weather monitoring and automatic insurance payouts'}
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {t('active')}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {insuranceState.policy.coverage.toLocaleString()} MMK
            </h3>
            <p className="text-gray-600 burmese-text">{t('coverageAmount')}</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-medium text-green-600">{t('live')}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {insuranceState.telemetry.nearestStation}
            </h3>
            <p className="text-gray-600 burmese-text">{t('monitoringActive')}</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {insuranceState.partners.length} {t('partners')}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {t('verified')}
            </h3>
            <p className="text-gray-600 burmese-text">{t('trustedPartners')}</p>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Monitoring Status */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-emerald-100 rounded-xl mr-4">
                <Eye className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 burmese-text">{t('liveMonitoring')}</h2>
                <p className="text-gray-600 burmese-text">{t('realTimeProtection')}</p>
              </div>
            </div>

            <div className="space-y-4">
              {phases.map((phase, index) => {
                const status = getPhaseStatus(phase.key);
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={phase.key}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${getPhaseBgColor(status)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getPhaseColor(status)} shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 burmese-text">{phase.label}</h3>
                        <p className="text-sm text-gray-600 burmese-text">{phase.description}</p>
                        {status === 'current' && (
                          <div className="flex items-center mt-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping mr-2"></div>
                            <span className="text-sm font-medium text-emerald-600">{t('inProgress')}</span>
                          </div>
                        )}
                      </div>
                      {status === 'completed' && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Telemetry & Location */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 burmese-text">{t('liveTelemetry')}</h2>
                <p className="text-gray-600 burmese-text">{t('locationTracking')}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 burmese-text">{t('currentLocation')}</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                    <Wifi className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <p className="text-lg font-mono text-blue-700">
                  {insuranceState.telemetry.gpsLocation.lat.toFixed(4)}, {insuranceState.telemetry.gpsLocation.lng.toFixed(4)}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 burmese-text">{t('weatherStation')}</span>
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-green-700 burmese-text">
                  {insuranceState.telemetry.nearestStation}
                </p>
                <p className="text-sm text-green-600">{insuranceState.telemetry.distance} {t('away')}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 burmese-text">{t('monitoringStatus')}</span>
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                  <span className="text-lg font-semibold text-purple-700 burmese-text">{t('active')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partners Section */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 burmese-text">{t('trustedPartners')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto burmese-text">
              {t('partnersDescription') || 'Working with verified insurance providers to ensure your protection'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceState.partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg">
                    {renderPartnerIcon(partner.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 burmese-text">{partner.name}</h3>
                    <p className="text-gray-600 burmese-text">{partner.role}</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600 font-medium">{t('verified')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Policy Details */}
        <motion.div
          className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 burmese-text">{t('policyDetails')}</h2>
            <p className="text-emerald-100 burmese-text">
              {t('policyDescription') || 'Your comprehensive crop insurance coverage details'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Banknote className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-semibold burmese-text">{t('coverage')}</h3>
              </div>
              <p className="text-3xl font-bold mb-2">{insuranceState.policy.coverage.toLocaleString()} MMK</p>
              <p className="text-emerald-100 burmese-text">{t('maximumPayout')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-semibold burmese-text">{t('triggers')}</h3>
              </div>
              <ul className="space-y-2">
                {insuranceState.policy.triggers.map((trigger, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-300" />
                    <span className="burmese-text">{trigger}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Security Footer */}
        <motion.div
          className="bg-gray-900 text-white rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-2xl font-bold mb-4 burmese-text">{t('securityPrivacy')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center justify-center">
              <Shield className="w-5 h-5 mr-3 text-green-400" />
              <span className="burmese-text">{t('sslEncryption')}</span>
            </div>
            <div className="flex items-center justify-center">
              <Users className="w-5 h-5 mr-3 text-blue-400" />
              <span className="burmese-text">{t('partnerVerification')}</span>
            </div>
            <div className="flex items-center justify-center">
              <Lock className="w-5 h-5 mr-3 text-purple-400" />
              <span className="burmese-text">{t('dataProtection')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InsuranceHub;