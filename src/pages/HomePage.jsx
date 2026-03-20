import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Categories from '../components/Categories';
import Comparison from '../components/Comparison';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PageLoader from '../components/ui/page-loader';

gsap.registerPlugin(ScrollTrigger);

// Section fade-in wrapper using Framer Motion
const SectionReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Page intro loader */}
      <PageLoader onComplete={() => setLoaded(true)} />

      {/* Main content — fades in after loader */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main"
            className="bg-ivory text-gray-900 font-sans overflow-x-clip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Navbar />

            {/* Hero – no delay, first thing to appear */}
            <div id="home">
              <Hero />
            </div>

            <SectionReveal delay={0}>
              <div id="about">
                <About />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.05}>
              <div id="categories">
                <Categories />
              </div>
            </SectionReveal>

            <SectionReveal delay={0}>
              <div id="pricing">
                <Comparison />
              </div>
            </SectionReveal>

            <SectionReveal delay={0}>
              <div id="how-it-works">
                <HowItWorks />
              </div>
            </SectionReveal>

            <div id="testimonials">
              <Testimonials />
            </div>

            <SectionReveal delay={0}>
              <CallToAction />
            </SectionReveal>

            <SectionReveal delay={0}>
              <div id="contact">
                <Contact />
              </div>
            </SectionReveal>

            <SectionReveal delay={0}>
              <Footer />
            </SectionReveal>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HomePage;
