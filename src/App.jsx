import React, { useState } from 'react';
import { Home, Shield, BookOpen, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppProvider, useAppContext } from './AppContext';
import Dashboard from './components/Dashboard';
import InsuranceHub from './components/InsuranceHub';
import KnowledgeAcademy from './components/KnowledgeAcademy';
import MarketConnection from './components/MarketConnection';
import { translations } from './mockData';

const navItems = [
  { key: 'dashboard', icon: Home, component: Dashboard, labelKey: 'dashboard' },
  { key: 'insurance', icon: Shield, component: InsuranceHub, labelKey: 'insurance' },
  { key: 'academy', icon: BookOpen, component: KnowledgeAcademy, labelKey: 'academy' },
  { key: 'market', icon: ShoppingCart, component: MarketConnection, labelKey: 'market' },
];

const AppContent = () => {
  const { language } = useAppContext();
  const [currentView, setCurrentView] = useState('dashboard');

  const CurrentComponent = navItems.find(item => item.key === currentView).component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50">
      <div className="pb-20">
        <CurrentComponent language={language} onNavigate={setCurrentView} />
      </div>
      {/* Bottom Navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-umbra border-t border-white/20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex justify-around py-3 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.key;
            return (
              <motion.button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`flex flex-col items-center p-2 rounded-lg min-h-[44px] min-w-[44px] ${
                  isActive ? 'text-emerald-600' : 'text-slate-600'
                }`}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-normal burmese-text leading-relaxed">{translations[language][item.labelKey]}</span>
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