
# UA Bouffe API
[![Build Status](https://travis-ci.org/ungdev/UA-bouffe-api.svg?branch=master)](https://travis-ci.org/ungdev/UA-bouffe-api)

API du microservice [UA Bouffe](https://github.com/ungdev/UA-bouffe)

## Installation
### Prérequis
- NodeJS
- Yarn
- MySQL
### Base de données
Créer la base de données uabouffe
```
CREATE DATABASE uabouffe CHARACTER SET utf8;
```
### Installation de l'API et des dépendances
```
git clone https://github.com/ungdev/UA-bouffe-api
cp .env.example .env
yarn
yarn seed
```
## Développement
### Démarrer l'API en développement
```
yarn dev
```
### Avant de commit
Afin de garder une certaine cohérence dans le code, on utilise EsLint et Prettier. Il faut donc bien lint le code avant de commit
```
yarn lint-fix
```
### Démarrer l'API en production
```
yarn build
yarn start
```

### Utilisation de TravisCI
TravisCI est un outil d'automatisation et de déploiement.

A chaque push sur master, TravisCI lint le code, le build et trigger okd pour déployer le code en production ainsi que Slack pour notifier l'avancée de la vérification
Il se passe en moyenne 5 minutes entre un push et un déploiement

### Diagramme de séquence lors d'une commande
![Diagramme de séquence](./docs/sequence.svg)

### Licence
Le code est sous licence MIT.
