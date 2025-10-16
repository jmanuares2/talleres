import { useState, useEffect } from 'react';
import { talleresService, Taller, TallerCreate } from '../services/api';

export const useTalleres = () => {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar talleres
  const loadTalleres = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await talleresService.getAll();
      setTalleres(data);
    } catch (err) {
      setError('Error al cargar los talleres');
      console.error('Error loading talleres:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear taller
  const createTaller = async (tallerData: TallerCreate) => {
    try {
      setError(null);
      const newTaller = await talleresService.create(tallerData);
      setTalleres(prev => [...prev, newTaller]);
      return newTaller;
    } catch (err) {
      setError('Error al crear el taller');
      console.error('Error creating taller:', err);
      throw err;
    }
  };

  // Actualizar taller
  const updateTaller = async (id: number, tallerData: TallerCreate) => {
    try {
      setError(null);
      const updatedTaller = await talleresService.update(id, tallerData);
      setTalleres(prev => 
        prev.map(taller => taller.id === id ? updatedTaller : taller)
      );
      return updatedTaller;
    } catch (err) {
      setError('Error al actualizar el taller');
      console.error('Error updating taller:', err);
      throw err;
    }
  };

  // Eliminar taller
  const deleteTaller = async (id: number) => {
    try {
      setError(null);
      await talleresService.delete(id);
      setTalleres(prev => prev.filter(taller => taller.id !== id));
    } catch (err) {
      setError('Error al eliminar el taller');
      console.error('Error deleting taller:', err);
      throw err;
    }
  };

  // Cargar talleres al montar el componente
  useEffect(() => {
    loadTalleres();
  }, []);

  return {
    talleres,
    loading,
    error,
    loadTalleres,
    createTaller,
    updateTaller,
    deleteTaller,
  };
};
