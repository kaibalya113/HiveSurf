import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Target, Zap, Award, Globe, BarChart3, Sparkles, Waves, Rocket } from 'lucide-react';
import StartNowModal from '../components/StartNowModal';
import HiveSurfLogo from '../components/HiveSurfLogo';
import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedBackground from '../components/AnimatedBackground';
import { useTheme } from '../context/ThemeContext';

// Animation variants for better performance
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Card transition variants
const cardVariants = {
  normal: {
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  hover: {
    scale: 1.02,
    rotateY: 2,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  click: {
    scale: 0.95,
    rotateY: 5,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  opening: {
    scale: 0.8,
    opacity: 0.5,
    rotateY: 10,
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

const Home = () => {
  const [showStartModal, setShowStartModal] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(null);
  const [isCardTransitioning, setIsCardTransitioning] = useState(false);
  const { isDark } = useTheme();

  // Memoized data to prevent unnecessary re-renders
  const stats = useMemo(() => [
    { icon: Users, number: '2,000+', label: 'Happy Clients' },
    { icon: TrendingUp, number: '500%', label: 'Average Growth' },
    { icon: Target, number: '95%', label: 'Success Rate' },
    { icon: Award, number: '50+', label: 'Awards Won' },
  ], []);

  const features = useMemo(() => [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with audiences worldwide through our comprehensive digital marketing strategies.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven',
      description: 'Make informed decisions with our advanced analytics and performance tracking.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Quick implementation and rapid results with our optimized marketing campaigns.',
      color: 'from-orange-500 to-red-500',
    },
  ], []);

  const animatedFeatures = useMemo(() => [
    { icon: Sparkles, text: "Innovation", key: "innovation" },
    { icon: Waves, text: "Growth", key: "growth" },
    { icon: Rocket, text: "Success", key: "success" }
  ], []);

  // Optimized event handlers
  const handleStartNow = useCallback((cardId = null) => {
    if (cardId) {
      setClickedCardId(cardId);
      setIsCardTransitioning(true);
      // Add a small delay to show the card transition
      setTimeout(() => {
        setShowStartModal(true);
      }, 300);
    } else {
      setShowStartModal(true);
    }
  }, []);

  const handleLearnMore = useCallback(() => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowStartModal(false);
    // Reset card state after modal closes
    setTimeout(() => {
      setClickedCardId(null);
      setIsCardTransitioning(false);
    }, 300);
  }, []);

  const handleFormSubmitted = useCallback(() => {
    // Smooth transition back to the original card
    setShowStartModal(false);
    setTimeout(() => {
      setClickedCardId(null);
      setIsCardTransitioning(false);
    }, 500);
  }, []);

  // Theme-aware styles
  const textColors = {
    primary: isDark ? '#f8fafc' : '#0f172a',
    secondary: isDark ? '#e2e8f0' : '#475569',
    muted: isDark ? '#cbd5e1' : '#475569',
    accent: isDark ? '#0ea5e9' : '#0284c7'
  };

  const borderColors = {
    light: isDark ? 'border-slate-400' : 'border-slate-600',
    bg: isDark ? 'bg-slate-400' : 'bg-slate-600'
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <AnimatedBackground />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Optimized Logo Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <HiveSurfLogo size={100} />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${isDark ? 'rgba(14, 165, 233, 0.3)' : 'rgba(2, 132, 199, 0.3)'} 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Optimized Title */}
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 font-display"
                style={{ color: textColors.primary }}
              >
                <motion.span
                  className="inline-block cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: isDark 
                      ? "0 0 20px rgba(248, 250, 252, 0.8), 0 0 40px rgba(248, 250, 252, 0.4)" 
                      : "0 0 20px rgba(15, 23, 42, 0.8), 0 0 40px rgba(15, 23, 42, 0.4)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Welcome to&nbsp;
                </motion.span>
                <motion.span 
                  className="gradient-text neon-glow inline-block cursor-pointer"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    textShadow: "0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  HiveSurf
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: textColors.secondary }}
              >
                At <strong>HiveSurf</strong>, we believe the digital world is a hive of limitless opportunity — 
                and we're here to help you surf it with confidence. Just like a surfer rides the waves, 
                our clients ride the wave of innovation, guided by our expert solutions.
              </motion.p>
              
              {/* Optimized Animated Features */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-wrap justify-center gap-6 mt-8"
              >
                {animatedFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.key}
                    variants={fadeInUp}
                    className="flex items-center space-x-2 magnetic-hover"
                    style={{ color: textColors.accent }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    >
                      <feature.icon size={20} />
                    </motion.div>
                    <span className="text-lg font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Optimized Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <AnimatedButton
                onClick={() => handleStartNow()}
                variant="primary"
                size="lg"
                icon={ArrowRight}
              >
                Start Now
              </AnimatedButton>
              <AnimatedButton
                onClick={handleLearnMore}
                variant="secondary"
                size="lg"
              >
                Learn More
              </AnimatedButton>
            </motion.div>
          </div>

          {/* Optimized Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${borderColors.light}`}>
              <motion.div 
                className={`w-1 h-3 rounded-full mt-2 ${borderColors.bg}`}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Optimized Stats Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display" style={{ color: textColors.primary }}>
                Trusted by <span className="gradient-text">2,000+ businesses</span>
              </h2>
              <p className="text-xl" style={{ color: textColors.muted }}>
                Entrust us with your marketing and focus on growing your business with peace of mind.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center card-hover"
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon size={24} className="text-white" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="font-medium" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Optimized Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display" style={{ color: textColors.primary }}>
                Why Choose <span className="gradient-text">HiveSurf</span>
              </h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: textColors.muted }}>
                Our team is composed of experienced digital marketing professionals who will propose 
                innovative marketing strategies tailored to your goals.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="card-hover glass-effect rounded-xl p-8 text-center particle-field"
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: textColors.primary }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: textColors.muted }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Service Cards Section with Smooth Transitions */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display" style={{ color: textColors.primary }}>
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: textColors.muted }}>
                Choose from our comprehensive range of digital marketing services designed to grow your business.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Bundle Kits Card */}
              <motion.div
                className="card-hover glass-effect rounded-xl p-8 cursor-pointer"
                variants={cardVariants}
                initial="normal"
                animate={clickedCardId === 'bundle-kits' && isCardTransitioning ? "opening" : "normal"}
                whileHover="hover"
                whileTap="click"
                onClick={() => handleStartNow('bundle-kits')}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap size={28} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: textColors.primary }}>
                  Bundle Kits
                </h3>
                <p className="leading-relaxed mb-6" style={{ color: textColors.muted }}>
                  Complete marketing packages designed for businesses of all sizes with everything you need to succeed.
                </p>
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="text-lg font-semibold gradient-text"
                    whileHover={{ scale: 1.05 }}
                  >
                    Starting from $1,200/month
                  </motion.span>
                  <ArrowRight className="text-primary-400" size={20} />
                </div>
              </motion.div>

              {/* Free Trial Card */}
              <motion.div
                className="card-hover glass-effect rounded-xl p-8 cursor-pointer"
                variants={cardVariants}
                initial="normal"
                animate={clickedCardId === 'free-trial' && isCardTransitioning ? "opening" : "normal"}
                whileHover="hover"
                whileTap="click"
                onClick={() => handleStartNow('free-trial')}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Award size={28} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: textColors.primary }}>
                  7-Day Free Trial
                </h3>
                <p className="leading-relaxed mb-6" style={{ color: textColors.muted }}>
                  Experience our premium services risk-free with a full week of professional digital marketing.
                </p>
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="text-lg font-semibold gradient-text"
                    whileHover={{ scale: 1.05 }}
                  >
                    FREE for 7 days
                  </motion.span>
                  <ArrowRight className="text-primary-400" size={20} />
                </div>
              </motion.div>

              {/* Consultation Card */}
              <motion.div
                className="card-hover glass-effect rounded-xl p-8 cursor-pointer"
                variants={cardVariants}
                initial="normal"
                animate={clickedCardId === 'consultation' && isCardTransitioning ? "opening" : "normal"}
                whileHover="hover"
                whileTap="click"
                onClick={() => handleStartNow('consultation')}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users size={28} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: textColors.primary }}>
                  Free Consultation
                </h3>
                <p className="leading-relaxed mb-6" style={{ color: textColors.muted }}>
                  Schedule a free consultation call with our experts to discuss your business goals.
                </p>
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="text-lg font-semibold gradient-text"
                    whileHover={{ scale: 1.05 }}
                  >
                    FREE Consultation
                  </motion.span>
                  <ArrowRight className="text-primary-400" size={20} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Optimized CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-900/20 to-secondary-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display" style={{ color: textColors.primary }}>
                Ready to <span className="gradient-text">Surf the Digital Wave</span>?
              </h2>
              <p className="text-xl mb-8" style={{ color: textColors.muted }}>
                Get started today and transform your business with our innovative digital marketing strategies.
              </p>
              <AnimatedButton
                onClick={() => handleStartNow()}
                variant="primary"
                size="lg"
              >
                Get Started Today
              </AnimatedButton>
            </motion.div>
          </div>
        </section>

        {/* Start Now Modal */}
        <StartNowModal 
          isOpen={showStartModal} 
          onClose={handleCloseModal}
          onFormSubmitted={handleFormSubmitted}
          sourceCardId={clickedCardId}
        />
      </div>
    </PageTransition>
  );
};

export default Home; 