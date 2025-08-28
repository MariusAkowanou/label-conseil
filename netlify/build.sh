#!/bin/bash

# Script de build pour Netlify - Label Conseil
set -e

echo "🚀 Démarrage du build Netlify..."

# Vérifier la version de Node.js
echo "📋 Version Node.js: $(node --version)"
echo "📋 Version NPM: $(npm --version)"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci

# Vérifier que Angular CLI est installé
echo "🔍 Vérification d'Angular CLI..."
if ! npx ng version &> /dev/null; then
    echo "❌ Angular CLI non trouvé, installation..."
    npm install -g @angular/cli@17
fi

# Build de production
echo "🏗️ Build de production..."
npx ng build --configuration production

# Build SSR
echo "🔄 Build SSR..."
npx ng build --configuration production --ssr

# Préparation des fichiers pour Netlify
echo "📁 Préparation des fichiers..."
mkdir -p netlify/functions
cp -r dist/label-conseil/browser/* netlify/functions/

echo "✅ Build terminé avec succès !"
echo "📂 Dossier de sortie: dist/label-conseil/browser"
echo "🔧 Fonctions: netlify/functions"
