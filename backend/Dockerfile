FROM Node:24
WORKDIR .

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN ['npm', 'run', 'start']