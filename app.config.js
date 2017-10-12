module.exports = {
  apps: [
    {
      name:   "proxy",
      script: "./utils/proxy.js",
      watch:  true,
      env: {
        NODE_ENV: 'develoment'
      }
    },
    {
      name: "poc",
      script: "node_modules/.bin/json-server --watch db.json --port 8001",
      args: ["--watch db.json", "--port 8001"]
    }
  ]
}