# Node.js Jenkins CI/CD Pipeline Boilerplate

Boilerplate code for Node.js CI/CD using Jenkins implemented as [Docker](https://www.docker.com/) containers 
and ochestrated using [Docker Compose](https://docs.docker.com/compose/).  

Three containers are setup:

- Web Server Container: Contains a sample express server and a build subscriber service, managed by [PM2](https://pm2.keymetrics.io/) daemon process manager. 
        The server has a single endpoint at the root uri "/" which returns a json welcome message, and its root directory is 
        "watched" for file changes by the pm2 daemon. Whenever there's a file change (e.g. git pull), the server is restarted.  
        The [build subscriber service](./build_subscriber.js) is a redis client which listens on a specified build channel (build_channel) 
        and automatically git-pulls whenever a "Success" message is sent onto the build channel. The web server is built from the root [Dockerfile](./Dockerfile) 
        and published to the host computer's port 5000. 

- Redis Server Container: Redis server which facilitates communication between the Jenkins server and the web server. 
        It is configured with a fixed IP address to enable all other services access it with ease.

- Docker Service Container: Docker is setup as a container within Docker to facilitate Jenkins build slaves. 

- Jenkins Server Container: Handles project build and testing in a Jenkins pipeline using containers spawned from the docker service container. 
        Whenever a build succeeds, the [publish build service](./jenkins/scripts/publish_build.js) sends a "Success" message onto the build channel 
        in the post build section of the pipeline. The Jenkins container is built from this [Dockerfile](./jenkins/Dockerfile) and the Jenkins server 
        is published to the host computer's port 8080.


## Usage
- Setup your web server by replacing [server.js](./server.js) and [Dockerfile](./Dockerfile) as appropriate.
- Setup Jeknins as described in the [official Jenkins documentation](https://www.jenkins.io/doc/book/using/).
- Edit [Jenkinsfile](./jenkins/Jenkinsfile) to include your build and testing tasks.
- Start the services by running:
```
docker-compose up
```
