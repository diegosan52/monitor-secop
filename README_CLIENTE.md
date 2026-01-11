# SECOP II Monitor - Visualizador Web

Este proyecto es una aplicación web moderna (React + Vite) para visualizar oportunidades de negocio de SECOP II en tiempo real.

## Características
- **Datos en vivo**: Conexión directa a la API de Datos Abiertos Colombia.
- **Diseño Premium**: Interfaz oscura con efectos Glassmorphism.
- **Filtros Inteligentes**: Búsqueda instantánea y resaltado de oportunidades de Alta Prioridad.

## Instalación y Ejecución Local

1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Correr en desarrollo:
    ```bash
    npm run dev
    ```

## Cómo subir a GitHub

Tienes dos opciones para subir esto a tu cuenta (`diegosan52`):

### Opción A: Usando Git Bash (Recomendado)
1.  Ve a la carpeta del proyecto.
2.  Haz clic derecho y selecciona **"Open Git Bash Here"**.
3.  Escribe: `sh setup_git.sh`
4.  Luego añade tu remoto (el link de tu repo en GitHub) y haz push como te indicará la pantalla.

### Opción B: Subida Manual (Más fácil)
1.  Crea un **nuevo repositorio** en GitHub.com (ej: `monitor-secop`).
2.  En la pantalla de configuración, busca la opción **"uploading an existing file"**.
3.  Arrastra **todos los archivos** de la carpeta `web_viewer` hacia esa ventana en el navegador.
4.  Dale "Commit changes".

### Opción C: Comandos manuales
Si ya tienes una terminal con Git configurado:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Reemplaza URL_DEL_REPO por la tuya:
git remote add origin URL_DEL_REPO
git push -u origin main
```
