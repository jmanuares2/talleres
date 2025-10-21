import { useState, useEffect } from 'react';
import { serviciosService, Servicio, ServicioCreate } from '../services/api';

export const useServicios = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar servicios
  const loadServicios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await serviciosService.getAll();
      setServicios(data);
    } catch (err) {
      setError('Error al cargar los servicios');
      console.error('Error loading servicios:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear servicio
  const createServicio = async (servicioData: ServicioCreate) => {
    try {
      setError(null);
      const newServicio = await serviciosService.create(servicioData);
      setServicios(prev => [...prev, newServicio]);
      return newServicio;
    } catch (err) {
      setError('Error al crear el servicio');
      console.error('Error creating servicio:', err);
      throw err;
    }
  };

  // Actualizar servicio
  const updateServicio = async (id: number, servicioData: ServicioCreate) => {
    try {
      setError(null);
      const updatedServicio = await serviciosService.update(id, servicioData);
      setServicios(prev => 
        prev.map(servicio => servicio.id === id ? updatedServicio : servicio)
      );
      return updatedServicio;
    } catch (err) {
      setError('Error al actualizar el servicio');
      console.error('Error updating servicio:', err);
      throw err;
    }
  };

  // Eliminar servicio
  const deleteServicio = async (id: number) => {
    try {
      setError(null);
      await serviciosService.delete(id);
      setServicios(prev => prev.filter(servicio => servicio.id !== id));
    } catch (err) {
      setError('Error al eliminar el servicio');
      console.error('Error deleting servicio:', err);
      throw err;
    }
  };

  // Cargar servicios al montar el componente
  useEffect(() => {
    loadServicios();
  }, []);

  return {
    servicios,
    loading,
    error,
    loadServicios,
    createServicio,
    updateServicio,
    deleteServicio,
  };
};

