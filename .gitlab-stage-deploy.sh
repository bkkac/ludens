set -f
string=$STAGE_DEPLOY_SERVER
array=(${string//,/ })

for i in "${!array[@]}"; do
  echo "Deploying information to EC2 and Gitlab"
  echo "Deploy project on server ${array[i]}"
  ssh ubuntu@${array[i]} "cd  /var/www/luden && sudo git pull \"https://cheddotechnology:cheddotechnology123@gitlab.com/privatedevelopment/luden.git\" && sudo npm i && sudo npm run build && sudo rm -R ../html/* && sudo mv build/* ../html/ && sudo systemctl restart nginx"
done
echo "Finish deploy"

curl -X POST --data-urlencode "payload={\"channel\": \"#luden-develop\", \"username\": \"beerBot\", \"text\": \":beer::beer: Staging Deployed :beer::beer: \nGo to test\", \"icon_emoji\": \":beer:\"}" https://hooks.slack.com/services/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
curl -X POST --data-urlencode "payload={\"channel\": \"#luden-test\", \"username\": \"beerBot\", \"text\": \":beer::beer: Staging Deployed :beer::beer: \nGo to test\", \"icon_emoji\": \":beer:\"}" https://hooks.slack.com/services/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