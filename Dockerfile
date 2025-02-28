FROM oven/bun:alpine as build

WORKDIR /app

COPY package.json ./
COPY bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY /.nginx/default.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]