import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  Settings,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Edit3,
  Star,
  Award,
  TrendingUp,
  Camera
} from 'lucide-react';
import { useAppContext } from '../AppContext';

const Profile = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const { setIsLoggedIn } = useAppContext();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const profileSections = [
    {
      id: 'personal',
      icon: User,
      title: t('personalInformation'),
      subtitle: t('updatePersonalDetails'),
      color: 'from-blue-500 to-blue-600',
      action: () => onNavigate && onNavigate('personal-info')
    },
    {
      id: 'account',
      icon: Settings,
      title: t('accountSettings'),
      subtitle: t('manageAccountPreferences'),
      color: 'from-purple-500 to-purple-600',
      action: () => onNavigate && onNavigate('account-settings')
    },
    {
      id: 'security',
      icon: Shield,
      title: t('securityPrivacyProfile'),
      subtitle: t('passwordPrivacySettings'),
      color: 'from-green-500 to-green-600',
      action: () => onNavigate && onNavigate('security-privacy')
    },
    {
      id: 'payment',
      icon: CreditCard,
      title: t('paymentMethods'),
      subtitle: t('managePaymentOptions'),
      color: 'from-orange-500 to-orange-600',
      action: () => onNavigate && onNavigate('payment-methods')
    },
    {
      id: 'notifications',
      icon: Bell,
      title: t('notifications'),
      subtitle: t('customizeAlerts'),
      color: 'from-pink-500 to-pink-600',
      action: () => onNavigate && onNavigate('notifications')
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: t('helpSupport'),
      subtitle: t('getHelpContactSupport'),
      color: 'from-indigo-500 to-indigo-600',
      action: () => onNavigate && onNavigate('help-support')
    }
  ];

  const stats = [
    { label: t('farmSize'), value: '5 Acres', icon: TrendingUp },
    { label: t('memberSince'), value: 'Jan 2024', icon: Calendar },
    { label: t('riskLevel'), value: 'Low', icon: Shield },
    { label: t('premiumStatus'), value: 'Active', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-lime-700">
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <motion.div
          className="relative bg-gradient-to-br from-primary-dark via-primary-darker to-gray-900 text-white overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
          </div>

          <div className="relative px-6 pt-12 pb-8">
            {/* Avatar Section */}
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <User className="w-10 h-10 text-white" />
                </div>
                <motion.button
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-4 h-4 text-primary" />
                </motion.button>
              </motion.div>

              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit3 className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* User Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">John Farmer</h1>
              <p className="text-primary-100 mb-2">Premium Member</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-primary-100">{t('activeAccount')}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-4 h-4 text-primary-200 mb-1" />
                    <p className="text-xs text-primary-200">{stat.label}</p>
                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Profile Sections */}
        <div className="px-4 py-6 space-y-4">
          {profileSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={section.action}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-sm text-gray-500">{section.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Logout Section */}
        <motion.div
          className="px-4 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 bg-red-50 text-red-600 py-4 px-6 rounded-2xl font-semibold hover:bg-red-100 transition-colors border border-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('signOut')}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;