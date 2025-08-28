// Edge Function pour Netlify - Label Conseil SSR
// Plus performante que les fonctions traditionnelles

export default async (request, context) => {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    
    console.log('Edge Function SSR pour:', path);
    
    // Récupérer le fichier HTML statique
    const response = await context.next();
    
    if (response.status === 200) {
      // Si le fichier existe, le servir directement
      return response;
    }
    
    // Sinon, servir la page d'accueil pour le routing côté client
    const htmlResponse = await context.next({
      rewrite: '/index.html'
    });
    
    return htmlResponse;
    
  } catch (error) {
    console.error('Erreur Edge Function:', error);
    
    // Retourner une page d'erreur basique
    return new Response(`
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
    `, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  }
};
