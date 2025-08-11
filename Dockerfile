FROM node:lts-alpine3.18 AS builder

WORKDIR /app
COPY . .
RUN npm install

ARG RPC_ENDPOINT=
ENV VITE_API_ENDPOINT=${RPC_ENDPOINT}
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
RUN rm -f /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d

ENTRYPOINT ["nginx", "-g", "daemon off;"]
