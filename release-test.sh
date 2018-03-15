npm run build;
cd ./dist;zip -r dist.zip *;
scp dist.zip root@121.196.219.208:/var/www/html/h5/activity/2018/coverSolicitation
ssh root@121.196.219.208 'cd /var/www/html/h5/activity/2018/coverSolicitation;unzip -o dist.zip'
