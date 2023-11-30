FROM node:20

ENV NODE_ENV=production
WORKDIR /srv/app

RUN npm install -g pnpm

RUN chown node:node .

USER node

# Node has the uid 1000
COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --production=false

COPY --chown=node:node ./ ./

# Build api
RUN pnpm build --build-arg API_URI=http://x.x.x.x:port # Replace with your IP and port

# Prunes devDependencies
RUN pnpm install --production --ignore-scripts --prefer-offline

CMD pnpm start
