# LMS Scenarii — Player UX

Front-end joueur de la simulation de coaching commercial Métagora. Single-file
HTML/CSS/JS, sans build, sans framework.

> 🌐 **Production live** : https://lms-scenarii-viewer.vercel.app/play/hermes-demo-hermes-sophie-10-etapes

## Objectif de ce repo

Travailler **uniquement l'UX du player** : design, micro-interactions, mobile,
accessibilité, animations. Le pipeline de génération des contenus (audio/vidéo
des avatars) et la partie admin sont gérés séparément.

## Lancement local en 30 secondes

```bash
git clone https://github.com/Tony2Metagora/lms-scenarii-player.git
cd lms-scenarii-player
npx serve .
# → ouvrir http://localhost:3000/player.html?config=examples/sample-demo.json
```

Le paramètre `?config=...` charge un JSON de démo local (sans dépendre de l'API).

## Tester sur la démo de prod

Pour voir le player avec une vraie démo générée :
https://lms-scenarii-viewer.vercel.app/play/hermes-demo-hermes-sophie-10-etapes

## Structure d'un step (format JSON attendu)

Voir [examples/sample-demo.json](examples/sample-demo.json). Résumé :

```jsonc
{
  "scenarioId": "demo-test",
  "title": "Démo de test",
  "branding": { "logo": "Hermès" },
  "productName": "Musc Pallida",
  "steps": [
    {
      "step": 1,
      "nodeId": "n1",
      "phase": "Découverte",
      "phaseLabel": "Découverte 1",
      "avatarText": "Bonjour, je cherche un parfum pour le quotidien.",
      "videoUrl": null,           // URL MP4 si dispo, null = placeholder
      "isLast": false,
      "choices": [
        { "index": 1, "text": "Bien sûr...", "score": 5, "isValid": true,  "comment": "Ouverture parfaite" },
        { "index": 2, "text": "Voilà...",   "score": 2, "isValid": false, "comment": "Trop direct, manque d'écoute" },
        { "index": 3, "text": "Je vois...", "score": 0, "isValid": false, "comment": "Évite la question" },
        { "index": 4, "text": "Asseyez...", "score": 4, "isValid": false, "comment": "Bien mais pas optimal" }
      ]
    }
  ]
}
```

## Where to focus

Fichiers à modifier :
- **`player.html`** : tout est dedans (CSS + HTML + JS, 1 seul fichier)
- `assets/` : images de fond éventuelles

Zones particulièrement à challenger :
- L'**écran d'accueil** (saisie du prénom)
- L'**intro vidéo** + bouton mute + sous-titres
- Les **4 cartes de réponse** (desktop grid 2x2 vs mobile carousel swipe)
- Le **bilan final** (stats, badges, tips, badges manquants)
- **Mobile** entièrement : carousel, lisibilité, gestes

## Workflow Git

```bash
git checkout -b feature/<ce-que-tu-changes>
# tu modifies player.html
git push -u origin feature/<ce-que-tu-changes>
# ouvre une Pull Request sur GitHub
```

Tony review + merge sur `main`. Le déploiement de prod est fait manuellement
depuis le repo principal Métagora (pas de CI auto sur ce repo).

## Conventions

- Pas de framework, pas de build : tout en vanilla
- Pas d'emoji dans le code commit / les commentaires sauf si déjà présent
- Garder le single-file (CSS + JS inline dans `player.html`)
