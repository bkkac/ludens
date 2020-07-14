set -f
string=$STAGE_DEPLOY_SERVER
array=(${string//,/ })

for i in "${!array[@]}"; do
  echo "Deploying information to EC2 and Gitlab"
  echo "Deploy project on server ${array[i]}"
  ssh ubuntu@${array[i]} "cd  /var/www/luden && sudo git pull \"https://cheddotechnology:cheddotechnology123@gitlab.com/privatedevelopment/luden.git\" && sudo npm i && sudo npm run build && sudo rm -R ../html/* && sudo mv build/* ../html/ && sudo systemctl restart nginx"
done
echo "Finish deploy"