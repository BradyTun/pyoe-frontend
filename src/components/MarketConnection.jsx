import React from 'react';
import { ShoppingCart, Phone, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations, verifiedBuyers } from '../mockData';

const MarketConnection = ({ language = 'en' }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-fluid-xl font-semibold flex items-center tracking-tight burmese-text">
            <ShoppingCart className="w-6 h-6 mr-2 text-primary" />
            {t.marketConnection}
          </h1>
        </motion.div>

        {/* Verified Buyers */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 tracking-tight burmese-text">{t.verifiedBuyers}</h2>
          <div className="space-y-4">
            {verifiedBuyers.map((buyer, index) => (
              <motion.div
                key={buyer.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-umbra min-h-[60px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div>
                  <h3 className="font-semibold burmese-text">{buyer.name}</h3>
                  <p className="text-sm text-gray-600 font-light burmese-text">{buyer.contact}</p>
                  {buyer.emergency && (
                    <div className="flex items-center mt-1">
                      <AlertTriangle className="w-4 h-4 text-accent-warning mr-1" />
                      <span className="text-xs text-accent-warning font-semibold burmese-text">{t.emergencySell}</span>
                    </div>
                  )}
                </div>
                <motion.button
                  className="bg-primary text-white p-3 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketConnection;