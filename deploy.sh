#!/bin/bash

# 🚀 Script de déploiement Netlify - Label Conseil
# Usage: ./deploy.sh [production|preview]

set -e

echo "🚀 Déploiement Label Conseil sur Netlify..."

# Vérifier que Netlify CLI est installé
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI n'est pas installé. Installation..."
    npm install -g netlify-cli
fi

# Vérifier que l'utilisateur est connecté
if ! netlify status &> /dev/null; then
    echo "🔐 Connexion à Netlify..."
    netlify login
fi

# Build du projet
echo "🏗️ Build du projet..."
npm run build:netlify

# Préparation des fichiers
echo "📁 Préparation des fichiers..."
mkdir -p netlify/functions
cp -r dist/label-conseil/browser/* netlify/functions/

# Déploiement
if [ "$1" = "production" ]; then
    echo "🚀 Déploiement en production..."
    netlify deploy --prod --dir=dist/label-conseil/browser --functions=netlify/functions --edge-functions=netlify/edge-functions
else
    echo "🔍 Déploiement en preview..."
    netlify deploy --dir=dist/label-conseil/browser --functions=netlify/functions --edge-functions=netlify/edge-functions
fi

echo "✅ Déploiement terminé !"
echo "🌐 Vérifiez votre site sur Netlify"
