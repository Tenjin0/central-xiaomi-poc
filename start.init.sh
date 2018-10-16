#!/bin/bash
sudo rm -rf api/node_modules/sqlite3
cd api && npm i && cd ..
cd client && npm i && cd ..
npm i -S api
npm i -S client
