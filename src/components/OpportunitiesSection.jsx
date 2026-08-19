import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronDown, RotateCcw, Search, Sparkles } from 'lucide-react';
import OpportunityCard from './OpportunityCard';

export default function OpportunitiesSection({ activeTab, setActiveTab, query, setQuery, activeFilterTag, setActiveFilterTag, showSavedOnly, setShowSavedOnly, filteredItems, savedIds, onToggleSave, onSelectOpportunity }) {
  const searchInputRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterOptions = ['Fully Funded', 'Remote', 'Closing soon', 'Undergraduate', 'Masters', 'PhD'];

  const reset = () => {
    setQuery('');
    setActiveFilterTag('');
    setActiveTab('All opportunities');
    setShowSavedOnly(false);
  };

  return (
    <section className="opportunities section container" id="opportunities">
      <div className="section-heading">
        <div>
          <span className="kicker">FIND YOUR NEXT MOVE</span>
          <h2>Opportunities with<br /><em>your name on them.</em></h2>
        </div>
        <button type="button" className="outline-btn" onClick={reset}><span>View all opportunities</span><ArrowRight size={16} aria-hidden="true" /></button>
      </div>

      <div className="search-panel glass-panel">
        <div className="search-box">
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="opportunity-search">Search opportunities</label>
          <input id="opportunity-search" ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search scholarships, jobs, locations, titles…" autoComplete="off" />
          <kbd aria-hidden="true">⌘ K</kbd>
        </div>

        <div className="tabs" role="tablist" aria-label="Opportunity category filter">
          {['All opportunities', 'Scholarships', 'Jobs', 'Internships'].map((tab) => (
            <button type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>
          ))}
        </div>

        <button type="button" className={`filter-btn ${activeFilterTag || filterOpen ? 'active' : ''}`} aria-expanded={filterOpen} aria-controls="quick-filters" onClick={() => setFilterOpen((open) => !open)}>
          <span>Filters {activeFilterTag ? `(${activeFilterTag})` : ''}</span><ChevronDown size={15} aria-hidden="true" />
        </button>
      </div>

      {filterOpen && (
        <div className="filter-panel glass-panel" id="quick-filters">
          <span>Quick filters:</span>
          {filterOptions.map((filter) => <button type="button" key={filter} className={activeFilterTag === filter ? 'chip-active' : ''} aria-pressed={activeFilterTag === filter} onClick={() => setActiveFilterTag(activeFilterTag === filter ? '' : filter)}>{filter}</button>)}
          <button type="button" className={showSavedOnly ? 'chip-active' : ''} aria-pressed={showSavedOnly} onClick={() => setShowSavedOnly((current) => !current)}>Saved</button>
          {(activeFilterTag || query || showSavedOnly) && <button type="button" className="clear-filter" onClick={reset}>Clear filters</button>}
        </div>
      )}

      <div className="results-meta" aria-live="polite">
        <strong>{filteredItems.length} opportunities found</strong><span> · {showSavedOnly ? 'Your saved list' : 'Curated for your next move'}</span>
      </div>

      <div className="cards-grid">
        {filteredItems.map((item, index) => <OpportunityCard key={item.id} item={item} index={index} isSaved={savedIds.includes(item.id)} onToggleSave={onToggleSave} onSelect={onSelectOpportunity} />)}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state glass-panel">
          <Sparkles size={32} className="empty-icon" aria-hidden="true" />
          <h3>{showSavedOnly ? 'No saved opportunities yet' : 'No opportunities found'}</h3>
          <p>{showSavedOnly ? 'Save an opportunity with the bookmark icon and it will appear here.' : 'Try a different search term or clear one of the active filters.'}</p>
          <button type="button" className="btn btn-small" onClick={reset}><RotateCcw size={15} aria-hidden="true" /> Reset filters</button>
        </div>
      )}
    </section>
  );
}
