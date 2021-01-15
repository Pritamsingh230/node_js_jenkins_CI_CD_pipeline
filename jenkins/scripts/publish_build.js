const redis = require("redis");

const publisher = redis.createClient({
    port      : 6379,               
    host      : process.env.REDIS_HOST ? process.env.REDIS_HOST : "127.0.0.1"
});
// const publisher = redis.createClient();

// Publish Message
publisher.publish("build_channel", "Build Success");

// Exit process after 3 seconds (to allow message publish)
setTimeout( ()=> {process.exit();}, 3000);