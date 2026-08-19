import React, { useState } from 'react';
import { ArrowUpRight, LayoutDashboard, Menu, Moon, Search, Sparkles, Sun, X } from 'lucide-react';

export default function Navbar({
  dark,
  toggleTheme,
  onOpenAuth,
  onOpenAdmin,
  onTriggerSearch,
  savedCount
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Primary navigation">
        <button
          type="button"
          className="brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Opportuna home"
        >
          <span className="brand-mark">
            <Sparkles size={16} />
          </span>
          <span>
            opportuna<span className="brand-dot">.</span>
          </span>
        </button>

        <div
          id="primary-navigation"
          className={`nav-links ${mobileOpen ? 'open' : ''}`}
        >
          <button type="button" onClick={() => scrollTo('opportunities')}>
            Scholarships
          </button>
          <button type="button" onClick={() => scrollTo('opportunities')}>
            Jobs & Internships
          </button>
          <button type="button" onClick={() => scrollTo('career')}>
            Smart Matcher
          </button>
          <button type="button" onClick={() => scrollTo('programs')}>
            Programs
          </button>
          <button type="button" onClick={() => scrollTo('services')}>
            Studio
          </button>
          <button type="button" onClick={() => scrollTo('about')}>
            About
          </button>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="search-trigger-btn"
            onClick={onTriggerSearch}
            aria-label="Search opportunities (⌘K)"
          >
            <Search size={15} />
            <span className="search-shortcut">⌘K</span>
          </button>

          <button
            type="button"
            className="admin-trigger"
            onClick={onOpenAdmin}
            aria-label="Open admin workspace dashboard"
          >
            <LayoutDashboard size={15} />
            <span>Admin</span>
          </button>

          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="login"
            onClick={() => onOpenAuth('login')}
          >
            Log in
          </button>

          <button
            type="button"
            className="btn btn-small"
            onClick={() => onOpenAuth('register')}
          >
            <span>Join free</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
