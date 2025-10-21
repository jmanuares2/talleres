import { useState, useEffect } from 'react';
import { categoriasService } from '../services/api';

export const useCategorias = () => {
  const [oficios, setOficios] = useState<string[]>([]);
  const [ubicaciones, setUbicaciones] = useState<string[]>([]);
  const [niveles, setNiveles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriasService.getAll();
      setOficios(data.oficios);
      setUbicaciones(data.ubicaciones);
      setNiveles(data.niveles);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error('Error loading categorias:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  return {
    oficios,
    ubicaciones,
    niveles,
    loading,
    error,
    loadCategorias,
  };
};

