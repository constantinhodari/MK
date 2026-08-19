import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <button
            type="button"
            className="brand footer-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="brand-mark">
              <Sparkles size={16} />
            </span>
            <span>
              opportuna<span className="brand-dot">.</span>
            </span>
          </button>
          <p>
            The premier platform for global scholars,
            <br />
            ambitious creators, and remote leaders.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <b>Explore</b>
            <button type="button" onClick={() => scrollTo('opportunities')}>Scholarships</button>
            <button type="button" onClick={() => scrollTo('opportunities')}>Remote Jobs</button>
            <button type="button" onClick={() => scrollTo('opportunities')}>Fellowships</button>
            <button type="button" onClick={() => scrollTo('programs')}>Study Programs</button>
          </div>
          <div>
            <b>Solutions</b>
            <button type="button" onClick={() => scrollTo('career')}>Smart Matcher</button>
            <button type="button" onClick={() => scrollTo('services')}>Digital Studio</button>
            <button type="button" onClick={() => scrollTo('about')}>For Institutions</button>
          </div>
          <div>
            <b>Company</b>
            <button type="button" onClick={() => scrollTo('about')}>About Us</button>
            <button type="button" onClick={() => scrollTo('newsletter')}>Newsletter</button>
            <button type="button" onClick={() => scrollTo('about')}>Contact</button>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Opportuna, Inc. All rights reserved.</span>
        <span>
          Made with curiosity & care <Heart size={13} fill="currentColor" className="heart-icon" />
        </span>
        <span className="legal-links">Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
