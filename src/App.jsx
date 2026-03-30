import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Shield, BookOpen, ShoppingCart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppProvider } from './AppContext';
import Dashboard from './components/Dashboard';
import InsuranceHub from './components/InsuranceHub';
import KnowledgeAcademy from './components/KnowledgeAcademy';
import MarketConnection from './components/MarketConnection';

const navItems = [
  { key: 'dashboard', icon: Home, component: Dashboard, labelKey: 'dashboard' },
  { key: 'insurance', icon: Shield, component: InsuranceHub, labelKey: 'insurance' },
  { key: 'academy', icon: BookOpen, component: KnowledgeAcademy, labelKey: 'academy' },
  { key: 'market', icon: ShoppingCart, component: MarketConnection, labelKey: 'market' },
];

const AppContent = () => {
  const { t, i18n } = useTranslation();
  const [currentView, setCurrentView] = useState('dashboard');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const CurrentComponent = navItems.find(item => item.key === currentView).component;

  return (
    <div className="min-h-screen bg-secondary font-sans text-text-main">
      <div className="pt-4 px-4 flex justify-between items-center">
        <h1 className="text-fluid-lg font-bold text-primary">Pyoe</h1>
        <motion.button 
          onClick={() => changeLanguage(i18n.language === 'en' ? 'my' : 'en')}
          className="bg-white shadow-soft text-text-light font-semibold py-2 px-4 rounded-full flex items-center space-x-2 hover:shadow-lifted transition-shadow"
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-5 h-5" />
          <span className="font-burmese">{i18n.language === 'en' ? 'EN' : 'MY'}</span>
        </motion.button>
      </div>
      <div className="pb-24 pt-4">
        <CurrentComponent onNavigate={setCurrentView} />
      </div>
      {/* Bottom Navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lifted"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
      >
        <div className="flex justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.key;
            return (
              <motion.button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-colors ${
                  isActive ? 'text-primary' : 'text-text-light'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`absolute top-0 w-10 h-1 bg-primary rounded-b-full transition-all ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
                <Icon className="w-6 h-6" />
                <span className={`text-xs mt-1 font-medium transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}>{t(item.labelKey)}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}