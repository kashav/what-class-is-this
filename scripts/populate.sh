#!/usr/bin/env bash

if ! [ "$(ps -ax | grep -v grep | grep mongod)" ]; then
  echo "\`mongodb\` not running."
  exit
fi

if ! [ -x "$(command -v curl)" ]; then
  echo "\`curl\` not available."
  exit
fi

if ! [ -x "$(command -v mongoimport)" ]; then
  echo "\`mongoimport\` not available."
  exit
fi

curl https://raw.githubusercontent.com/cobalt-uoft/datasets/master/courses.json --silent | mongoimport --db wcit --collection courses --drop
