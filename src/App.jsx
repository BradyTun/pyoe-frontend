import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Shield, BookOpen, ShoppingCart, Globe, LogOut, Leaf, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppProvider, useAppContext } from './AppContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InsuranceHub from './components/InsuranceHub';
import KnowledgeAcademy from './components/KnowledgeAcademy';
import MarketConnection from './components/MarketConnection';
import FloatingAIChat from './components/FloatingAIChat';
import Profile from './components/Profile';
import PersonalInfo from './components/PersonalInfo';
import AccountSettings from './components/AccountSettings';
import SecurityPrivacy from './components/SecurityPrivacy';

const navItems = [
  { key: 'dashboard', icon: Home, component: Dashboard, labelKey: 'dashboard' },
  { key: 'insurance', icon: Shield, component: InsuranceHub, labelKey: 'insurance' },
  { key: 'academy', icon: BookOpen, component: KnowledgeAcademy, labelKey: 'academy' },
  { key: 'market', icon: ShoppingCart, component: MarketConnection, labelKey: 'market' },
  { key: 'profile', icon: User, component: Profile, labelKey: 'profile' },
];

const subPageComponents = {
  'personal-info': PersonalInfo,
  'account-settings': AccountSettings,
  'security-privacy': SecurityPrivacy,
  // Add other sub-pages here
};

const AppContent = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const [currentView, setCurrentView] = useState('dashboard');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  if (!isLoggedIn) {
    return <Login />;
  }

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const renderComponent = () => {
    const navItem = navItems.find(item => item.key === currentView);
    if (navItem) {
      const Component = navItem.component;
      return <Component onNavigate={handleNavigation} />;
    }
    
    const SubPageComponent = subPageComponents[currentView];
    if (SubPageComponent) {
      return <SubPageComponent onBack={() => setCurrentView('profile')} />;
    }

    // Fallback to dashboard if view is not found
    const DashboardComponent = navItems.find(item => item.key === 'dashboard').component;
    return <DashboardComponent onNavigate={handleNavigation} />;
  };

  const getHeaderTitle = () => {
    const navItem = navItems.find(item => item.key === currentView);
    if (navItem) {
      return t(navItem.labelKey);
    }
    // For sub-pages, you might want a different title logic
    return t('profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden pt-4 px-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-primary">Pyoe</h1>
        </div>
        <motion.button 
          onClick={() => changeLanguage(i18n.language === 'en' ? 'my' : 'en')}
          className="bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{i18n.language === 'en' ? 'EN' : 'MM'}</span>
        </motion.button>
      </div>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <motion.div
          className="hidden md:flex w-64 bg-white shadow-lg flex-col"
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">Pyoe</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.key;
                return (
                  <motion.li key={item.key}>
                    <button
                      onClick={() => setCurrentView(item.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{t(item.labelKey)}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Top Bar */}
          <header className="hidden md:flex bg-white shadow-sm border-b border-gray-200 px-6 py-4 justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {getHeaderTitle()}
            </h2>
            <motion.button
              onClick={() => changeLanguage(i18n.language === 'en' ? 'my' : 'en')}
              className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5" />
              <span>{i18n.language === 'en' ? 'EN' : 'MM'}</span>
            </motion.button>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {renderComponent()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <motion.div
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-[99999]"
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
                  isActive ? 'text-primary' : 'text-gray-600'
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
      <FloatingAIChat />
    </AppProvider>
  );
}