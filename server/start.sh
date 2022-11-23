#!/bin/bash

npx sequelize-cli db:seed:all
nodemon src/index.js