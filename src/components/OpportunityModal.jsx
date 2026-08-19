import React, { useEffect, useRef } from 'react';
import { ArrowRight, Bookmark, Check, X } from 'lucide-react';

export default function OpportunityModal({
  opportunity,
  isSaved,
  onToggleSave,
  onClose,
  onApply
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!opportunity) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector('.modal-close');
      closeBtn?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [opportunity, onClose]);

  if (!opportunity) return null;

  return (
    <div
      className="modal-backdrop glass-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        ref={modalRef}
        className="opportunity-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close opportunity details modal"
        >
          <X size={18} />
        </button>

        <span className="card-tag">
          {opportunity.type || opportunity.tag || 'Opportunity'}
        </span>

        <h2 id="modal-title">{opportunity.name}</h2>
        <p className="muted">
          {opportunity.school || opportunity.company}{' '}
          {opportunity.country ? `· ${opportunity.flag || ''} ${opportunity.country}` : ''}
        </p>

        <div className="opportunity-summary">
          <span>
            <strong>{opportunity.amount || opportunity.salary || opportunity.tag || 'Open role'}</strong>
            <small>Compensation / Value</small>
          </span>
          <span>
            <strong>{opportunity.deadline || opportunity.duration || 'Apply now'}</strong>
            <small>Timeline</small>
          </span>
        </div>

        <p className="modal-copy">
          {opportunity.description ||
            'This opportunity is curated for ambitious people looking for a meaningful next move. Create a profile to check your fit, save it, and track your application.'}
        </p>

        {(opportunity.eligibility || opportunity.requirements) && (
          <div className="modal-requirements">
            <b>{opportunity.eligibility ? 'Eligibility:' : 'Requirements:'}</b>
            <ul>
              {(opportunity.eligibility || opportunity.requirements).map((req, i) => (
                <li key={i}>
                  <Check size={14} className="accent-check" /> {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className={`outline-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => onToggleSave(opportunity.id)}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved in Profile' : 'Save Opportunity'}</span>
          </button>

          <button type="button" className="btn" onClick={onApply}>
            <span>Apply Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
