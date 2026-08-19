import React from 'react';

export default function AboutSection() {
  return (
    <section className="about section container" id="about">
      <div className="about-quote glass-panel">
        <span className="quote-mark">“</span>
        <h2>
          Opportunity is everywhere.
          <br />
          <em>Access shouldn&apos;t be rare.</em>
        </h2>
        <p>
          We’re building the bridge between potential and global possibility — one person, one scholarship, one opportunity at a time.
        </p>
        <div className="signature">
          <span className="signature-mark">opportuna</span>
          <small>
            Made for the ones
            <br />
            going places.
          </small>
        </div>
      </div>

      <div className="about-points">
        <div className="about-point-card glass-card">
          <span>01</span>
          <h3>Curated, not cluttered.</h3>
          <p>
            Every opportunity is manually verified by our curation team so you spend less time filtering spam and more time applying.
          </p>
        </div>
        <div className="about-point-card glass-card">
          <span>02</span>
          <h3>Global by default.</h3>
          <p>
            From Kigali to Copenhagen, your next chapter shouldn’t be limited by geography or local borders.
          </p>
        </div>
        <div className="about-point-card glass-card">
          <span>03</span>
          <h3>Tools for the journey.</h3>
          <p>
            Build a stronger profile, stay organized with deadline trackers, and present your story with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
