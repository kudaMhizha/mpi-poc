# Builder Stage
FROM node:18 as builder

WORKDIR /app

# Copy only the necessary files for package installation
COPY package.json yarn.lock nx.json ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Generate Prisma client and build the application
RUN npx prisma generate --schema=./libs/prisma/prisma/schema.prisma && yarn build backend --skip-nx-cache

# Runtime Stage
FROM node:18-slim as runtime

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Copy only necessary files from the builder stage
#COPY --from=builder /app/.env .env
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/dist/apps/backend .
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/libs/prisma/prisma ./prisma

ARG DATABASE_URL

ENV PORT=4000
ENV DATABASE_URL=$DATABASE_URL
RUN echo "DATABASE_URL=${DATABASE_URL}"

# Run database migration and start the application
RUN npx prisma migrate deploy --schema=./prisma/schema.prisma
CMD node ./main.js