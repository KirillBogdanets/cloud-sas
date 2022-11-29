FROM node:16

WORKDIR /usr/app

COPY src src
COPY package.json package.json
COPY index.js index.js
COPY node_modules node_modules
COPY run.sh run.sh

CMD ["./run.sh"]
