# 🚀 Guide de Déploiement Netlify - Label Conseil

## 📋 Prérequis

- Compte Netlify
- Projet Angular configuré avec SSR
- Node.js 18+ installé

## 🔧 Configuration Locale

### 1. Installation des dépendances
```bash
npm install
```

### 2. Build de production avec SSR
```bash
npm run build:netlify
```

### 3. Test local du SSR
```bash
npm run serve:ssr:label-conseil
```

## 🌐 Déploiement sur Netlify

### Option 1: Déploiement via Git (Recommandé)

1. **Connectez votre repository GitHub/GitLab** à Netlify
2. **Configurez les paramètres de build :**
   - Build command: `npm run build:netlify`
   - Publish directory: `dist/label-conseil/browser`
   - Functions directory: `netlify/functions`

3. **Variables d'environnement :**
   ```
   NODE_VERSION=20
   NPM_VERSION=9
   NODE_ENV=production
   ANGULAR_ENV=production
   ```

### Option 2: Déploiement manuel

1. **Build du projet :**
   ```bash
   npm run build:netlify
   ```

2. **Déployez le dossier `dist/label-conseil/browser`** sur Netlify

3. **Uploadez le dossier `netlify/functions`** dans les fonctions Netlify

## 📁 Structure des Fichiers

```
label-conseil/
├── netlify/
│   └── functions/
│       ├── ssr.js          # Fonction SSR principale
│       └── package.json    # Dépendances des fonctions
├── public/
│   └── _redirects          # Redirections Netlify
├── netlify.toml            # Configuration Netlify
└── dist/
    └── label-conseil/
        ├── browser/         # Fichiers statiques
        └── server/          # Bundle serveur
```

## ⚙️ Configuration Netlify

### Fichier `netlify.toml`
- Configuration du build et des fonctions
- Headers de sécurité et performance
- Redirections et gestion des erreurs

### Fichier `_redirects`
- Redirection de toutes les routes vers la fonction SSR
- Gestion des erreurs 404

## 🔍 Vérification du Déploiement

### 1. Vérifiez les logs de build
- Assurez-vous que le build se termine sans erreur
- Vérifiez que les fonctions sont bien déployées

### 2. Testez les routes
- Page d'accueil : `/`
- À propos : `/qui-sommes-nous`
- Contact : `/contact`
- Expertises : `/expertises/[slug]`
- Expérience : `/accompagnements/experience`

### 3. Vérifiez le SSR
- Désactivez JavaScript dans votre navigateur
- Les pages doivent toujours s'afficher correctement

## 🐛 Résolution des Problèmes

### Problème : Site affiche le code Angular de base
**Solution :**
1. Vérifiez que `npm run build:netlify` fonctionne
2. Assurez-vous que le dossier `netlify/functions` contient `ssr.js`
3. Vérifiez que `netlify.toml` pointe vers `netlify/functions`

### Problème : Erreur 500 sur toutes les pages
**Solution :**
1. Vérifiez les logs des fonctions Netlify
2. Assurez-vous que `@angular/ssr` est installé
3. Vérifiez la version de Node.js (18+)

### Problème : Routes ne fonctionnent pas
**Solution :**
1. Vérifiez le fichier `_redirects`
2. Assurez-vous que toutes les routes pointent vers `/.netlify/functions/ssr`
3. Testez avec des URLs directes

## 📊 Performance

### Optimisations automatiques
- Compression des assets (CSS, JS, images)
- Cache optimisé (1 an pour les assets statiques)
- Formats d'image modernes (WebP, AVIF)
- Minification automatique

### Monitoring
- Plugin Lighthouse intégré
- Métriques de performance automatiques
- Alertes en cas de régression

## 🔄 Mise à Jour

### Processus de mise à jour
1. **Développement local :**
   ```bash
   npm run start
   ```

2. **Test du build :**
   ```bash
   npm run build:netlify
   ```

3. **Déploiement :**
   - Push sur la branche principale
   - Netlify déploie automatiquement

## 📞 Support

En cas de problème :
1. Vérifiez les logs de build Netlify
2. Consultez les logs des fonctions
3. Testez localement avec `npm run serve:ssr:label-conseil`

---

**Note :** Ce guide est spécifique à la configuration SSR d'Angular 17+ avec Netlify Functions.
