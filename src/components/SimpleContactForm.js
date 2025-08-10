import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react';

const SimpleContactForm = ({ 
  title = "Get Started", 
  subtitle = "Fill out the form below and we'll get back to you within 24 hours.",
  source = "Website",
  onSuccess,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just show success and log the data
      console.log('Form Data:', {
        ...formData,
        source: source,
        timestamp: new Date().toISOString()
      });
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";

  const services = [
    'Digital Marketing',
    'SEO',
    'Social Media Marketing', 
    'Content Marketing',
    'PPC Advertising',
    'Web Design',
    'Branding',
    'Other'
  ];

  return (
    <div className={`bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{subtitle}</p>
        <div className="mt-2 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-2">
          ⚠️ Simple Contact Form - Data will be logged to console
        </div>
      </div>

      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
          <p className="text-slate-300 mb-4">
            We've received your message and will contact you within 24 hours.
          </p>
          <div className="text-xs text-slate-400 bg-slate-800/50 rounded-lg p-3">
            <div className="font-semibold mb-1">Form Data (Logged to Console):</div>
            <div className="text-left">
              <div>Name: {formData.name}</div>
              <div>Email: {formData.email}</div>
              <div>Service: {formData.service}</div>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={inputClasses}
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={inputClasses}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Your Company"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Service Interested In
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={inputClasses}
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className={inputClasses}
              placeholder="Tell us about your project or requirements..."
            />
          </div>

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3"
            >
              <AlertCircle size={20} />
              <span>Something went wrong. Please try again.</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Mail size={20} />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default SimpleContactForm; 