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
  nivel: string;
  rating: number;
  estudiantes: number;
  fecha: string;
  ubicacion: string;
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
  nivel: string;
  rating: number;
  estudiantes: number;
  fecha: string;
  ubicacion: string;
}

export interface UsuarioCreate {
  nombre: string;
  email: string;
  telefono: string;
  tipo: 'estudiante' | 'instructor';
}

export interface Servicio {
  id: number;
  nombre: string;
  servicio: string;
  especialidad: string;
  precio: number;
  rating: number;
  trabajos: number;
  ubicacion: string;
  descripcion: string;
  disponibilidad: string;
  telefono: string;
  activo: boolean;
}

export interface ServicioCreate {
  nombre: string;
  servicio: string;
  especialidad: string;
  precio: number;
  rating: number;
  trabajos: number;
  ubicacion: string;
  descripcion: string;
  disponibilidad: string;
  telefono: string;
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

// Servicios para Servicios Profesionales
export const serviciosService = {
  // Obtener todos los servicios
  getAll: async (): Promise<Servicio[]> => {
    const response = await api.get('/servicios/');
    return response.data;
  },

  // Obtener un servicio por ID
  getById: async (id: number): Promise<Servicio> => {
    const response = await api.get(`/servicios/${id}`);
    return response.data;
  },

  // Crear un nuevo servicio
  create: async (servicio: ServicioCreate): Promise<Servicio> => {
    const response = await api.post('/servicios/', servicio);
    return response.data;
  },

  // Actualizar un servicio
  update: async (id: number, servicio: ServicioCreate): Promise<Servicio> => {
    const response = await api.put(`/servicios/${id}`, servicio);
    return response.data;
  },

  // Eliminar un servicio
  delete: async (id: number): Promise<void> => {
    await api.delete(`/servicios/${id}`);
  },
};

// Servicio de estadísticas
export const estadisticasService = {
  get: async (): Promise<{ talleres_disponibles: number; vecinos_conectados: number; oficios_diferentes: number }> => {
    const response = await api.get('/estadisticas/');
    return response.data;
  },
};

// Servicio de categorías
export const categoriasService = {
  getOficios: async (): Promise<string[]> => {
    const response = await api.get('/categorias/oficios');
    return response.data;
  },
  getUbicaciones: async (): Promise<string[]> => {
    const response = await api.get('/categorias/ubicaciones');
    return response.data;
  },
  getNiveles: async (): Promise<string[]> => {
    const response = await api.get('/categorias/niveles');
    return response.data;
  },
  getAll: async (): Promise<{ oficios: string[]; ubicaciones: string[]; niveles: string[] }> => {
    const response = await api.get('/categorias/');
    return response.data;
  },
};

// Interface para testimonios
export interface Testimonio {
  id: number;
  texto: string;
  autor: string;
  ubicacion: string;
}

// Servicio de testimonios
export const testimoniosService = {
  getAll: async (): Promise<Testimonio[]> => {
    const response = await api.get('/testimonios/');
    return response.data;
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
