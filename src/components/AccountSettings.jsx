import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, Globe, Bell, Moon, Shield, Palette, Volume2 } from 'lucide-react';

const AccountSettings = ({ onBack }) => {
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'light',
    notifications: true,
    sound: true,
    privacy: 'public'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Preferences',
      icon: Settings,
      items: [
        {
          label: 'Language',
          type: 'select',
          value: settings.language,
          options: [
            { value: 'en', label: 'English' },
            { value: 'my', label: 'မြန်မာ' }
          ],
          onChange: (value) => handleSettingChange('language', value)
        },
        {
          label: 'Theme',
          type: 'select',
          value: settings.theme,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ],
          onChange: (value) => handleSettingChange('theme', value)
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Push Notifications',
          type: 'toggle',
          value: settings.notifications,
          onChange: (value) => handleSettingChange('notifications', value)
        },
        {
          label: 'Sound',
          type: 'toggle',
          value: settings.sound,
          onChange: (value) => handleSettingChange('sound', value)
        }
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      items: [
        {
          label: 'Profile Visibility',
          type: 'select',
          value: settings.privacy,
          options: [
            { value: 'public', label: 'Public' },
            { value: 'friends', label: 'Friends Only' },
            { value: 'private', label: 'Private' }
          ],
          onChange: (value) => handleSettingChange('privacy', value)
        }
      ]
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
          <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
        </motion.div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {settingSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.title}
                className="bg-white rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <SectionIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between py-3">
                      <span className="text-gray-700 font-medium">{item.label}</span>

                      {item.type === 'toggle' && (
                        <button
                          onClick={() => item.onChange(!item.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            item.value ? 'bg-primary' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}

                      {item.type === 'select' && (
                        <select
                          value={item.value}
                          onChange={(e) => item.onChange(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {item.options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Data Management */}
          <motion.div
            className="bg-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-700 font-medium">Export Data</span>
                <p className="text-sm text-gray-500">Download your data</p>
              </button>
              <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <span className="text-red-600 font-medium">Delete Account</span>
                <p className="text-sm text-red-500">Permanently delete your account</p>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;