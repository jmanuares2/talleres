import { useState, useEffect } from 'react';
import { estadisticasService } from '../services/api';

export const useEstadisticas = () => {
  const [estadisticas, setEstadisticas] = useState({
    talleres_disponibles: 0,
    vecinos_conectados: 0,
    oficios_diferentes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEstadisticas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await estadisticasService.get();
      setEstadisticas(data);
    } catch (err) {
      setError('Error al cargar las estadísticas');
      console.error('Error loading estadisticas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEstadisticas();
  }, []);

  return {
    estadisticas,
    loading,
    error,
    loadEstadisticas,
  };
};

