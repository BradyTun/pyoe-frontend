import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Key, Smartphone, Mail, AlertTriangle } from 'lucide-react';

const SecurityPrivacy = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const securityOptions = [
    {
      title: 'Change Password',
      description: 'Update your account password',
      icon: Key,
      action: 'change-password'
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: Smartphone,
      status: 'Disabled',
      action: '2fa'
    },
    {
      title: 'Login History',
      description: 'View recent login activity',
      icon: Shield,
      action: 'login-history'
    }
  ];

  const privacySettings = [
    {
      title: 'Data Sharing',
      description: 'Control how your data is used',
      value: 'Limited',
      options: ['None', 'Limited', 'Full']
    },
    {
      title: 'Analytics',
      description: 'Help improve our services',
      value: true
    },
    {
      title: 'Marketing Communications',
      description: 'Receive promotional emails',
      value: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          className="bg-white shadow-sm px-4 py-4 flex items-center space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Security & Privacy</h1>
        </motion.div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Security Status */}
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Security Status</h2>
            </div>
            <p className="text-green-100">Your account is secure</p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm">All security measures active</span>
            </div>
          </motion.div>

          {/* Security Options */}
          <motion.div
            className="bg-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Options</h2>
            <div className="space-y-4">
              {securityOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">{option.title}</h3>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </div>
                    {option.status && (
                      <span className="text-sm text-gray-500">{option.status}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            className="bg-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              {privacySettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{setting.title}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>

                  {typeof setting.value === 'boolean' ? (
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.value ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  ) : (
                    <select
                      value={setting.value}
                      className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {setting.options.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Password Change Form */}
          <motion.div
            className="bg-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>

              <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                Update Password
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacy;