import { useCallback, useEffect, useMemo, useState } from 'react';
import { INTERNSHIPS, JOBS, SCHOLARSHIPS } from '../data/opportunitiesData';

const STORAGE_KEY = 'global-scholars-hub-saved-items';

export function useOpportunities() {
  const [activeTab, setActiveTab] = useState('All opportunities');
  const [query, setQuery] = useState('');
  const [activeFilterTag, setActiveFilterTag] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Storage can be unavailable in privacy-restricted contexts; UI still works in memory.
    }
  }, [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  }, []);

  const allItems = useMemo(() => [...SCHOLARSHIPS, ...JOBS, ...INTERNSHIPS], []);

  const filteredItems = useMemo(() => {
    let list = allItems;

    if (activeTab === 'Scholarships') list = SCHOLARSHIPS;
    if (activeTab === 'Jobs') list = JOBS;
    if (activeTab === 'Internships') list = INTERNSHIPS;

    if (showSavedOnly) {
      list = list.filter((item) => savedIds.includes(item.id));
    }

    if (activeFilterTag) {
      const tagLower = activeFilterTag.toLowerCase();
      list = list.filter((item) => {
        if (activeFilterTag === 'Closing soon') {
          const daysMatch = item.deadline?.match(/(\d+)/);
          return Boolean(daysMatch && Number.parseInt(daysMatch[1], 10) <= 21);
        }
        return [item.type, item.tag, item.location, item.level, item.deadline]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(tagLower));
      });
    }

    if (query.trim()) {
      const normalizedQuery = query.toLowerCase().trim();
      list = list.filter((item) =>
        [item.name, item.school, item.company, item.country, item.location, item.description]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery))
      );
    }

    return list;
  }, [activeTab, activeFilterTag, allItems, query, savedIds, showSavedOnly]);

  return {
    activeTab,
    setActiveTab,
    query,
    setQuery,
    activeFilterTag,
    setActiveFilterTag,
    showSavedOnly,
    setShowSavedOnly,
    savedIds,
    toggleSave,
    filteredItems,
    totalCount: filteredItems.length,
  };
}
