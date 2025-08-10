import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import './HubSpotForm.css';
import SimpleContactForm from './SimpleContactForm';

const HubSpotForm = ({ 
  title = "Get Started", 
  subtitle = "Fill out the form below and we'll get back to you within 24 hours.",
  source = "Website",
  onSuccess,
  className = ""
}) => {
  const formRef = useRef(null);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const loadHubSpotScript = () => {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="hsforms.net"]');
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js-na2.hsforms.net/forms/embed/243516569.js';
      script.defer = true;
      script.onload = () => {
        console.log('HubSpot script loaded successfully');
        resolve();
      };
      script.onerror = () => {
        console.error('Failed to load HubSpot script');
        reject(new Error('Failed to load HubSpot script'));
      };
      document.head.appendChild(script);
    });
  };

  const createHubSpotForm = () => {
    return new Promise((resolve, reject) => {
      if (!window.hbspt) {
        reject(new Error('HubSpot not available'));
        return;
      }

      try {
        window.hbspt.forms.create({
          region: 'na2',
          portalId: '243516569',
          formId: '7a88f6de-c616-4a7e-a938-46f981035858',
          target: formRef.current,
          onFormSubmitted: (form) => {
            console.log('Form submitted successfully');
            setSubmitStatus('success');
            setIsSubmitting(false);
            if (onSuccess) {
              onSuccess();
            }
          },
          onFormReady: (form) => {
            console.log('Form ready, applying custom styling');
            setTimeout(() => {
              customizeFormStyling();
            }, 100);
            resolve();
          },
          onFormError: (form) => {
            console.error('Form error:', form);
            setSubmitStatus('error');
            setIsSubmitting(false);
            reject(new Error('Form submission failed'));
          }
        });
      } catch (error) {
        console.error('Error creating HubSpot form:', error);
        reject(error);
      }
    });
  };

  const initializeForm = async () => {
    try {
      setLoadError(false);
      await loadHubSpotScript();
      
      // Wait a bit for the script to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await createHubSpotForm();
      setIsFormLoaded(true);
    } catch (error) {
      console.error('Form initialization error:', error);
      setLoadError(true);
      setIsFormLoaded(false);
    }
  };

  useEffect(() => {
    if (formRef.current) {
      initializeForm();
    }
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setLoadError(false);
    setIsFormLoaded(false);
    
    // Clear the form container
    if (formRef.current) {
      formRef.current.innerHTML = '';
    }
    
    // Retry initialization
    setTimeout(() => {
      initializeForm();
    }, 500);
  };

  const customizeFormStyling = () => {
    const form = formRef.current;
    if (!form) return;

    // Apply custom styling to form elements
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.style.cssText = `
        width: 100%;
        padding: 12px 16px;
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgb(51, 65, 85);
        border-radius: 8px;
        color: white;
        font-size: 14px;
        transition: all 0.2s ease;
        outline: none;
      `;

      input.addEventListener('focus', () => {
        input.style.borderColor = '#0ea5e9';
        input.style.boxShadow = '0 0 0 2px rgba(14, 165, 233, 0.2)';
      });

      input.addEventListener('blur', () => {
        input.style.borderColor = 'rgb(51, 65, 85)';
        input.style.boxShadow = 'none';
      });
    });

    // Style labels
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
      label.style.cssText = `
        color: rgb(203, 213, 225);
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
        display: block;
      `;
    });

    // Style submit button
    const submitBtn = form.querySelector('input[type="submit"]');
    if (submitBtn) {
      submitBtn.style.cssText = `
        width: 100%;
        padding: 12px 24px;
        background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 16px;
      `;

      submitBtn.addEventListener('mouseenter', () => {
        submitBtn.style.transform = 'translateY(-1px)';
        submitBtn.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
      });

      submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.transform = 'translateY(0)';
        submitBtn.style.boxShadow = 'none';
      });

      submitBtn.addEventListener('click', () => {
        setIsSubmitting(true);
      });
    }

    // Style form container
    const formElement = form.querySelector('form');
    if (formElement) {
      formElement.style.cssText = `
        background: rgba(15, 23, 42, 0.5);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(51, 65, 85, 0.5);
        border-radius: 12px;
        padding: 24px;
        margin: 0;
      `;
    }

    // Style field groups
    const fieldGroups = form.querySelectorAll('.hs-form-field');
    fieldGroups.forEach(group => {
      group.style.cssText = `
        margin-bottom: 20px;
      `;
    });

    // Style required field indicators
    const requiredFields = form.querySelectorAll('.hs-form-required');
    requiredFields.forEach(field => {
      field.style.color = '#ef4444';
    });
  };

  const inputClasses = "w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";

  return (
    <div className={`hubspot-form-container bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{subtitle}</p>
      </div>

      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
          <p className="text-slate-300">
            We've received your message and will contact you within 24 hours.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-lg p-3"
            >
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span>Submitting your form...</span>
            </motion.div>
          )}

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

          {/* HubSpot Form Container */}
          <div 
            ref={formRef}
            className="min-h-[400px] flex items-center justify-center"
          >
            {!isFormLoaded && !loadError && (
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Loading form...</p>
                <p className="text-xs text-slate-500 mt-2">This may take a few seconds</p>
              </div>
            )}

            {/* Error state */}
            {loadError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Form Loading Issue</h4>
                <p className="text-slate-300 mb-4">
                  {retryCount > 0 
                    ? `Attempt ${retryCount + 1}: The form is having trouble loading.`
                    : "The form is having trouble loading."
                  }
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleRetry}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <RefreshCw size={16} />
                    <span>Try Again</span>
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
                {retryCount > 2 && (
                  <p className="text-xs text-slate-400 mt-4">
                    If the problem persists, please contact us directly at info@hivesurf.com
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Fallback form if HubSpot fails to load after multiple retries */}
          {loadError && retryCount > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SimpleContactForm 
                title={title}
                subtitle={subtitle}
                source={source}
                onSuccess={onSuccess}
                className={className}
              />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default HubSpotForm; 