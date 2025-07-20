# 🔨 Étape 1 : Build de l'application
FROM node:22-alpine AS builder

# Déclarer les variables passées par DigitalOcean
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_API_URL

# Injecter dans l'environnement pour le build
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Build de Next.js avec les bonnes variables
RUN npm run build

# 🚀 Étape 2 : Image finale pour l'exécution
FROM node:22-alpine AS runner

WORKDIR /app

# Copier uniquement ce qu'il faut pour exécuter Next.js
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules

# Port exposé
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start"]