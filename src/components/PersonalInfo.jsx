import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit3, Check, X } from 'lucide-react';

const PersonalInfo = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Farmer',
    email: 'john.farmer@example.com',
    phone: '+95 9 123 456 789',
    location: 'Yangon, Myanmar',
    farmSize: '5 Acres'
  });

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

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
          <h1 className="text-xl font-semibold text-gray-900">Personal Information</h1>
        </motion.div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Profile Picture Section */}
          <motion.div
            className="bg-white rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">John Farmer</h2>
            <p className="text-gray-500">Premium Member</p>
          </motion.div>

          {/* Form Fields */}
          <motion.div
            className="bg-white rounded-2xl p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary font-medium text-sm"
                >
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 bg-green-500 text-white rounded-full"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 bg-gray-300 text-gray-600 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.location}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Farm Information */}
          <motion.div
            className="bg-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Farm Size</span>
                <span className="font-medium text-gray-900">{formData.farmSize}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">January 2024</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;