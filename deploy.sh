#!/usr/bin/env sh

set -e

npm run build
cd build

# echo www.mdnice.com > CNAME

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:mdnice/mdnice.github.io.git master:master

cd -