import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos de datos
export interface Taller {
  id: number;
  nombre: string;
  descripcion: string;
  instructor: string;
  duracion_horas: number;
  precio: number;
  categoria: string;
  activo: boolean;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  tipo: 'estudiante' | 'instructor';
  activo: boolean;
}

export interface TallerCreate {
  nombre: string;
  descripcion: string;
  instructor: string;
  duracion_horas: number;
  precio: number;
  categoria: string;
}

export interface UsuarioCreate {
  nombre: string;
  email: string;
  telefono: string;
  tipo: 'estudiante' | 'instructor';
}

// Servicios para Talleres
export const talleresService = {
  // Obtener todos los talleres
  getAll: async (): Promise<Taller[]> => {
    const response = await api.get('/talleres/');
    return response.data;
  },

  // Obtener un taller por ID
  getById: async (id: number): Promise<Taller> => {
    const response = await api.get(`/talleres/${id}`);
    return response.data;
  },

  // Crear un nuevo taller
  create: async (taller: TallerCreate): Promise<Taller> => {
    const response = await api.post('/talleres/', taller);
    return response.data;
  },

  // Actualizar un taller
  update: async (id: number, taller: TallerCreate): Promise<Taller> => {
    const response = await api.put(`/talleres/${id}`, taller);
    return response.data;
  },

  // Eliminar un taller
  delete: async (id: number): Promise<void> => {
    await api.delete(`/talleres/${id}`);
  },
};

// Servicios para Usuarios
export const usuariosService = {
  // Obtener todos los usuarios
  getAll: async (): Promise<Usuario[]> => {
    const response = await api.get('/usuarios/');
    return response.data;
  },

  // Obtener un usuario por ID
  getById: async (id: number): Promise<Usuario> => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Crear un nuevo usuario
  create: async (usuario: UsuarioCreate): Promise<Usuario> => {
    const response = await api.post('/usuarios/', usuario);
    return response.data;
  },

  // Actualizar un usuario
  update: async (id: number, usuario: UsuarioCreate): Promise<Usuario> => {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  },

  // Eliminar un usuario
  delete: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
};

// Servicio de salud de la API
export const healthService = {
  check: async (): Promise<{ status: string; service: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
