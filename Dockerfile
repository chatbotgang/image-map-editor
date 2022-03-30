# This is for reviewers only.
# For the first time reviewing. Run `docker image build -t create-react-app:dev .` to build the image.
# Then run `docker container run -it -p 3000:3000 -p 35729:35729 -v $(pwd):/app create-react-app:dev` to run the container.
FROM node:16-alpine

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN set -xe \
    &&  apk add --no-cache --virtual .gyp \
            python3 \
            make \
            g++ \
        && yarn \
        && apk del .gyp

WORKDIR /app

EXPOSE 3000

EXPOSE 35729

CMD ["yarn", "start"]