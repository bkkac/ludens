#!/bin/bash

#Get servers list
set -f
string=$STAGE_DEPLOY_SERVER
array=(${string//,/ })

#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"; do
  echo "Deploying information to EC2 and Gitlab"
  echo "Deploy project on server ${array[i]}"
  ssh ubuntu@${array[i]} "cd  /var/www/ludens && sudo git pull \"https://cheddotechnology:cheddotechnology123@gitlab.com/privatedevelopment/luden.git\" && sudo npm i && sudo npm run build && sudo rm -R ../html/* && sudo mv build/* ../html/ && sudo systemctl restart nginx"
done
echo "Finish deploy"