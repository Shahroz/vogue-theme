# Stage 0, based on Node.js, to build and compile Angular
FROM node:8.10.0 as node

WORKDIR /home

COPY package.json /home

RUN rm -rf node_modules

RUN npm install --verbose

COPY ./ /home

ARG env=prod

RUN npm run --max-old-space-size=8192 build --prod --environment $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node /home/dist/ /usr/share/nginx/html
COPY ./nginx-vogue-frontend.conf /etc/nginx/conf.d/default.conf
