set -e

yarn build

cd dist

git init
git add .
git commit -m 'deploy'

git push -f git@github.com:Thanh1203/game_prroject.git master:gh-pages

cd -