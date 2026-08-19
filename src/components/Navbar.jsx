import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Bookmark, LayoutDashboard, Menu, Moon, Search, Sparkles, Sun, X } from 'lucide-react';

export default function Navbar({ dark, toggleTheme, onOpenAuth, onOpenAdmin, onTriggerSearch, savedCount, showSavedOnly, onToggleSaved }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Primary navigation">
        <button type="button" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Global Scholars Hub home">
          <span className="brand-mark" aria-hidden="true"><Sparkles size={16} /></span>
          <span>global scholars<span className="brand-dot">.</span></span>
        </button>

        <div id="primary-navigation" className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <button type="button" onClick={() => scrollTo('opportunities')}>Scholarships</button>
          <button type="button" onClick={() => scrollTo('opportunities')}>Jobs & Internships</button>
          <button type="button" onClick={() => scrollTo('career')}>Smart Matcher</button>
          <button type="button" onClick={() => scrollTo('services')}>Studio</button>
          <button type="button" onClick={() => scrollTo('about')}>About</button>
        </div>

        <div className="nav-actions">
          <button type="button" className="search-trigger-btn" onClick={onTriggerSearch} aria-label="Search opportunities (Control K)">
            <Search size={15} aria-hidden="true" /><span className="search-shortcut">⌘K</span>
          </button>
          <button type="button" className="admin-trigger" onClick={onOpenAdmin} aria-label="Open admin workspace dashboard">
            <LayoutDashboard size={15} aria-hidden="true" /><span>Admin</span>
          </button>
          <button type="button" className="icon-btn theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button type="button" className={`icon-btn saved-trigger ${showSavedOnly ? 'active' : ''}`} onClick={onToggleSaved} aria-pressed={showSavedOnly} aria-label={showSavedOnly ? 'Show all opportunities' : `Show saved opportunities (${savedCount})`}>
            <Bookmark size={18} fill={showSavedOnly ? 'currentColor' : 'none'} aria-hidden="true" />
            {savedCount > 0 && <span className="saved-badge" aria-hidden="true">{savedCount}</span>}
          </button>
          <button type="button" className="login" onClick={() => onOpenAuth('login')}>Log in</button>
          <button type="button" className="btn btn-small" onClick={() => onOpenAuth('register')}><span>Join free</span><ArrowUpRight size={15} aria-hidden="true" /></button>
          <button type="button" className="menu-btn" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="primary-navigation">
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
