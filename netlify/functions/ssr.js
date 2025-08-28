const { APP_BASE_HREF } = require('@angular/common');
const { CommonEngine } = require('@angular/ssr');
const express = require('express');
const { fileURLToPath } = require('url');
const { dirname, join, resolve } = require('path');
const fs = require('fs');
const path = require('path');

// Configuration des chemins
const serverDistFolder = __dirname;
const browserDistFolder = path.join(serverDistFolder, '../../dist/label-conseil/browser');
const indexHtml = path.join(browserDistFolder, 'index.html');

// Vérifier que les fichiers existent
if (!fs.existsSync(browserDistFolder)) {
  console.error('Dossier browser non trouvé:', browserDistFolder);
}

if (!fs.existsSync(indexHtml)) {
  console.error('Fichier index.html non trouvé:', indexHtml);
}

// Créer l'engine Angular SSR
const commonEngine = new CommonEngine();

// Fonction principale pour Netlify
exports.handler = async (event, context) => {
  try {
    // Récupérer l'URL de la requête
    const url = event.path;
    const queryString = event.queryStringParameters ? 
      '?' + Object.entries(event.queryStringParameters)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&') : '';
    
    const fullUrl = url + queryString;
    
    console.log('Rendu SSR pour:', fullUrl);

    // Rendre la page avec Angular SSR
    const html = await commonEngine.render({
      bootstrap: () => import('../../dist/label-conseil/server/server.mjs'),
      documentFilePath: indexHtml,
      url: fullUrl,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    });

    // Retourner la réponse HTML
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
        'X-Robots-Tag': 'index, follow',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      },
      body: html
    };

  } catch (error) {
    console.error('Erreur SSR:', error);
    
    // En cas d'erreur, essayer de servir le fichier statique
    try {
      const staticHtml = fs.readFileSync(indexHtml, 'utf8');
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=0, s-maxage=3600'
        },
        body: staticHtml
      };
    } catch (staticError) {
      console.error('Erreur lecture fichier statique:', staticError);
      
      // Retourner une page d'erreur basique
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        },
        body: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="utf-8">
            <title>Erreur - Label Conseil</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: #f5f5f5; 
              }
              .error { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
              }
              h1 { color: #e74c3c; }
              .btn { 
                display: inline-block; 
                padding: 10px 20px; 
                background: #3498db; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px; 
                margin-top: 20px; 
              }
            </style>
          </head>
          <body>
            <div class="error">
              <h1>⚠️ Erreur de serveur</h1>
              <p>Une erreur s'est produite lors du chargement de la page.</p>
              <p>Veuillez réessayer dans quelques instants.</p>
              <a href="/" class="btn">Retour à l'accueil</a>
            </div>
          </body>
          </html>
        `
      };
    }
  }
};
