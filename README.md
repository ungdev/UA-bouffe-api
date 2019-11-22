
# UA Bouffe API
![travis](https://travis-ci.org/ungdev/UA-bouffe-api.svg?branch=master)
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

### Pourquoi ne pas utiliser Socket.io
On peut voir dans les commits précédents que socket.io est utilisé et fonctionnel. Mais malheuresement, la mise en production s'est révélée très compliquée. Impossible de créer une connexion (400 handshake errors). Il a fallu donc l'abandonner pour une solution beaucoup plus bourinne.

### Licence
Le code est sous licence MIT.