FROM node:lts-alpine as build
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]
COPY .env.production ./.env
RUN npm install --silent --dev
COPY . .
RUN npm run build && npm prune --production

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN rm -rf ./*
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
