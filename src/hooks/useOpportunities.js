import { useCallback, useEffect, useMemo, useState } from 'react';
import { INTERNSHIPS, JOBS, SCHOLARSHIPS } from '../data/opportunitiesData';

export function useOpportunities() {
  const [activeTab, setActiveTab] = useState('All opportunities');
  const [query, setQuery] = useState('');
  const [activeFilterTag, setActiveFilterTag] = useState('');
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = window.localStorage.getItem('opportuna-saved-items');
      return stored ? JSON.parse(stored) : ['sch-1', 'job-1'];
    } catch {
      return ['sch-1', 'job-1'];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('opportuna-saved-items', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  }, []);

  const allItems = useMemo(() => [...SCHOLARSHIPS, ...JOBS, ...INTERNSHIPS], []);

  const filteredItems = useMemo(() => {
    let list = allItems;

    if (activeTab === 'Scholarships') {
      list = SCHOLARSHIPS;
    } else if (activeTab === 'Jobs') {
      list = JOBS;
    } else if (activeTab === 'Internships') {
      list = INTERNSHIPS;
    }

    if (activeFilterTag) {
      const tagLower = activeFilterTag.toLowerCase();
      list = list.filter(
        (item) =>
          (item.type && item.type.toLowerCase().includes(tagLower)) ||
          (item.tag && item.tag.toLowerCase().includes(tagLower)) ||
          (item.deadline && item.deadline.toLowerCase().includes(tagLower))
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.school && item.school.toLowerCase().includes(q)) ||
          (item.company && item.company.toLowerCase().includes(q)) ||
          (item.country && item.country.toLowerCase().includes(q)) ||
          (item.location && item.location.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allItems, activeTab, activeFilterTag, query]);

  return {
    activeTab,
    setActiveTab,
    query,
    setQuery,
    activeFilterTag,
    setActiveFilterTag,
    savedIds,
    toggleSave,
    filteredItems,
    totalCount: filteredItems.length
  };
}
