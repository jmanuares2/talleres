# Talleres Backend API

Backend API para el sistema de talleres desarrollado con FastAPI y PostgreSQL (Neon).

## 🚀 Características

- **FastAPI**: Framework moderno y rápido para APIs
- **PostgreSQL**: Base de datos con Neon (cloud)
- **SQLAlchemy**: ORM para Python
- **Alembic**: Migraciones de base de datos
- **Pydantic**: Validación de datos
- **CORS**: Configurado para frontend React

## 📁 Estructura del Proyecto

```
backend/
├── api/
│   └── v1/
│       ├── api.py
│       └── endpoints/
│           ├── talleres.py
│           └── usuarios.py
├── alembic/
│   ├── versions/
│   ├── env.py
│   └── script.py.mako
├── main.py
├── database.py
├── models.py
├── requirements.txt
└── env.example
```

## 🛠️ Instalación

### 1. Instalar Python (si no lo tienes)
```bash
# Descargar desde python.org o usar chocolatey
choco install python
```

### 2. Crear entorno virtual
```bash
python -m venv venv
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
copy env.example .env

# Editar .env con tus datos de Neon DB
```

## 🗄️ Configuración de Neon DB

1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia la connection string
5. Pégala en tu archivo `.env`:

```env
DATABASE_URL=postgresql://user:password@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 🚀 Ejecutar el proyecto

### Desarrollo
```bash
# Con uvicorn directamente
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# O usando el script de package.json
pnpm dev
```

### Producción
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📊 Migraciones de Base de Datos

### Inicializar Alembic
```bash
alembic init alembic
```

### Crear migración
```bash
alembic revision --autogenerate -m "Initial migration"
```

### Aplicar migraciones
```bash
alembic upgrade head
```

## 🔗 Endpoints de la API

### Talleres
- `GET /api/v1/talleres/` - Obtener todos los talleres
- `GET /api/v1/talleres/{id}` - Obtener un taller específico
- `POST /api/v1/talleres/` - Crear nuevo taller
- `PUT /api/v1/talleres/{id}` - Actualizar taller
- `DELETE /api/v1/talleres/{id}` - Eliminar taller

### Usuarios
- `GET /api/v1/usuarios/` - Obtener todos los usuarios
- `GET /api/v1/usuarios/{id}` - Obtener un usuario específico
- `POST /api/v1/usuarios/` - Crear nuevo usuario
- `PUT /api/v1/usuarios/{id}` - Actualizar usuario
- `DELETE /api/v1/usuarios/{id}` - Eliminar usuario

## 📚 Documentación

Una vez que ejecutes el servidor, puedes ver la documentación interactiva en:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Testing

```bash
# Ejecutar tests
pytest

# Con coverage
pytest --cov=.
```

## 🔧 Variables de Entorno

```env
# Base de datos
DATABASE_URL=postgresql://user:password@host:port/database

# API
API_V1_STR=/api/v1
PROJECT_NAME=Talleres API
VERSION=1.0.0

# Seguridad
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
