FROM node:18.3.0

ADD . /opt/app
WORKDIR /opt/app

RUN npm install --production

CMD ["npm", "start"]
