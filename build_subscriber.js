const redis = require("redis");
const { spawn, spawnSync } = require('child_process');


// Subscribe for changes and restart
const subscriber = redis.createClient({
    port      : 6379,               
    host      : process.env.REDIS_HOST ? process.env.REDIS_HOST : "127.0.0.1"
});
// const publisher = redis.createClient();

// Set callback for message reciept
subscriber.on("message", (channel, message)=>{
    // Log msaage reciept
    console.log(`Redis message: ${message} ON ${channel}`);

    // Check success message
    if(message.toLowerCase().indexOf("success")){
        // Command to pull from github
        const git_pull= spawn("git", ["pull"]);
        
        console.log("Pulling from repo...");

        git_pull.stdout.on('data', (data) => {

            console.log(data.toString());

            // Rebuild app
            console.log("Re-installing server packages...");
            const install_server= spawnSync("npm", ["install"]);
            if(install_server.error){
                Logger.error(install_server.error);                
            }
            console.log("Server packages re-installed.");          
            
        });
            
        git_pull.stderr.on('data', (data) => {
            console.log(data);
        });
        
        git_pull.on('close', (code) => {
            console.log(`git pull process exited with code ${code}`);
        });
    }
});

// Subscribe to build_message channel
subscriber.subscribe("build_channel");

console.log("build_subscriber started..");