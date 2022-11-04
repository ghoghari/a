#cd ~
#cd /var/www/html/node/vkup1-node-backend
git pull "https://nodevpn:6xw&%gQ=&JRH@bitbucket.org/nodevpn/role-management-module-backend.git" master
rm -rf /var/www/html/node/vkup1-node-backend/node_modules/*
npm install
NODE_ENV=production pm2 restart www --update-env
exit