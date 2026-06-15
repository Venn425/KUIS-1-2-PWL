import { useState, useEffect } from 'react';
import { fetchBuku, createBuku as apiBuku, updateBuku as apiUpdateBuku, deleteBuku as apiDeleteBuku } from '../lib/api';

export function useBuku() {
  const [bukuList, setBukuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBuku();
  }, []);

  const loadBuku = async () => {
    try {
      setLoading(true);
      const res = await fetchBuku();
      setBukuList(res.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setBukuList([]);
    } finally {
      setLoading(false);
    }
  };

  const createNewBuku = async (data) => {
    try {
      await apiBuku(data);
      await loadBuku();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateExisting = async (id, data) => {
    try {
      await apiUpdateBuku(id, data);
      await loadBuku();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeBook = async (id) => {
    try {
      await apiDeleteBuku(id);
      await loadBuku();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    bukuList,
    loading,
    error,
    loadBuku,
    createNewBuku,
    updateExisting,
    removeBook,
  };
}
