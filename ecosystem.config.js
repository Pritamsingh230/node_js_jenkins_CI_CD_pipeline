module.exports = {
    apps : [
      {
        name: "web_server",
        script: "server.js",
        watch: true,
        // Delay between restarts (10secs)
        watch_delay: 10000,
        env: {
          NODE_ENV: "production"
        }
      },
      {
        name: "build_subscriber",
        script: "build_subscriber.js",
        env: {
          REDIS_HOST: "172.16.238.10"
        }
      }
    ]  
  };
  