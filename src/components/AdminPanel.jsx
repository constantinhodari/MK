import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, BarChart3, Bell, BookOpen, BriefcaseBusiness, Check, ChevronRight,
  CircleDollarSign, FileText, GraduationCap, LayoutDashboard, LogOut, Menu, MoreHorizontal,
  Search, Settings, Sparkles, Trash2, Users, X
} from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

const initialRows = [
  { id: '1', title: 'Global Excellence Award', type: 'Scholarship', status: 'Published', views: '12,804', icon: GraduationCap },
  { id: '2', title: 'Senior Product Designer · Airbnb', type: 'Job', status: 'Published', views: '8,291', icon: BriefcaseBusiness },
  { id: '3', title: 'MSc Data Science & AI', type: 'Scholarship', status: 'Review', views: '5,670', icon: GraduationCap },
  { id: '4', title: 'Women in STEM Fellowship', type: 'Scholarship', status: 'Published', views: '4,893', icon: GraduationCap },
];

function AdminWorkspace({ section, rows, search, onBack, onAction, onEdit, onDelete }) {
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
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button type="button" className="module-action" onClick={() => onEdit(row)}>
                    Edit <ArrowUpRight size={14} />
                  </button>
                  <button type="button" className="module-action" onClick={() => onDelete(row)} title="Delete" aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
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
            This section isn&apos;t built out in this preview yet.
          </p>
        </section>
      )}
    </div>
  );
}

// Note: This admin panel is a prototype interface.
// Real auth and authorization must be implemented once the server/ exists.
// The current "preview mode" guard is cosmetic only.
export default function AdminPanel({ onClose, onAction }) {
  const [previewAccepted, setPreviewAccepted] = useState(false);
  const [activeNav, setActiveNav] = useState('Overview');
  const [search, setSearch] = useState('');
  const [range] = useState('Last 30 days');
  const [rows, setRows] = useState(initialRows);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsCleared, setNotificationsCleared] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);

  const notificationRef = useRef(null);
  const previewRef = useRef(null);
  const adminRef = useRef(null);

  useFocusTrap(previewRef, !previewAccepted, onClose);
  useFocusTrap(adminRef, previewAccepted, onClose);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const reviewCount = rows.filter((r) => r.status === 'Review').length;
  const hasUnread = !notificationsCleared && reviewCount > 0;

  const dynamicMetrics = [
    { label: 'Total active users', value: '25,481', change: '+12.8%', icon: Users, tone: 'blue' },
    { label: 'Listed opportunities', value: rows.length.toLocaleString(), change: '+8.4%', icon: BriefcaseBusiness, tone: 'cyan' },
    { label: 'Applications submitted', value: '8,294', change: '+24.6%', icon: FileText, tone: 'purple' },
    { label: 'Platform revenue', value: '$48,290', change: '+18.2%', icon: CircleDollarSign, tone: 'green' },
  ];

  const dynamicNavItems = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Opportunities', icon: BriefcaseBusiness, count: rows.length.toLocaleString() },
    { label: 'Users', icon: Users },
    { label: 'Applications', icon: FileText },
    { label: 'Content', icon: BookOpen },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Settings', icon: Settings },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

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
    anchor.download = 'opportuna-opportunities-export.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    onAction('Opportunities list exported');
  };

  const handleEdit = (row) => {
    setEditingRow(row);
    setShowAdd(true);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete "${row.title}"?`)) {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      onAction(`Opportunity "${row.title}" deleted`);
    }
  };

  const addOpportunity = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get('title');
    const type = form.get('type');
    
    if (editingRow) {
      setRows((prev) => prev.map(r => r.id === editingRow.id ? { ...r, title, type, icon: type === 'Job' ? BriefcaseBusiness : type === 'Internship' ? Sparkles : GraduationCap } : r));
      setShowAdd(false);
      setEditingRow(null);
      onAction(`Opportunity "${title}" updated`);
    } else {
      setRows((prev) => [
        {
          id: String(Date.now()),
          title,
          type,
          status: 'Review',
          views: '0',
          icon: type === 'Job' ? BriefcaseBusiness : type === 'Internship' ? Sparkles : GraduationCap
        },
        ...prev
      ]);
      setNotificationsCleared(false);
      setShowAdd(false);
      onAction(`Opportunity "${title}" created for review`);
    }
  };

  if (!previewAccepted) {
    return (
      <div ref={previewRef} className="admin-overlay" role="dialog" aria-modal="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', textAlign: 'center' }}>
          <h2>Admin Preview Mode</h2>
          <p style={{ margin: '1rem 0', opacity: 0.8 }}>
            This is an unauthenticated preview of the admin dashboard. No backend is connected.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button type="button" className="admin-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-small" onClick={() => setPreviewAccepted(true)}>Enter preview mode</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={adminRef} className="admin-overlay" role="dialog" aria-modal="true" aria-labelledby="admin-title">
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
          {dynamicNavItems.map(({ label, icon: Icon, count }) => (
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
          <button type="button" onClick={() => { onAction('Signed out of admin mode'); onClose(); }}>
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar glass-panel">
          <button type="button" className="admin-mobile-title" onClick={() => setMobileNav(true)}>
            <Menu size={20} /> Navigation
          </button>

          <div className="admin-search" style={{ visibility: activeNav === 'Opportunities' ? 'visible' : 'hidden' }}>
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search admin records..."
              aria-label="Search admin records"
            />
          </div>

          <div className="admin-top-actions">
            <div className="notification-wrap" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {hasUnread && <i className="badge-dot" />}
              </button>

              {showNotifications && (
                <div className="notification-popover glass-panel">
                  <b>System Notifications</b>
                  <p>
                    <Check size={14} className="accent-check" /> {reviewCount} opportunities need review
                  </p>
                  <p>
                    <Users size={14} /> 128 new scholars joined today (Sample)
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      setNotificationsCleared(true);
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
              <h1 id="admin-title">{greeting}, Alex.</h1>
              <p>
                {activeNav === 'Overview'
                  ? 'Here is sample performance data across your platform today.'
                  : `${activeNav} workspace controls.`}
              </p>
            </div>
            <div className="admin-heading-actions">
              <button type="button" className="admin-secondary" onClick={exportReport}>
                Export report <ArrowUpRight size={15} />
              </button>
              {activeNav === 'Opportunities' && (
                <button type="button" className="btn btn-small" onClick={() => setShowAdd(true)}>
                  Add opportunity +
                </button>
              )}
            </div>
          </div>

          <div className="admin-metrics">
            {dynamicMetrics.map(({ label, value, change, icon: Icon, tone }) => (
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
                    <span className="kicker">SAMPLE DATA</span>
                    <h2>Recent Activity (Preview)</h2>
                  </div>
                  <button type="button" className="module-action" style={{ padding: '0.4rem' }} onClick={() => onAction('Activity menu clicked (not implemented)')} aria-label="Activity menu">
                    <MoreHorizontal size={18} />
                  </button>
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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>
      </section>

      {showAdd && (
        <div
          className="admin-form-backdrop glass-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowAdd(false);
              setEditingRow(null);
            }
          }}
        >
          <form className="admin-add-form glass-panel" onSubmit={addOpportunity} key={editingRow?.id || 'new'}>
            <button
              type="button"
              className="modal-close"
              onClick={() => { setShowAdd(false); setEditingRow(null); }}
              aria-label="Close form"
            >
              <X size={18} />
            </button>
            <span className="kicker">CONTENT MANAGEMENT</span>
            <h2>{editingRow ? 'Edit Opportunity' : 'Add New Opportunity'}</h2>

            <label htmlFor="admin-title-input">Opportunity Title</label>
            <input
              id="admin-title-input"
              name="title"
              required
              defaultValue={editingRow?.title || ''}
              placeholder="e.g. ETH Excellence Fellowship"
            />

            <label htmlFor="admin-type-input">Category</label>
            <select id="admin-type-input" name="type" defaultValue={editingRow?.type || 'Scholarship'}>
              <option>Scholarship</option>
              <option>Job</option>
              <option>Internship</option>
            </select>

            <div className="admin-form-actions">
              <button type="button" className="admin-secondary" onClick={() => { setShowAdd(false); setEditingRow(null); }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-small">
                <span>{editingRow ? 'Save Changes' : 'Save for Review'}</span>
                <Check size={15} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
