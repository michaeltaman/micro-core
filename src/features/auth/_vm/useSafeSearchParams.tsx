import { useState, useEffect } from 'react';

export function useSafeSearchParams() {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  return searchParams;
}