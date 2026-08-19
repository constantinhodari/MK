import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { PROGRAMS } from '../data/opportunitiesData';

export default function ProgramsSection({ onShowToast }) {
  return (
    <section className="programs section container" id="programs">
      <div className="section-heading">
        <div>
          <span className="kicker">STUDY WITHOUT BORDERS</span>
          <h2>
            Go further.
            <br />
            <em>Literally.</em>
          </h2>
        </div>
        <button
          type="button"
          className="outline-btn"
          onClick={() => onShowToast('Full degree directory coming soon!')}
        >
          <span>Explore study programs</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="program-grid">
        {PROGRAMS.map((program) => (
          <div className="program-card glass-card" key={program.id}>
            <div
              className="program-art"
              style={{ background: program.color }}
            >
              <span className="rank">{program.rank}</span>
              <span className="art-shape" />
            </div>

            <div className="program-copy">
              <div className="program-country">
                {program.country} <span>{program.duration}</span>
              </div>
              <h3>{program.title}</h3>
              <p>{program.school}</p>

              <div className="program-highlights">
                {program.highlights.map((h, idx) => (
                  <span className="highlight-chip" key={idx}>
                    {h}
                  </span>
                ))}
              </div>

              <div className="program-foot">
                <span>
                  Tuition from <b>{program.fee}</b>
                </span>
                <button
                  type="button"
                  className="program-action"
                  onClick={() => onShowToast(`${program.title} saved to your reading list.`)}
                  aria-label={`Save ${program.title}`}
                >
                  <Bookmark size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
