#!/bin/bash
echo "Inicializando repositorio Git..."

# 1. Iniciar Git
git init
git add .
git commit -m "Versión Inicial - Monitor SECOP II"
git branch -M main

echo ""
echo "---------------------------------------------------------"
echo "¡Repositorio local listo!"
echo "Para subirlo a GitHub, ejecuta el siguiente comando"
echo "reemplazando la URL por la de tu repositorio:"
echo ""
echo "git remote add origin https://github.com/diegosan52/NOMBRE_DEL_REPO.git"
echo "git push -u origin main"
echo "---------------------------------------------------------"
read -p "Presiona Enter para cerrar..."
