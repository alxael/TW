# Tema

## Set up

First, you must have Docker and Node.js installed on your system. Testing was done using Node.js version 21 and Docker version 4.25.

Before starting the application you must start the MongoDB database by running `sudo docker compose -f docker/docker-compose.yml up`. If the containers successfully start, you should now have a MongoDB instance running and a Mongo Express client for viewing the database. You may access the Mongo Express instance on `localhost:8081` with the credentials `user:password`.

Now, you must add a `.env` file containing the minimum required environment variables needed for the application to run. Below you can find a sample `.env` file:

```
PORT = 8080
DEBUG = true
TOKEN = <some random string>
```

Now, you may start the application by running the command `npm run start` or, for a more insightful experience, by running the `npm run debug` command.
