FROM node

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

RUN npm run build

CMD ["npm", "run", "start"]