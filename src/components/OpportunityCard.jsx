import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bookmark, Clock3, GraduationCap, MapPin } from 'lucide-react';

export default function OpportunityCard({ item, isSaved, onToggleSave, onSelect, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="op-card glass-card"
    >
      <div className="op-card-head">
        <div
          className="school-logo"
          style={{ background: item.color || item.tint || '#3B82F6' }}
        >
          {item.logo}
        </div>
        <button
          type="button"
          aria-label={`${isSaved ? 'Remove' : 'Save'} ${item.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(item.id);
          }}
          className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
        >
          <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <span className="card-tag">{item.type || item.tag || 'Featured'}</span>

      <h3>{item.name}</h3>
      <p className="muted">{item.school || item.company}</p>

      <div className="op-details">
        {item.country && (
          <span>
            {item.flag} {item.country}
          </span>
        )}
        {item.location && (
          <span>
            <MapPin size={13} /> {item.location}
          </span>
        )}
        {item.level && (
          <span>
            <GraduationCap size={13} /> {item.level}
          </span>
        )}
        {item.duration && (
          <span>
            <Clock3 size={13} /> {item.duration}
          </span>
        )}
      </div>

      <button
        type="button"
        className="full-link"
        onClick={() => onSelect(item)}
        aria-label={`View details for ${item.name}`}
      >
        <span>View opportunity</span>
        <ArrowUpRight size={15} />
      </button>
    </motion.article>
  );
}
