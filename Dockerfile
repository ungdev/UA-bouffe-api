FROM node:16

ENV NODE_ENV=production
WORKDIR /srv/app

RUN chown node:node .

USER node

# Node has the uid 1000
COPY --chown=node:node package.json yarn.lock ./

RUN yarn --frozen-lockfile --production=false

COPY --chown=node:node ./ ./

# Build api
RUN yarn build

# Prunes devDependencies
RUN yarn install --production --ignore-scripts --prefer-offline

CMD yarn start