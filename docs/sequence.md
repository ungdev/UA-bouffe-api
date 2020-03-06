# Generated with MermaidJS (https://mermaidjs.github.io/)

sequenceDiagram
participant DB as Database
participant S as Serveur
participant B1 as Borne Bouffe
participant B2 as Borne Préparation
B1->>S: Nouvelle commande (HTTP)
S->>DB: Nouvelle commande
S-->>B1: Commandes en cours (socket)
B1->>B1: Mise à jour Redux
S-->>B2: Commandes en cours (socket)
B2->>B2: Mise à jour Redux