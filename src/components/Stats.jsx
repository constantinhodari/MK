import React from 'react';
import { motion } from 'framer-motion';
import { PLATFORM_STATS } from '../data/opportunitiesData';

export default function Stats() {
  return (
    <section className="stats container" aria-label="Platform Statistics">
      {PLATFORM_STATS.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="stat-card"
        >
          <strong>{stat.value}</strong>
          <small>{stat.label}</small>
          <span className="stat-change">{stat.change}</span>
        </motion.div>
      ))}
    </section>
  );
}
