import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Database Configuration
DATABASE_URL = "postgresql://neondb_owner:npg_EFnpqBH08fLg@ep-young-night-adrq641s-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# API Configuration
API_V1_STR = "/api/v1"
PROJECT_NAME = "Talleres API"
VERSION = "1.0.0"

# Security
SECRET_KEY = "your-secret-key-here-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
