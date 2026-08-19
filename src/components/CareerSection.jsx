import React from 'react';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';

export default function CareerSection({ onJoinFree, onExploreStudio }) {
  return (
    <section className="career section container" id="career">
      <div className="section-heading">
        <div>
          <span className="kicker">BUILT FOR AMBITION</span>
          <h2>
            More than a listing.
            <br />
            <em>A launchpad.</em>
          </h2>
        </div>
        <p className="heading-note">
          Whatever “next” means to you, Opportuna gives you the clarity, tools, and confidence to go after it.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature feature-dark glass-panel">
          <div className="feature-icon">
            <Sparkles size={20} />
          </div>
          <span className="kicker light">SMART MATCHING ENGINE</span>
          <h3>
            Less searching.
            <br />
            More finding.
          </h3>
          <p>
            Tell us what you’re looking for and our matching algorithm surfaces verified opportunities that actually fit your profile and background.
          </p>
          <button
            type="button"
            className="feature-link"
            onClick={onJoinFree}
          >
            <span>Build your profile</span>
            <ArrowRight size={15} />
          </button>

          <div className="match-card glass-card">
            <div className="match-header">
              <span>YOUR MATCHES</span>
              <span className="green-dot">● Live algorithm</span>
            </div>
            <div className="match-item">
              <span className="match-avatar">KU</span>
              <div>
                <b>Global Excellence Award</b>
                <small>98% match · Closes in 18 days</small>
              </div>
              <strong className="score-badge green">98%</strong>
            </div>
            <div className="match-item">
              <span className="match-avatar blue">UBC</span>
              <div>
                <b>Global Leaders Scholarship</b>
                <small>91% match · Closes in 31 days</small>
              </div>
              <strong className="score-badge blue">91%</strong>
            </div>
          </div>
        </div>

        <div className="feature feature-light glass-panel">
          <div className="feature-icon purple-bg">
            <Code2 size={20} />
          </div>
          <span className="kicker">FOR INSTITUTIONS & ORGANIZATIONS</span>
          <h3>
            Build something
            <br />
            <em>people remember.</em>
          </h3>
          <p>
            We design and engineer bespoke web platforms and scholar hubs that connect global talent with premier institutions.
          </p>
          <button
            type="button"
            className="feature-link dark-link"
            onClick={onExploreStudio}
          >
            <span>Explore our studio</span>
            <ArrowRight size={15} />
          </button>

          <div className="code-lines">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
