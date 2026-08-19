import React, { useMemo, useState } from 'react';
import {
  Activity, ArrowUpRight, BarChart3, Bell, BookOpen, BriefcaseBusiness, Check, ChevronRight,
  CircleDollarSign, FileText, GraduationCap, LayoutDashboard, LogOut, Menu, MoreHorizontal,
  Search, Settings, Sparkles, Users, X
} from 'lucide-react';

const metrics = [
  { label: 'Total active users', value: '25,481', change: '+12.8%', icon: Users, tone: 'blue' },
  { label: 'Listed opportunities', value: '2,846', change: '+8.4%', icon: BriefcaseBusiness, tone: 'cyan' },
  { label: 'Applications submitted', value: '8,294', change: '+24.6%', icon: FileText, tone: 'purple' },
  { label: 'Platform revenue', value: '$48,290', change: '+18.2%', icon: CircleDollarSign, tone: 'green' },
];

const initialRows = [
  { id: '1', title: 'Global Excellence Award', type: 'Scholarship', status: 'Published', views: '12,804', icon: GraduationCap },
  { id: '2', title: 'Senior Product Designer · Airbnb', type: 'Job', status: 'Published', views: '8,291', icon: BriefcaseBusiness },
  { id: '3', title: 'MSc Data Science & AI', type: 'Study Program', status: 'Review', views: '5,670', icon: BookOpen },
  { id: '4', title: 'Women in STEM Fellowship', type: 'Scholarship', status: 'Published', views: '4,893', icon: GraduationCap },
];

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Opportunities', icon: BriefcaseBusiness, count: '2,846' },
  { label: 'Users', icon: Users },
  { label: 'Applications', icon: FileText },
  { label: 'Content', icon: BookOpen },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
];

function AdminWorkspace({ section, rows, search, onBack, onAction }) {
  const filteredRows = rows.filter((row) =>
    `${row.title} ${row.type} ${row.status}`.toLowerCase().includes(search.toLowerCase())
  );

  const sectionCopy = {
    Opportunities: ['OPPORTUNITY MANAGEMENT', 'Manage every listing in one place.', 'Publish, archive, edit, and review global opportunities.'],
    Users: ['USER MANAGEMENT', 'People powering the platform.', 'Review scholar accounts, roles, activity, and permissions.'],
    Applications: ['APPLICATIONS', 'Keep every submission moving.', 'Review candidate submissions and track candidate progress.'],
    Content: ['CONTENT STUDIO', 'Keep the hub fresh and curated.', 'Manage resources, guides, testimonials, and study paths.'],
    Analytics: ['PLATFORM ANALYTICS', 'Track growth & performance.', 'Monitor traffic engagement, click-through rates, and conversion metrics.'],
    Settings: ['WORKSPACE SETTINGS', 'Configure platform preferences.', 'Manage security, notifications, API keys, and workspace roles.'],
  }[section] || ['WORKSPACE', section, 'Manage workspace settings'];

  return (
    <div className="admin-module-screen">
      <div className="module-header">
        <button type="button" className="module-back" onClick={onBack}>
          <ChevronRight size={15} style={{ transform: 'rotate(180deg)' }} /> Back to overview
        </button>
        <span className="kicker">{sectionCopy[0]}</span>
        <h2>{sectionCopy[1]}</h2>
        <p>{sectionCopy[2]}</p>
      </div>

      {section === 'Opportunities' && (
        <section className="module-card glass-panel">
          <div className="module-card-heading">
            <h3>
              All opportunities <span>{filteredRows.length}</span>
            </h3>
            <button type="button" className="btn btn-small" onClick={() => onAction('Add opportunity modal opened')}>
              Add opportunity +
            </button>
          </div>
          <div className="module-list">
            {filteredRows.map((row) => (
              <div className="module-row" key={row.id}>
                <span className="table-icon">
                  <row.icon size={15} />
                </span>
                <div>
                  <b>{row.title}</b>
                  <small>
                    {row.type} · {row.views} views
                  </small>
                </div>
                <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
                <button type="button" className="module-action" onClick={() => onAction(`Editing ${row.title}`)}>
                  Edit <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {section !== 'Opportunities' && (
        <section className="module-card glass-panel">
          <div className="module-card-heading">
            <h3>{section} Overview</h3>
          </div>
          <p className="muted" style={{ padding: '1.5rem' }}>
            {section} management interface is fully configured and active.
          </p>
        </section>
      )}
    </div>
  );
}

export default function AdminPanel({ onClose, onAction }) {
  const [activeNav, setActiveNav] = useState('Overview');
  const [search, setSearch] = useState('');
  const [range, setRange] = useState('Last 30 days');
  const [rows, setRows] = useState(initialRows);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const filteredRows = useMemo(
    () => rows.filter((row) => `${row.title} ${row.type} ${row.status}`.toLowerCase().includes(search.toLowerCase())),
    [rows, search]
  );

  const selectNav = (label) => {
    setActiveNav(label);
    setMobileNav(false);
    onAction(`${label} workspace selected`);
  };

  const exportReport = () => {
    const csv = [
      'Opportunity,Type,Status,Views',
      ...rows.map((r) => `"${r.title}","${r.type}","${r.status}","${r.views}"`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'opportuna-metrics-export.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    onAction('CSV Report exported successfully');
  };

  const addOpportunity = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get('title');
    const type = form.get('type');
    setRows((prev) => [
      {
        id: String(Date.now()),
        title,
        type,
        status: 'Review',
        views: '0',
        icon: type === 'Job' ? BriefcaseBusiness : type === 'Study Program' ? BookOpen : GraduationCap
      },
      ...prev
    ]);
    setShowAdd(false);
    onAction(`Opportunity "${title}" created for review`);
  };

  return (
    <div className="admin-overlay" role="dialog" aria-modal="true" aria-labelledby="admin-title">
      <aside className={`admin-sidebar glass-panel ${mobileNav ? 'mobile-open' : ''}`}>
        <div className="admin-logo">
          <span className="brand-mark">
            <Sparkles size={16} />
          </span>
          <span>
            opportuna<span className="brand-dot">.</span>
          </span>
          <button
            type="button"
            className="admin-mobile-close"
            onClick={() => setMobileNav(false)}
            aria-label="Close admin menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="admin-workspace">
          <span className="admin-avatar">GS</span>
          <div>
            <b>Global Scholars Hub</b>
            <small>Administrator workspace</small>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {navItems.map(({ label, icon: Icon, count }) => (
            <button
              key={label}
              className={activeNav === label ? 'active' : ''}
              type="button"
              onClick={() => selectNav(label)}
            >
              <Icon size={17} />
              <span>{label}</span>
              {count && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <button type="button" onClick={() => onAction('Signed out of admin mode')}>
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar glass-panel">
          <button type="button" className="admin-mobile-title" onClick={() => setMobileNav(true)}>
            <Menu size={20} /> Navigation
          </button>

          <div className="admin-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search admin records..."
              aria-label="Search admin records"
            />
          </div>

          <div className="admin-top-actions">
            <div className="notification-wrap">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell size={18} />
                <i className="badge-dot" />
              </button>

              {showNotifications && (
                <div className="notification-popover glass-panel">
                  <b>System Notifications</b>
                  <p>
                    <Check size={14} className="accent-check" /> 3 opportunities need review
                  </p>
                  <p>
                    <Users size={14} /> 128 new scholars joined today
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      onAction('All notifications cleared');
                    }}
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </div>

            <span className="admin-user">
              <span className="admin-avatar">AM</span>
              <b>Alex Morgan</b>
            </span>

            <button type="button" className="admin-close" onClick={onClose} aria-label="Close admin dashboard">
              <X size={19} />
            </button>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-heading">
            <div>
              <span className="kicker">ADMIN DASHBOARD</span>
              <h1 id="admin-title">Good morning, Alex.</h1>
              <p>
                {activeNav === 'Overview'
                  ? 'Here is real-time performance across your platform today.'
                  : `${activeNav} workspace controls.`}
              </p>
            </div>
            <div className="admin-heading-actions">
              <button type="button" className="admin-secondary" onClick={exportReport}>
                Export report <ArrowUpRight size={15} />
              </button>
              <button type="button" className="btn btn-small" onClick={() => setShowAdd(true)}>
                Add opportunity +
              </button>
            </div>
          </div>

          <div className="admin-metrics">
            {metrics.map(({ label, value, change, icon: Icon, tone }) => (
              <div className="admin-metric glass-card" key={label}>
                <div className={`metric-icon ${tone}`}>
                  <Icon size={18} />
                </div>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>
                  <b>↗ {change}</b> vs last month
                </small>
              </div>
            ))}
          </div>

          {activeNav === 'Overview' && (
            <div className="admin-grid">
              <section className="admin-card chart-card glass-panel">
                <div className="admin-card-heading">
                  <div>
                    <span className="kicker">PLATFORM METRICS</span>
                    <h2>Growth & Engagements</h2>
                  </div>
                  <span className="range-badge">{range}</span>
                </div>

                <div className="chart-legend">
                  <span>
                    <i className="legend-blue" /> Monthly Users
                  </span>
                  <span>
                    <i className="legend-cyan" /> Applications
                  </span>
                </div>

                <div className="chart">
                  <div className="chart-lines">
                    <svg viewBox="0 0 600 170" preserveAspectRatio="none" aria-label="Platform analytics graph">
                      <path
                        className="chart-area"
                        d="M0,140 C45,130 55,112 96,119 S150,92 190,104 S230,68 275,85 S320,58 360,66 S410,38 450,56 S500,25 550,42 S580,18 600,20 L600,170 L0,170 Z"
                      />
                      <path
                        className="chart-line"
                        d="M0,140 C45,130 55,112 96,119 S150,92 190,104 S230,68 275,85 S320,58 360,66 S410,38 450,56 S500,25 550,42 S580,18 600,20"
                      />
                      <path
                        className="chart-line secondary"
                        d="M0,153 C45,145 60,134 96,141 S150,118 190,130 S230,100 275,111 S320,94 360,103 S410,83 450,91 S500,67 550,81 S580,52 600,61"
                      />
                    </svg>
                  </div>
                </div>
              </section>

              <section className="admin-card activity-card glass-panel">
                <div className="admin-card-heading">
                  <div>
                    <span className="kicker">LIVE FEED</span>
                    <h2>Recent Activity</h2>
                  </div>
                  <MoreHorizontal size={18} />
                </div>
                <div className="activity-list">
                  <div>
                    <span className="activity-icon green">
                      <Check size={14} />
                    </span>
                    <p>
                      <b>New opportunity published</b>
                      <small>Global Excellence Award · 8 min ago</small>
                    </p>
                  </div>
                  <div>
                    <span className="activity-icon purple">
                      <Users size={14} />
                    </span>
                    <p>
                      <b>128 new users joined</b>
                      <small>Across 12 countries · 34 min ago</small>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeNav !== 'Overview' && (
            <AdminWorkspace
              section={activeNav}
              rows={rows}
              search={search}
              onBack={() => setActiveNav('Overview')}
              onAction={onAction}
            />
          )}
        </main>
      </section>

      {showAdd && (
        <div
          className="admin-form-backdrop glass-backdrop"
          onMouseDown={(e) => e.target === e.currentTarget && setShowAdd(false)}
        >
          <form className="admin-add-form glass-panel" onSubmit={addOpportunity}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowAdd(false)}
              aria-label="Close add form"
            >
              <X size={18} />
            </button>
            <span className="kicker">CONTENT MANAGEMENT</span>
            <h2>Add New Opportunity</h2>

            <label htmlFor="admin-title-input">Opportunity Title</label>
            <input
              id="admin-title-input"
              name="title"
              required
              placeholder="e.g. ETH Excellence Fellowship"
            />

            <label htmlFor="admin-type-input">Category</label>
            <select id="admin-type-input" name="type" defaultValue="Scholarship">
              <option>Scholarship</option>
              <option>Job</option>
              <option>Internship</option>
              <option>Study Program</option>
            </select>

            <div className="admin-form-actions">
              <button type="button" className="admin-secondary" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-small">
                <span>Save for Review</span>
                <Check size={15} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
