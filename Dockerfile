# Build Frontend
FROM node:lts-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY frontend/ ./


# Build frontend for production
RUN npm run build

FROM nginx:alpine AS frontend

WORKDIR /usr/share/nginx/html

COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

ENV NODE_ENV production

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# Python Backend
FROM python:3.11-slim AS backend

WORKDIR /app

 
# Install system dependencies + pip install
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose backend port
EXPOSE 8000

# Run backend with Gunicorn
CMD ["gunicorn", "artikel_project.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]

