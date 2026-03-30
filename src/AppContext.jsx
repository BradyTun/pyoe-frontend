import React, { createContext, useContext, useState } from 'react';
import { subscriptionData, insuranceMonitoring } from './mockData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [subscriptionState, setSubscriptionState] = useState(subscriptionData);
  const [insuranceState, setInsuranceState] = useState(insuranceMonitoring);

  const value = {
    subscriptionState,
    setSubscriptionState,
    insuranceState,
    setInsuranceState,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};