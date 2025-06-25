# PoC – Chat Support en temps réel

## Objectif

Système de chat temps réel entre clients et agents support via WebSocket, Angular, et Spring Boot.

## Stack technique

- **Front** : Angular 17
- **Back** : Java 17 + Spring Boot
- **WebSocket** : SockJS + STOMP

---

## Lancement du projet

### Back-end

1. Ouvre un terminal à la racine du projet Spring Boot.
2. Compile et lance :

```bash
./mvnw spring-boot:run
```

(ou `mvn spring-boot:run` si Maven est installé)

L’API WebSocket tourne sur : `http://localhost:8080/chat-socket`

---

### Front-end

1. Va dans le dossier du front :

```bash
cd frontend
```

2. Installe les dépendances :

```bash
npm install
```

3. Démarre Angular :

```bash
ng serve
```

Accessible sur : `http://localhost:4200`

---

## Fonctionnement rapide

- Page d'accueil → on saisit le **nom**, le **rôle** et on choisit une **room**.
- Les messages sont échangés **en temps réel** via WebSocket.
- Chaque room (`Room 1`, `Room 2`, etc.) est isolée.
- Les messages affichent : **(rôle) nom : message**

---

## Structure des fichiers

**Front-end**
- `home.component` : page d’entrée (nom, rôle, room)
- `chat.component` : fenêtre de chat
- `chat.service.ts` : WebSocket STOMP
- `chat-message.model.ts` : interface des messages

**Back-end**
- `WebSocketConfig.java` : config WebSocket
- `ChatController.java` : réception / renvoi des messages
- `ChatDto.java` : modèle de données des messages
