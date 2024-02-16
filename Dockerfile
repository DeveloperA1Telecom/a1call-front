FROM node
WORKDIR /var/app
COPY package.json ./
RUN npm i
RUN npm i -g @quasar/app-webpack@^3.0.0
# Twice - because of the nuances of the quasar compiler.
CMD npm run dev && npm run dev 