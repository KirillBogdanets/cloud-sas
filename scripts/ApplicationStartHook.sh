#!/bin/bash

set -e

cd /usr/share/nginx/html

npm install

npm run start:serivces > /dev/null 2> /dev/null < /dev/null &