import React from 'react';
import { Shield, Eye, Zap, Banknote, CheckCircle, Clock, AlertCircle, MapPin, Wifi, Lock, Users, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations, mockFarmData, insuranceStatuses, insuranceMonitoring } from '../mockData';
import { useAppContext } from '../AppContext';

const InsuranceHub = ({ language = 'en' }) => {
  const { insuranceState } = useAppContext();
  const t = translations[language];

  const phases = [
    { key: 'monitoring', icon: Eye, label: t.liveMonitoring },
    { key: 'eventDetected', icon: AlertCircle, label: t.eventDetected },
    { key: 'automaticDisbursement', icon: Banknote, label: t.automaticDisbursement },
  ];

  const getPhaseStatus = (phase) => {
    const current = mockFarmData.insuranceStatus;
    if (phase === current) return 'current';
    if (phases.findIndex(p => p.key === phase) < phases.findIndex(p => p.key === current)) return 'completed';
    return 'pending';
  };

  const getPhaseColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'current': return 'text-emerald-600 bg-emerald-100';
      case 'pending': return 'text-slate-400 bg-slate-100';
      default: return 'text-slate-400 bg-slate-100';
    }
  };

  const getStepperIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'current': return <Clock className="w-5 h-5 animate-pulse" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-current"></div>;
    }
  };

  const renderPartnerIcon = (iconName) => {
    const iconProps = { className: "w-8 h-8 text-emerald-600" };
    switch (iconName) {
      case 'Shield':
        return <Shield {...iconProps} />;
      case 'Building':
        return <Building {...iconProps} />;
      default:
        return <Shield {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-fluid-xl font-semibold flex items-center tracking-tight burmese-text leading-relaxed">
            <Shield className="w-6 h-6 mr-2 text-emerald-600" />
            {t.smartInsurance}
          </h1>
        </motion.div>

        {/* Live Telemetry */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 flex items-center tracking-tight burmese-text leading-relaxed">
            <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
            {t.liveTelemetry}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'လက်ရှိတည်နေရာ:' : 'Current Location:'}</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping-slow mr-2"></div>
                <span className="font-normal burmese-text leading-relaxed">{insuranceState.telemetry.gpsLocation.lat.toFixed(4)}, {insuranceState.telemetry.gpsLocation.lng.toFixed(4)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'နီးစပ်သော ရာသီဥတု စခန်း:' : 'Nearest Weather Station:'}</span>
              <span className="font-normal burmese-text leading-relaxed">{insuranceState.telemetry.nearestStation} ({insuranceState.telemetry.distance})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'စောင့်ကြည့်ခြင်း အခြေအနေ:' : 'Monitoring Status:'}</span>
              <div className="flex items-center">
                <Wifi className="w-4 h-4 text-emerald-600 mr-1" />
                <span className="font-normal text-emerald-600 burmese-text leading-relaxed">{t.monitoringActive}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 tracking-tight burmese-text leading-relaxed">{language === 'my' ? 'ယုံကြည်စိတ်ချရသော မိတ်ဖက်များ' : 'Trusted Partners'}</h2>
          <div className="space-y-3">
            {insuranceState.partners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  {renderPartnerIcon(partner.icon)}
                  <span className="font-semibold burmese-text leading-relaxed">{partner.name}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-emerald-600 mr-1" />
                  <span className="text-xs text-emerald-600 font-normal burmese-text leading-relaxed">{t.verifiedPartner}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Monitoring Pulse */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 tracking-tight burmese-text leading-relaxed">{t.liveMonitoring}</h2>
          <div className="space-y-4">
            {phases.map((phase, index) => {
              const status = getPhaseStatus(phase.key);
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.key}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getPhaseColor(status)}`}>
                    {getStepperIcon(status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold burmese-text leading-relaxed">{phase.label}</span>
                    </div>
                    {status === 'current' && (
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping-slow mr-2"></div>
                        <span className="text-sm text-emerald-600 font-normal">Active</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Policy Detail */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 tracking-tight burmese-text leading-relaxed">{t.policyDetail}</h2>
          <div className="space-y-3">
            <div>
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{t.coverageLimits}:</span>
              <p className="text-emerald-600 font-semibold text-fluid-lg">{mockFarmData.policy.coverage.toLocaleString()} MMK</p>
            </div>
            <div>
              <span className="font-normal text-slate-600 burmese-text leading-relaxed">{t.activeTriggers}:</span>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {mockFarmData.policy.triggers.map((trigger, index) => (
                  <li key={index} className="text-sm font-normal burmese-text leading-relaxed">{trigger}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Security & Privacy Footer */}
        <motion.div
          className="bg-slate-50 border border-slate-200 p-4 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold text-slate-800 burmese-text leading-relaxed">{t.securityPrivacy}</h3>
          </div>
          <div className="space-y-1 text-sm text-slate-600 font-normal burmese-text leading-relaxed">
            <p>• {t.sslEncryption}</p>
            <p>• {t.partnerVerification}</p>
          </div>
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          className="bg-emerald-600 text-white p-3 rounded-3xl text-center font-semibold burmese-text leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {t.trustBanner}
        </motion.div>
      </div>
    </div>
  );
};

export default InsuranceHub;