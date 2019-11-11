# UA Bouffe API

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

### Licence

Le code est sous licence MIT.
