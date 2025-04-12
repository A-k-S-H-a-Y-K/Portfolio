import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaEnvelope, FaClock, FaUser, FaInfo, FaGraduationCap, FaHeart, FaCode, FaBriefcase, FaChevronDown } from 'react-icons/fa';
import { sections, SectionKey } from './types/section.types';
import { sectionContent } from './sectionInfo/sectionContent';
import { Footer } from './components/Footer';

const correctAnswer = 'heisenberg';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [showInstaMessage, setShowInstaMessage] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 300], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (showInstaMessage) {
      const timer = setTimeout(() => {
        setShowInstaMessage(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showInstaMessage]);

  const sectionIcons = {
    'About': FaInfo,
    'Profile': FaUser,
    'Education': FaGraduationCap,
    'Interests': FaHeart,
    'Projects': FaCode,
    'Work Experience': FaBriefcase
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          style={{ x, opacity }}
          className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-7xl mx-auto -ml-4 md:-ml-2 lg:ml-0 pr-4">
            <img 
              src="/assets/profile.jpg" 
              alt="Akshay K" 
              className="w-full md:w-[500px] lg:w-[700px] xl:w-[1000px] h-auto rounded-none object-contain"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 text-center md:text-left whitespace-nowrap">AkSHaY K</h1>
          </div>
          
          {/* Scroll Down Indicator */}
          <motion.div 
            className="absolute left-4 md:left-8 bottom-4 md:bottom-8 flex flex-col items-center gap-2 text-gray-600"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <FaChevronDown className="text-2xl" />
          </motion.div>
        </motion.div>

        {/* Section Blocks */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-10 bg-gradient-to-br from-slate-100 via-gray-50 to-zinc-100">
          {sections.map((section, i) => {
            const baseWidth = Math.min(280 + (i % 3) * 80, window.innerWidth - 32);
            const height = 200 + (1 % 4) * 60;
            const adjustedWidth = section === 'Work Experience' ? baseWidth + 60 : baseWidth;
            const Icon = sectionIcons[section];
            return (
              <motion.div
                key={section}
                className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-md p-4 sm:p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center justify-center hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 w-full sm:w-auto"
                style={{ width: `${adjustedWidth}px`, height: `${height}px` }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                onClick={() => setActiveSection(section)}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Icon className="text-2xl sm:text-3xl text-gray-800 group-hover:text-blue-600" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 text-center">{section}</h2>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* For Interactions */}
        <div className="text-center my-8 sm:my-12 px-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-xl sm:text-2xl">
            <button
              className="flex items-center gap-2 hover:text-pink-500"
              onClick={() => setShowInstaMessage(true)}
            >
              <FaInstagram /> Instagram
            </button>
            <a
              href="https://www.linkedin.com/in/akshay-k-36b17a24b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&to=4si21cs021@sit.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-500"
            >
              <FaEnvelope /> Email
            </a>
          </div>
          {showInstaMessage && (
            <div className="mt-4 text-base sm:text-lg text-gray-700 flex justify-center items-center gap-2">
              <FaClock /> No time for scrolling !
            </div>
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {activeSection && (
            <motion.div
              key="activeBox"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
              onClick={() => setActiveSection(null)}
            >
              <motion.div
                className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{activeSection}</h3>
                <div 
                  className="text-lg sm:text-xl text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sectionContent[activeSection] }}
                />
                <button
                  className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                  onClick={() => setActiveSection(null)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer correctAnswer={correctAnswer} />
      </div>
    </Router>
  );
}
