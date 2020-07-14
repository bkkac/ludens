#!/bin/bash

#Get servers list
set -f
string=$STAGE_DEPLOY_SERVER
array=(${string//,/ })

#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"; do
  echo "Deploying information to EC2 and Gitlab"
  echo "Deploy project on server ${array[i]}"
  ssh ubuntu@${array[i]} "cd  /var/www/ && sudo touch test"
done