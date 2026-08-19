import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Bookmark, Check, Compass, GraduationCap, Play, Zap } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';

export default function Hero({ onExplore, onSelectFeatured }) {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero container">
      {/* 3D WebGL Background Layer */}
      <Hero3DCanvas />

      <div className="hero-copy">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="live-dot" />
          <span>The world is your classroom</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your next chapter
          <br />
          <em>starts here.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover verified global scholarships, remote roles, fellowships, and academic experiences tailored to your goals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-ctas"
        >
          <button type="button" className="btn btn-hero" onClick={onExplore}>
            <span>Explore opportunities</span>
            <ArrowRight size={17} />
          </button>
          <button type="button" className="text-btn" onClick={scrollToAbout}>
            <span className="play">
              <Play size={13} fill="currentColor" />
            </span>
            <span>See how it works</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="trust-row"
        >
          <div className="avatar-stack" aria-hidden="true">
            <span>AM</span>
            <span>JD</span>
            <span>SC</span>
            <span className="plus">+</span>
          </div>
          <div>
            <strong>25,000+</strong>
            <small>ambitious scholars & leaders advancing their global journey</small>
          </div>
        </motion.div>
      </div>

      <div className="hero-visual">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="visual-card main-card glass-panel"
        >
          <div className="card-topline">
            <span className="mini-label">FEATURED SCHOLARSHIP</span>
            <Bookmark size={17} className="accent-bookmark" />
          </div>

          <div className="visual-logo">KU</div>
          <h3>Global Excellence Award</h3>
          <p>
            Kingston University <span>· 🇬🇧 UK</span>
          </p>

          <div className="visual-meta">
            <span>
              <GraduationCap size={14} /> Masters Degree
            </span>
            <span>
              <Zap size={14} /> $18,000 / yr
            </span>
          </div>

          <div className="progress-label">
            <span>Closes in 18 days</span>
            <span className="match-percent">98% match</span>
          </div>
          <div className="progress" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}>
            <i style={{ width: '72%' }} />
          </div>

          <button
            type="button"
            className="card-link"
            onClick={onSelectFeatured}
            aria-label="View details for Global Excellence Award"
          >
            <span>View opportunity details</span>
            <ArrowUpRight size={15} />
          </button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="floating-note note-one glass-card"
        >
          <span className="note-icon cyan">
            <Check size={15} />
          </span>
          <div>
            <b>New Match Found</b>
            <small>98% fit for your profile</small>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="floating-note note-two glass-card"
        >
          <span className="note-icon purple">
            <Compass size={16} />
          </span>
          <div>
            <b>120+ Countries</b>
            <small>Waiting to be explored</small>
          </div>
        </motion.div>

        <span className="sparkle s1" aria-hidden="true">✦</span>
        <span className="sparkle s2" aria-hidden="true">✦</span>
      </div>
    </section>
  );
}
