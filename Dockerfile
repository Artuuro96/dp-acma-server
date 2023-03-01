# Building layer
FROM node:16-alpine as development

ENV NODE_ENV=production

WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY src/ src/

# Build application (produces dist/ folder)
RUN npm run build

# Runtime (production) layer
FROM node:16-alpine as production

WORKDIR /app

ARG postgres_host
ARG postgres_user
ARG postgres_password
ARG postgres_db
ARG secret_token
ARG expires_in
ARG refresh_expires_in
ARG salt
ARG port
ARG username
ARG password
ARG secret_token
ARG email

##Database envs
ENV NODE_ENV=production
ENV POSTGRES_HOST=$postgres_host
ENV POSTGRES_USER=$postgres_user
ENV POSTGRES_PASSWORD=$postgres_password
ENV POSTGRES_DB=$postgres_db

#Security Envs
ENV SECRET_TOKEN=$secret_token
ENV EXPIRES_IN=$expires_in
ENV REFRESH_EXPIRES_IN=$refresh_expires_in
ENV SALT=$salt
ENV PORT=$port

# Default Super User System Envs
ENV USERNAME=$username
ENV PASSWORD=$password
ENV EMAIL=$email

# Copy dependencies files
COPY package*.json ./

# Install runtime dependecies (without dev/test dependecies)
RUN npm ci --omit=dev

# Copy production build
COPY --from=development /app/dist/ ./dist/

# Expose application port
EXPOSE 80

# Start application
CMD [ "node", "dist/main.js" ]

