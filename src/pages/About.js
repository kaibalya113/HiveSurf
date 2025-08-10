import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import { Heart, Target, Users, Award, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useTheme } from '../context/ThemeContext';

// 3D Components
function AnimatedTorus() {
  return (
    <Torus args={[2, 0.5, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="#0ea5e9"
        wireframe
        transparent
        opacity={0.6}
      />
    </Torus>
  );
}

const About = () => {
  const { isDark } = useTheme();
  
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about digital marketing and helping businesses succeed.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, delivering the best results.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and collaboration with our clients.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We constantly innovate and stay ahead of digital marketing trends.',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'Digital marketing expert with 10+ years of experience.',
    },
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      description: 'Specialist in social media and content marketing strategies.',
    },
    {
      name: 'Mike Rodriguez',
      role: 'SEO Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description: 'Expert in search engine optimization and analytics.',
    },
    {
      name: 'Emily Davis',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description: 'Creative genius behind our visual and branding strategies.',
    },
  ];

  const achievements = [
    { number: '500+', label: 'Projects Completed' },
    { number: '95%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Team Members' },
    { number: '10+', label: 'Years Experience' },
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
            <AnimatedTorus />
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
              About <span className="gradient-text">HiveSurf</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We are a team of passionate digital marketing professionals dedicated to helping businesses 
              thrive in the digital landscape. Our mission is to make your marketing journey as enjoyable, 
              rewarding, and effective as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Our aim is to make your marketing journey as enjoyable, rewarding, and effective as possible. 
                We believe that every business deserves to grow to its fullest potential, and we're here to 
                make that happen through innovative digital marketing strategies.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-primary-400" size={20} />
                  <span className="text-slate-600 dark:text-slate-300">Tailored strategies for every business</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-primary-400" size={20} />
                  <span className="text-slate-600 dark:text-slate-300">Data-driven decision making</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-primary-400" size={20} />
                  <span className="text-slate-600 dark:text-slate-300">Continuous optimization and improvement</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">For Every Business</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                All strategies are tailored to meet each client's unique needs. This approach will help 
                your business grow to its fullest potential.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={achievement.label} className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape our relationships with clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover glass-effect rounded-xl p-6 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our team is composed of experienced digital marketing professionals who are passionate 
              about helping your business succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover glass-effect rounded-xl p-6 text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Door Policy Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 font-display">
              <span className="gradient-text">Open-Door Policy</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              You are welcome to schedule a consultation and meet our team at your convenience. 
              We believe in transparency and building strong relationships with our clients.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
            >
              Schedule a Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
};

export default About; 