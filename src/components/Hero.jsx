import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Bookmark, Check, Compass, GraduationCap, Play, Zap } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';

export default function Hero({ onExplore, onSelectFeatured }) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } };
  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero container">
      <Hero3DCanvas />
      <div className="hero-copy">
        <motion.div {...motionProps} transition={{ duration: 0.45 }} className="eyebrow">
          <span className="live-dot" /><span>The world is your classroom</span>
        </motion.div>
        <motion.h1 {...motionProps} transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}>
          Your next chapter<br /><em>starts here.</em>
        </motion.h1>
        <motion.p {...motionProps} transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}>
          Discover verified scholarships, remote roles, fellowships, and academic experiences that move your goals forward.
        </motion.p>
        <motion.div {...motionProps} transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.24 }} className="hero-ctas">
          <button type="button" className="btn btn-hero" onClick={onExplore}><span>Explore opportunities</span><ArrowRight size={17} aria-hidden="true" /></button>
          <button type="button" className="text-btn" onClick={scrollToAbout}><span className="play"><Play size={13} fill="currentColor" aria-hidden="true" /></span><span>See how it works</span></button>
        </motion.div>
        <motion.div {...motionProps} transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.32 }} className="trust-row">
          <div className="avatar-stack" aria-hidden="true"><span>AM</span><span>JD</span><span>SC</span><span className="plus">+</span></div>
          <div><strong>25,000+</strong><small>scholars & leaders building their global journey</small></div>
        </motion.div>
      </div>

      <div className="hero-visual">
        <motion.div animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }} transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="visual-card main-card glass-panel">
          <div className="card-topline"><span className="mini-label">FEATURED SCHOLARSHIP</span><Bookmark size={17} className="accent-bookmark" aria-hidden="true" /></div>
          <div className="visual-logo">KU</div><h3>Global Excellence Award</h3><p>Kingston University <span>· UK</span></p>
          <div className="visual-meta"><span><GraduationCap size={14} aria-hidden="true" /> Masters Degree</span><span><Zap size={14} aria-hidden="true" /> $18,000 / yr</span></div>
          <div className="progress-label"><span>Closes in 18 days</span><span className="match-percent">98% match</span></div>
          <div className="progress" role="progressbar" aria-label="Application match progress" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}><i style={{ width: '72%' }} /></div>
          <button type="button" className="card-link" onClick={onSelectFeatured}><span>View opportunity details</span><ArrowUpRight size={15} aria-hidden="true" /></button>
        </motion.div>
        <motion.div animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }} transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="floating-note note-one glass-card">
          <span className="note-icon cyan"><Check size={15} aria-hidden="true" /></span><div><b>New match found</b><small>98% fit for your profile</small></div>
        </motion.div>
        <motion.div animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }} transition={shouldReduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="floating-note note-two glass-card">
          <span className="note-icon purple"><Compass size={16} aria-hidden="true" /></span><div><b>120+ countries</b><small>Waiting to be explored</small></div>
        </motion.div>
        <span className="sparkle s1" aria-hidden="true">✦</span><span className="sparkle s2" aria-hidden="true">✦</span>
      </div>
    </section>
  );
}
