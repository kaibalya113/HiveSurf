import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import HiveSurfLogo from './HiveSurfLogo';
import GoogleForm from './GoogleForm';

const StartNowModal = ({ isOpen, onClose, onFormSubmitted, sourceCardId }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmitted = () => {
    setIsSubmitted(true);
    
    // Call the form submitted callback if provided
    if (onFormSubmitted) {
      setTimeout(() => {
        onFormSubmitted();
      }, 1000);
    } else {
      // Default behavior - reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const stepVariants = {
    enter: {
      x: 50,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      x: -50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Enhanced success animation for form submission
  const successVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: 90,
      transition: {
        duration: 0.4
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-700/50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <HiveSurfLogo size={32} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Start Your Journey</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>



          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Thank You!
              </motion.h3>
              <motion.p 
                className="text-slate-600 dark:text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                We've received your request and will contact you within 24 hours.
              </motion.p>
              {sourceCardId && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="mt-4 text-sm text-slate-400"
                >
                  Returning to your selected service...
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Google Form */}
          {!isSubmitted && (
            <motion.div
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
                             <GoogleForm 
                 title="Start Your Journey"
                 subtitle="Fill out the form below to get started with HiveSurf."
                 className="!mb-0"
                 source={sourceCardId ? `${sourceCardId} Modal` : "Start Now Modal"}
                 onSuccess={handleFormSubmitted}
               />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StartNowModal; 