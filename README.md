# POC

Instructions

```
npm i
npm i -g pm2
cd utils
npm i
cd ..
pm2 start ./utils/proxy.js --watch="./utils/proxy.js"
pm2 start npm -- start
pm2 start json-server -- db.json
```

Open a browser to (the site)[http://localhost:8000]
