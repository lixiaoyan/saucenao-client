#!/bin/bash

shopt -s globstar

for FILE in ./assets/**/*.svg; do
  inkscape "$FILE" -d 384 -e "${FILE/.svg/.png}"
done
