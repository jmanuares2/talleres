import { useState, useEffect } from 'react';
import { testimoniosService, Testimonio } from '../services/api';

export const useTestimonios = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTestimonios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimoniosService.getAll();
      setTestimonios(data);
    } catch (err) {
      setError('Error al cargar los testimonios');
      console.error('Error loading testimonios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonios();
  }, []);

  return {
    testimonios,
    loading,
    error,
    loadTestimonios,
  };
};

