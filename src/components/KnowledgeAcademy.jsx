import React, { useState } from 'react';
import { BookOpen, Camera, Scan, Search, Tag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations, cropRecommendations, academyPosts, diseaseDatabase } from '../mockData';
import { useAppContext } from '../AppContext';

const KnowledgeAcademy = ({ language = 'en' }) => {
  const { language: appLanguage } = useAppContext();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = academyPosts.filter(post => {
    const matchesSearch = (language === 'my' ? post.titleMy : post.title).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { key: 'all', label: 'All', labelMy: 'အားလုံး' },
    { key: 'Climate', label: 'Climate', labelMy: 'ရာသီဥတု' },
    { key: 'MarketTrends', label: 'Market Trends', labelMy: 'စျေးကွက်လမ်းကြောင်းများ' },
    { key: 'SuccessStories', label: 'Success Stories', labelMy: 'အောင်မြင်မှုဇာတ်လမ်းများ' },
  ];

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
            <BookOpen className="w-6 h-6 mr-2 text-emerald-600" />
            {t.knowledgeAcademy}
          </h1>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-600" />
            <input
              type="text"
              placeholder={language === 'my' ? 'ရှာဖွေရန်...' : 'Search articles...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 burmese-text leading-relaxed"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-3 py-1 rounded-lg text-sm font-normal burmese-text leading-relaxed ${
                  selectedCategory === category.key
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {language === 'my' ? category.labelMy : category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Feed */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-fluid-lg font-semibold tracking-tight burmese-text leading-relaxed">{t.blogFeed}</h2>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white/80 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-umbra"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <img src={post.thumbnail} alt={language === 'my' ? post.titleMy : post.title} className="w-full h-32 object-cover rounded-xl mb-3" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg font-normal burmese-text leading-relaxed">
                  #{language === 'my' ? post.categoryMy : post.category}
                </span>
                <div className="flex items-center text-xs text-slate-600 font-normal burmese-text leading-relaxed">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.readTime} {t.readTime}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 burmese-text leading-relaxed">{language === 'my' ? post.titleMy : post.title}</h3>
              <p className="text-sm text-slate-600 font-normal burmese-text leading-relaxed">{language === 'my' ? post.excerptMy : post.excerpt}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Disease Database */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 tracking-tight burmese-text leading-relaxed">{t.diseaseDatabase}</h2>
          <div className="space-y-4">
            {diseaseDatabase.map((disease, index) => (
              <motion.div
                key={disease.id}
                className="border border-slate-200 rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="font-semibold mb-2 burmese-text leading-relaxed">{language === 'my' ? disease.nameMy : disease.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-normal text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'လက္ခဏာများ:' : 'Symptoms:'}</span>
                    <p className="font-normal burmese-text leading-relaxed">{language === 'my' ? disease.symptomsMy : disease.symptoms}</p>
                  </div>
                  <div>
                    <span className="font-normal text-slate-600 burmese-text leading-relaxed">{language === 'my' ? 'ကုသမှု:' : 'Treatment:'}</span>
                    <p className="font-normal burmese-text leading-relaxed">{language === 'my' ? disease.treatmentMy : disease.treatment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Diagnosis */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 flex items-center tracking-tight burmese-text leading-relaxed">
            <Camera className="w-5 h-5 mr-2" />
            {t.aiDiagnosis}
          </h2>
          <div className="relative bg-gray-100 rounded-3xl h-64 flex items-center justify-center overflow-hidden">
            <motion.div
              className="text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Scan className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <p className="text-gray-600 font-normal burmese-text leading-relaxed">{language === 'my' ? 'ပင်ကို စကင်ဖတ်ရန် ကင်မရာကို ညွှန်ပါ' : 'Point camera at crop to scan'}</p>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping-slow"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping-slow" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping-slow" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-sm text-emerald-600 mt-2 font-normal burmese-text leading-relaxed">{language === 'my' ? 'စကင်ဖတ်နေသည်...' : 'Scanning...'}</p>
            </motion.div>
            {/* Viewfinder overlay */}
            <div className="absolute inset-4 border-2 border-emerald-500 rounded-lg pointer-events-none animate-pulse"></div>
          </div>
        </motion.div>

        {/* Crop Recommendations */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-umbra"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-fluid-lg font-semibold mb-4 tracking-tight burmese-text leading-relaxed">{t.cropRecommendations}</h2>
          <div className="grid grid-cols-2 gap-4">
            {cropRecommendations.map((crop, index) => (
              <motion.div
                key={crop.id}
                className="bg-gray-50 p-4 rounded-xl shadow-umbra"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img src={crop.image} alt={crop.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                <h3 className="font-semibold burmese-text leading-relaxed">{crop.name}</h3>
                <p className="text-xs text-gray-600 font-normal burmese-text leading-relaxed">{crop.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgeAcademy;