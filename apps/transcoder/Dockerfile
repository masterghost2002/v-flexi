FROM node:20-alpine AS builder
WORKDIR /app
COPY ./dist ./dist
COPY package.* ./
# Our Second stage, that creates an image for production
FROM node:20-alpine AS transcoder
RUN apk update
RUN apk add
RUN apk add ffmpeg
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package* ./
RUN npm install --omit=dev
CMD npm start