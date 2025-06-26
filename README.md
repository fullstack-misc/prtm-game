# Partie 1
## Objectif
Créer un processus automatisé avec interaction d'une *API* externe :
1. [x] Register
2. [x] Login
3. [x] Create application
4. [x] Confirm application

## Technologies
- Node.js + npm
- dotenv
- TypesScript

## Installation
### Prérequis
- [Node.js](https://nodejs.org/en/download/)

1. Cloner le dépôt :
   ```bash
   git clone git@github.com:fullstack-misc/prtm-game.git
   ```
2. Installer les dépendances :
   ```bash
   cd prtm-game
   npm install
   ```
3. Configurer les variables d'environnement :
    - Copier le fichier `.env.example` en `.env`.
    - Dans le fichier `.env`, mettre les valeurs nécessaires. Exemple de contenu :
      ```
      API_URL=https://api.dev/
      EMAIL=toto@email.com
      PASSWORD1=abcd1234
      PASSWORD2=abcd1234
      ```
      (s'assurer d'avoir le `/` à la fin de la valeur de `API_URL`)
4. Lancer l'application via l'une des deux commandes suivantes :
   ```bash
   npm run start
   ```
   ou pour le mode développement :
   ```bash
   npm run dev
   ```

## Améliorations possibles
- Ajouter des tests.
- Conteneuriser l'application avec *Docker*.
