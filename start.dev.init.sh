#!/bin/bash

cd ./src/server && sudo npm un sqlite3 && npm i sqlite3 && cd ./../.. && pm2-dev start ecosystem.config.js