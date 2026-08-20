import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PLATFORM_STATS } from '../data/opportunitiesData';

function useCountUp(value, trigger) {
  const [displayValue, setDisplayValue] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return value;
    }
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return value;
    return '0';
  });
  
  useEffect(() => {
    if (!trigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const match = value.match(/^(\D*)([\d,]+)(\D*)$/);
    if (!match) return;
    
    const [, prefix, digits, suffix] = match;
    const num = parseFloat(digits.replace(/,/g, ''));
    if (isNaN(num)) return;
    
    let startTime;
    const duration = 1500;
    let animationFrame;
    
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentVal = Math.floor(easedProgress * num);
      const formattedNum = currentVal.toLocaleString();
      
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, trigger]);
  
  return displayValue;
}

function StatCard({ stat, idx }) {
  const [trigger, setTrigger] = useState(false);
  const displayValue = useCountUp(stat.value, trigger);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setTrigger(true)}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="stat-card"
    >
      <strong>{displayValue}</strong>
      <small>{stat.label}</small>
      <span className="stat-change">{stat.change}</span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="stats container" aria-label="Platform Statistics">
      {PLATFORM_STATS.map((stat, idx) => (
        <StatCard key={stat.label} stat={stat} idx={idx} />
      ))}
    </section>
  );
}
