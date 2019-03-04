#!/usr/bin/env sh

set -e

npm run build
cd build

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:mdbeautify/mdbeautify.github.io.git master:master

cd -