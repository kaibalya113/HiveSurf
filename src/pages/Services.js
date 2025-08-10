import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Octahedron } from '@react-three/drei';
import { 
  Search, 
  Share2, 
  PenTool, 
  BarChart3, 
  Mail, 
  Smartphone, 
  CheckCircle,
  ArrowRight,
  Star,
  Package,
  Calendar,
  Zap,
  Crown,
  X,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import StartNowModal from '../components/StartNowModal';
import { useTheme } from '../context/ThemeContext';

// 3D Components
function AnimatedOctahedron() {
  return (
    <Octahedron args={[2]} rotation={[0.5, 0.5, 0]}>
      <meshStandardMaterial
        color="#0ea5e9"
        wireframe
        transparent
        opacity={0.6}
      />
    </Octahedron>
  );
}

// Custom Service Form Modal
const ServiceFormModal = ({ isOpen, onClose, service, type = 'general' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: service?.name || service?.title || '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
             setFormData({
         name: '',
         email: '',
         phone: '',
         company: '',
         service: service?.name || service?.title || '',
         message: '',
         budget: '',
         timeline: ''
       });
      onClose();
    }, 3000);
  };

  const getModalTitle = () => {
    switch (type) {
      case 'trial':
        return 'Start Free Trial';
      case 'consultation':
        return 'Free Consultation';
      case 'pricing':
        return `Get Started with ${service?.name || service?.title || 'Service'}`;
      default:
        return `Get Started with ${service?.title || 'Service'}`;
    }
  };

  const getModalDescription = () => {
    switch (type) {
      case 'trial':
        return 'Experience our premium services risk-free for 7 days. No credit card required.';
      case 'consultation':
        return 'Schedule a free consultation call with our experts to discuss your business goals.';
      case 'pricing':
        return 'Let\'s get you started with the perfect plan for your business.';
      default:
        return 'Tell us about your project and we\'ll get back to you within 24 hours.';
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
           className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50"
           initial={{ opacity: 0, scale: 0.8, y: 50 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.8, y: 50 }}
           onClick={(e) => e.stopPropagation()}
         >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{getModalTitle()}</h2>
              <p className="text-slate-400 text-sm mt-1">{getModalDescription()}</p>
            </div>
            <motion.button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-slate-300">
                We've received your request and will contact you within 24 hours.
              </p>
            </motion.div>
          )}

          {/* Form */}
          {!isSubmitted && (
                         <motion.form
               onSubmit={handleSubmit}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-6"
             >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-slate-300 text-sm font-medium mb-2">
                     Full Name *
                   </label>
                   <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                     placeholder="Enter your full name"
                     required
                   />
                 </div>

                 <div>
                   <label className="block text-slate-300 text-sm font-medium mb-2">
                     Email Address *
                   </label>
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                     placeholder="Enter your email"
                     required
                   />
                 </div>

                 <div>
                   <label className="block text-slate-300 text-sm font-medium mb-2">
                     Phone Number
                   </label>
                   <input
                     type="tel"
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                     placeholder="Enter your phone number"
                   />
                 </div>

                 <div>
                   <label className="block text-slate-300 text-sm font-medium mb-2">
                     Company Name
                   </label>
                   <input
                     type="text"
                     name="company"
                     value={formData.company}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                     placeholder="Enter your company name"
                   />
                 </div>
               </div>

                             {type === 'pricing' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-slate-300 text-sm font-medium mb-2">
                       Budget Range
                     </label>
                     <select
                       name="budget"
                       value={formData.budget}
                       onChange={handleInputChange}
                       className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                     >
                       <option value="">Select budget range</option>
                       <option value="500-1000">$500 - $1,000/month</option>
                       <option value="1000-2000">$1,000 - $2,000/month</option>
                       <option value="2000-5000">$2,000 - $5,000/month</option>
                       <option value="5000+">$5,000+/month</option>
                     </select>
                   </div>

                   <div>
                     <label className="block text-slate-300 text-sm font-medium mb-2">
                       Timeline
                     </label>
                     <select
                       name="timeline"
                       value={formData.timeline}
                       onChange={handleInputChange}
                       className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                     >
                       <option value="">Select timeline</option>
                       <option value="immediate">Immediate start</option>
                       <option value="1-2-weeks">1-2 weeks</option>
                       <option value="1-month">1 month</option>
                       <option value="flexible">Flexible</option>
                     </select>
                   </div>
                 </div>
               )}

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Project Description
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200"
                  placeholder="Tell us about your project goals and requirements..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { isDark } = useTheme();

  // Memoized data to prevent unnecessary re-renders
  const services = useMemo(() => [
    {
      icon: Package,
      title: 'Bundle Kits',
      description: 'Complete marketing packages designed for businesses of all sizes with everything you need to succeed.',
      features: [
        'Multiple service combinations',
        'Customized for your industry',
        'Comprehensive strategy planning',
        'Dedicated project manager',
        'Priority support access',
        'Performance guarantees'
      ],
      color: 'from-violet-500 to-purple-500',
      price: 'Starting from $1,200/month'
    },
    {
      icon: Zap,
      title: '7-Day Free Trial',
      description: 'Experience our premium services risk-free with a full week of professional digital marketing.',
      features: [
        'Full access to all services',
        'No credit card required',
        'Real results in 7 days',
        'Expert consultation included',
        'Performance report provided',
        'Easy cancellation anytime'
      ],
      color: 'from-yellow-500 to-orange-500',
      price: 'FREE for 7 days'
    },
    {
      icon: Calendar,
      title: 'Monthly Subscription',
      description: 'Flexible monthly plans that grow with your business and adapt to your changing needs.',
      features: [
        'Cancel anytime',
        'Scalable services',
        'Monthly performance reviews',
        'Regular strategy updates',
        'Email and phone support',
        'Access to marketing tools'
      ],
      color: 'from-blue-500 to-cyan-500',
      price: 'Starting from $800/month'
    },
    {
      icon: Crown,
      title: 'Yearly Subscription',
      description: 'Save big with our annual plans and get premium features at discounted rates.',
      features: [
        'Save up to 30% vs monthly',
        'Priority customer support',
        'Exclusive premium features',
        'Quarterly strategy sessions',
        'Advanced analytics access',
        'Custom integrations included'
      ],
      color: 'from-emerald-500 to-teal-500',
      price: 'Starting from $560/month'
    },
    {
      icon: Search,
      title: 'Search Engine Optimization (SEO)',
      description: 'Improve your website\'s visibility in search engines and drive organic traffic.',
      features: [
        'Keyword research and optimization',
        'On-page and off-page SEO',
        'Technical SEO audit',
        'Local SEO optimization',
        'Content optimization',
        'Link building strategies'
      ],
      color: 'from-blue-500 to-cyan-500',
      price: 'Starting from $500/month'
    },
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'Build your brand presence and engage with your audience across all social platforms.',
      features: [
        'Platform-specific strategies',
        'Content creation and curation',
        'Community management',
        'Paid social advertising',
        'Influencer partnerships',
        'Social media analytics'
      ],
      color: 'from-purple-500 to-pink-500',
      price: 'Starting from $800/month'
    },
    {
      icon: PenTool,
      title: 'Content Marketing',
      description: 'Create valuable, relevant content that attracts and engages your target audience.',
      features: [
        'Blog content creation',
        'Video content production',
        'Infographic design',
        'Email marketing campaigns',
        'Content strategy development',
        'Content performance analysis'
      ],
      color: 'from-green-500 to-emerald-500',
      price: 'Starting from $600/month'
    },
    {
      icon: BarChart3,
      title: 'Pay-Per-Click (PPC) Advertising',
      description: 'Drive immediate traffic and conversions with targeted paid advertising campaigns.',
      features: [
        'Google Ads management',
        'Facebook/Instagram ads',
        'Remarketing campaigns',
        'A/B testing and optimization',
        'Conversion tracking',
        'ROI optimization'
      ],
      color: 'from-orange-500 to-red-500',
      price: 'Starting from $1000/month'
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Nurture leads and build lasting relationships with your customers through email.',
      features: [
        'Email list building',
        'Automated email sequences',
        'Newsletter campaigns',
        'Segmentation strategies',
        'A/B testing',
        'Performance analytics'
      ],
      color: 'from-indigo-500 to-purple-500',
      price: 'Starting from $400/month'
    },
    {
      icon: Smartphone,
      title: 'Mobile Marketing',
      description: 'Optimize your marketing efforts for mobile users and mobile-first experiences.',
      features: [
        'Mobile app marketing',
        'SMS marketing campaigns',
        'Mobile-optimized content',
        'Location-based marketing',
        'Mobile advertising',
        'Mobile analytics'
      ],
      color: 'from-teal-500 to-blue-500',
      price: 'Starting from $700/month'
    }
  ], []);

  const pricingPlans = useMemo(() => [
    {
      name: 'Starter',
      price: '$800',
      period: 'month',
      yearlyPrice: '$560',
      yearlyPeriod: 'month',
      description: 'Perfect for small businesses getting started',
      features: [
        'SEO Optimization',
        'Social Media Management',
        'Content Creation',
        'Email Marketing',
        'Basic Analytics',
        'Email Support'
      ],
      popular: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      price: '$1,200',
      period: 'month',
      yearlyPrice: '$840',
      yearlyPeriod: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Starter',
        'PPC Advertising',
        'Advanced Analytics',
        'Priority Support',
        'Custom Strategy',
        'Monthly Reports'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Enterprise',
      price: '$2,000',
      period: 'month',
      yearlyPrice: '$1,400',
      yearlyPeriod: 'month',
      description: 'For established businesses with big goals',
      features: [
        'Everything in Professional',
        'Bundle Kit Access',
        'Dedicated Manager',
        'Custom Integrations',
        '24/7 Support',
        'Performance Guarantee'
      ],
      popular: false,
      color: 'from-emerald-500 to-teal-500'
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: 'John Smith',
      company: 'TechStart Inc.',
      rating: 5,
      comment: 'HiveSurf transformed our digital presence. Our organic traffic increased by 300% in just 6 months!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      company: 'Fashion Forward',
      rating: 5,
      comment: 'Their social media marketing strategies helped us reach 50K+ new followers and increase sales by 150%.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      company: 'Local Restaurant',
      rating: 5,
      comment: 'The local SEO work HiveSurf did for us brought in so many new customers. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ], []);

  // Optimized event handlers
  const handleGetStarted = useCallback((service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  }, []);

  const handleStartFreeTrial = useCallback(() => {
    setShowTrialModal(true);
  }, []);

  const handleGetFreeConsultation = useCallback(() => {
    setShowConsultationModal(true);
  }, []);

  const handleViewPricing = useCallback(() => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handlePlanSelection = useCallback((plan) => {
    setSelectedPlan(plan);
    setShowPricingModal(true);
  }, []);

  const handleCloseModals = useCallback(() => {
    setShowStartModal(false);
    setShowServiceModal(false);
    setShowTrialModal(false);
    setShowConsultationModal(false);
    setShowPricingModal(false);
  }, []);

  // Animation variants
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

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedOctahedron />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
            </Canvas>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We will propose to your business innovative marketing strategies, engaging, diverse, 
                and tailored to your goals. Our comprehensive digital marketing services help you 
                ride the wave of innovation with confidence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className={`card-hover glass-effect rounded-xl p-8 cursor-pointer transition-all duration-300 ${
                    activeService === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setActiveService(index)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-6`}>
                    {(() => {
                      const IconComponent = service.icon;
                      return <IconComponent size={28} className="text-white" />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="text-primary-400" size={16} />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (service.title === 'Bundle Kits') {
                          setSelectedPlan({ name: 'Professional', price: '$1,200' });
                          setShowPricingModal(true);
                        } else if (service.title === '7-Day Free Trial') {
                          setShowTrialModal(true);
                        } else if (service.title === 'Monthly Subscription') {
                          setSelectedPlan({ name: 'Starter', price: '$800' });
                          setShowPricingModal(true);
                        } else if (service.title === 'Yearly Subscription') {
                          setSelectedPlan({ name: 'Starter', price: '$560' });
                          setShowPricingModal(true);
                        } else {
                          setSelectedService(service);
                          setShowServiceModal(true);
                        }
                      }}
                      className="text-primary-400 font-semibold hover:text-primary-300 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {service.price}
                    </motion.button>
                    <ArrowRight className="text-primary-400" size={20} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section id="pricing-section" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-display">
                Choose Your <span className="gradient-text">Plan</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Flexible pricing options designed to fit your business needs and budget.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={fadeInUp}
                  className={`relative card-hover glass-effect rounded-xl p-8 ${
                    plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                        <span className="text-slate-400 ml-2">/{plan.period}</span>
                      </div>
                      <div className="flex items-baseline justify-center mt-2">
                        <span className="text-lg font-semibold text-emerald-400">{plan.yearlyPrice}</span>
                        <span className="text-slate-400 ml-2">/{plan.yearlyPeriod} (yearly)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="text-primary-400" size={16} />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                        : 'glass-effect text-white hover:bg-white/20'
                    }`}
                    onClick={() => plan.name === 'Starter' ? handleStartFreeTrial() : handlePlanSelection(plan)}
                  >
                    {plan.name === 'Starter' ? 'Start Free Trial' : 'Get Started'}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Detailed Service View */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${services[activeService].color} rounded-full flex items-center justify-center mb-6`}>
                  {(() => {
                    const IconComponent = services[activeService].icon;
                    return <IconComponent size={32} className="text-white" />;
                  })()}
                </div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                  {services[activeService].title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {services[activeService].description}
                </p>
                <div className="space-y-4 mb-8">
                  {services[activeService].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="text-primary-400" size={20} />
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
                  onClick={() => handleGetStarted(services[activeService])}
                >
                  Get Started
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Service Details</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Pricing</h4>
                    <motion.button
                      onClick={() => {
                        if (services[activeService].title === 'Bundle Kits') {
                          setSelectedPlan({ name: 'Professional', price: '$1,200' });
                          setShowPricingModal(true);
                        } else if (services[activeService].title === '7-Day Free Trial') {
                          setShowTrialModal(true);
                        } else if (services[activeService].title === 'Monthly Subscription') {
                          setSelectedPlan({ name: 'Starter', price: '$800' });
                          setShowPricingModal(true);
                        } else if (services[activeService].title === 'Yearly Subscription') {
                          setSelectedPlan({ name: 'Starter', price: '$560' });
                          setShowPricingModal(true);
                        } else {
                          setSelectedService(services[activeService]);
                          setShowServiceModal(true);
                        }
                      }}
                      className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {services[activeService].price}
                    </motion.button>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">What's Included</h4>
                    <ul className="space-y-2">
                      <li className="text-slate-300">✓ Custom strategy development</li>
                      <li className="text-slate-300">✓ Regular performance reports</li>
                      <li className="text-slate-300">✓ Dedicated account manager</li>
                      <li className="text-slate-300">✓ 24/7 support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Timeline</h4>
                    <p className="text-slate-300">First results typically seen within 30-60 days</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-display">
                What Our <span className="gradient-text">Clients Say</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about our services.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  variants={fadeInUp}
                  className="card-hover glass-effect rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-slate-400 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-display">
                Ready to <span className="gradient-text">Transform</span> Your Business?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Let's discuss how our digital marketing services can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
                  onClick={handleGetFreeConsultation}
                >
                  Get Free Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-effect text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200"
                  onClick={handleViewPricing}
                >
                  View Pricing
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modals */}
        <StartNowModal 
          isOpen={showStartModal} 
          onClose={handleCloseModals} 
        />
        
        <ServiceFormModal
          isOpen={showServiceModal}
          onClose={handleCloseModals}
          service={selectedService}
          type="general"
        />
        
        <ServiceFormModal
          isOpen={showTrialModal}
          onClose={handleCloseModals}
          service={{ title: 'Free Trial' }}
          type="trial"
        />
        
        <ServiceFormModal
          isOpen={showConsultationModal}
          onClose={handleCloseModals}
          service={{ title: 'Free Consultation' }}
          type="consultation"
        />
        
        <ServiceFormModal
          isOpen={showPricingModal}
          onClose={handleCloseModals}
          service={selectedPlan}
          type="pricing"
        />
      </div>
    </PageTransition>
  );
};

export default Services; 