import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronDown, RotateCcw, Search, Sparkles } from 'lucide-react';
import OpportunityCard from './OpportunityCard';

export default function OpportunitiesSection({
  activeTab,
  setActiveTab,
  query,
  setQuery,
  activeFilterTag,
  setActiveFilterTag,
  filteredItems,
  savedIds,
  onToggleSave,
  onSelectOpportunity
}) {
  const searchInputRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filterOptions = ['Fully Funded', 'Remote', 'Closing soon', 'Undergraduate', 'Masters', 'PhD'];

  return (
    <section className="opportunities section container" id="opportunities">
      <div className="section-heading">
        <div>
          <span className="kicker">FIND YOUR NEXT MOVE</span>
          <h2>
            Opportunities with
            <br />
            <em>your name on them.</em>
          </h2>
        </div>
        <button
          type="button"
          className="outline-btn"
          onClick={() => {
            setActiveTab('All opportunities');
            setQuery('');
            setActiveFilterTag('');
          }}
        >
          <span>View all opportunities</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="search-panel glass-panel">
        <div className="search-box">
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="opportunity-search">
            Search opportunities
          </label>
          <input
            id="opportunity-search"
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scholarships, jobs, locations, titles..."
          />
          <kbd aria-hidden="true">⌘ K</kbd>
        </div>

        <div className="tabs" role="tablist" aria-label="Opportunity category filter">
          {['All opportunities', 'Scholarships', 'Jobs', 'Internships'].map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
              key={tab}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`filter-btn ${activeFilterTag || filterOpen ? 'active' : ''}`}
          aria-label="Open opportunity quick filters"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <span>Filters {activeFilterTag ? `(${activeFilterTag})` : ''}</span>
          <ChevronDown size={15} />
        </button>
      </div>

      {filterOpen && (
        <div className="filter-panel glass-panel">
          <span>Quick filters:</span>
          {filterOptions.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilterTag === filter ? 'chip-active' : ''}
              onClick={() => {
                setActiveFilterTag(activeFilterTag === filter ? '' : filter);
              }}
            >
              {filter}
            </button>
          ))}
          {(activeFilterTag || query) && (
            <button
              type="button"
              className="clear-filter"
              onClick={() => {
                setQuery('');
                setActiveFilterTag('');
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      <div className="results-meta" aria-live="polite">
        <strong>{filteredItems.length} opportunities found</strong>
        <span> · Curated for your next move</span>
      </div>

      <div className="cards-grid">
        {filteredItems.map((item, index) => (
          <OpportunityCard
            key={item.id}
            item={item}
            index={index}
            isSaved={savedIds.includes(item.id)}
            onToggleSave={onToggleSave}
            onSelect={onSelectOpportunity}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state glass-panel">
          <Sparkles size={32} className="empty-icon" />
          <h3>No opportunities found matching your search</h3>
          <p>Try adjusting your search keywords or clearing active filters to see all listings.</p>
          <button
            type="button"
            className="btn btn-small"
            onClick={() => {
              setQuery('');
              setActiveFilterTag('');
              setActiveTab('All opportunities');
            }}
          >
            <RotateCcw size={15} /> Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
