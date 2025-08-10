import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Icosahedron } from '@react-three/drei';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useTheme } from '../context/ThemeContext';
import GoogleForm from '../components/GoogleForm';

// 3D Components
function AnimatedIcosahedron() {
  return (
    <Icosahedron args={[2]} rotation={[0.5, 0.5, 0]}>
      <meshStandardMaterial
        color="#0ea5e9"
        wireframe
        transparent
        opacity={0.6}
      />
    </Icosahedron>
  );
}

const Contact = () => {
  const { isDark } = useTheme();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 7008310868',
      description: 'Call us anytime',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@hivesurf.com',
      description: 'Send us an email',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'India',
      description: 'Visit our office',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9AM - 6PM',
      description: 'We\'re here to help',
      color: 'from-orange-500 to-red-500'
    }
  ];



  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedIcosahedron />
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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Ready to start your digital marketing journey? We'd love to hear from you. 
              Let's discuss how we can help your business grow and succeed online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover glass-effect rounded-xl p-6 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-primary-400 font-semibold mb-2">
                  {info.value}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                         {/* Google Contact Form */}
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
               <GoogleForm 
                 title="Send Us a Message"
                 subtitle="Fill out the form below and we'll get back to you within 24 hours."
                 source="Contact Page"
               />
             </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-effect rounded-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Why Choose <span className="gradient-text">HiveSurf</span>?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-primary-400 mt-1" size={20} />
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-semibold">Expert Team</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">Experienced digital marketing professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-primary-400 mt-1" size={20} />
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-semibold">Custom Strategies</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">Tailored solutions for your business</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-primary-400 mt-1" size={20} />
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-semibold">Proven Results</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">Track record of successful campaigns</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-primary-400 mt-1" size={20} />
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-semibold">24/7 Support</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">Always here when you need us</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Get Started Today
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Ready to transform your digital presence? Let's discuss your goals and create 
                  a custom strategy that drives results.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-300">Free consultation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-300">Custom strategy development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-300">No long-term contracts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">
              Find Us <span className="gradient-text">Here</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Visit our office or reach out to us online
            </p>
          </motion.div>

          <div className="glass-effect rounded-xl p-8 text-center">
            <div className="w-full h-64 bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">HiveSurf Office</h3>
                <p className="text-slate-600 dark:text-slate-300">India</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                  (Interactive map would be integrated here)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
};

export default Contact; 