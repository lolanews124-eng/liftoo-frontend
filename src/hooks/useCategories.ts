import { useEffect, useState } from 'react';
import { customerApi } from '../api/client';
import type { Category } from '../api/types';
import { FALLBACK_CATEGORIES } from '../utils/serviceCatalog';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cats = await customerApi.getCategories();
        if (!cancelled) {
          setCategories(cats.length ? cats : FALLBACK_CATEGORIES);
          setFromApi(cats.length > 0);
        }
      } catch {
        if (!cancelled) {
          setCategories(FALLBACK_CATEGORIES);
          setFromApi(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading, fromApi };
}
