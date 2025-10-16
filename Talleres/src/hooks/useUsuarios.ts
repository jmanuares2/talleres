import { useState, useEffect } from 'react';
import { usuariosService, Usuario, UsuarioCreate } from '../services/api';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuarios
  const loadUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usuariosService.getAll();
      setUsuarios(data);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error loading usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear usuario
  const createUsuario = async (usuarioData: UsuarioCreate) => {
    try {
      setError(null);
      const newUsuario = await usuariosService.create(usuarioData);
      setUsuarios(prev => [...prev, newUsuario]);
      return newUsuario;
    } catch (err) {
      setError('Error al crear el usuario');
      console.error('Error creating usuario:', err);
      throw err;
    }
  };

  // Actualizar usuario
  const updateUsuario = async (id: number, usuarioData: UsuarioCreate) => {
    try {
      setError(null);
      const updatedUsuario = await usuariosService.update(id, usuarioData);
      setUsuarios(prev => 
        prev.map(usuario => usuario.id === id ? updatedUsuario : usuario)
      );
      return updatedUsuario;
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error('Error updating usuario:', err);
      throw err;
    }
  };

  // Eliminar usuario
  const deleteUsuario = async (id: number) => {
    try {
      setError(null);
      await usuariosService.delete(id);
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error('Error deleting usuario:', err);
      throw err;
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    loadUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  };
};
