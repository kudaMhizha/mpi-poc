FROM node:lts-alpine as builder
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
WORKDIR /app
RUN echo "DATABASE_URL=${DATABASE_URL}"
RUN yarn global add nx
COPY package.json .
COPY yarn.lock .
COPY nx.json .
RUN yarn
COPY . .
RUN nx run mpi-poc:build:production

FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=builder /app/dist/apps/mpi-poc .
ENV PORT=3333
EXPOSE ${PORT}
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
CMD node ./main.js