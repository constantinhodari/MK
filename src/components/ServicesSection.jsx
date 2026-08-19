import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

export default function ServicesSection({ onContactStudio }) {
  return (
    <section className="services section" id="services">
      <div className="container service-inner">
        <div className="service-copy">
          <span className="kicker light">OUR DIGITAL STUDIO</span>
          <h2>
            Ideas deserve
            <br />
            <em>great software.</em>
          </h2>
          <p>
            From an ambitious first idea to a global platform serving thousands, we help organizations build software experiences that stand out.
          </p>

          <div className="service-list">
            <span>
              <Check size={15} /> High-converting web experiences
            </span>
            <span>
              <Check size={15} /> Custom opportunity & scholar engines
            </span>
            <span>
              <Check size={15} /> Scalable cloud platforms & APIs
            </span>
          </div>

          <button
            type="button"
            className="light-btn"
            onClick={onContactStudio}
          >
            <span>Work with our studio</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="service-showcase glass-panel">
          <div className="showcase-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <label>opportuna.studio</label>
            </div>
            <div className="showcase-content">
              <div className="showcase-side">
                <small>PROJECT / 004</small>
                <b>
                  Move with
                  <br />
                  <em>purpose.</em>
                </b>
                <span className="showcase-arrow">↗</span>
              </div>
              <div className="showcase-orb">
                <span>◎</span>
              </div>
            </div>
          </div>

          <div className="mini-stats">
            <div>
              <b>40+</b>
              <small>Digital products shipped</small>
            </div>
            <div>
              <b>4.9 / 5.0</b>
              <small>Partner satisfaction</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
