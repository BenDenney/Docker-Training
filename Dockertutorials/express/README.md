An express.js Docker container called "express"

This is the fisrt attempt for tutorial video 15.  The server.js file, Dockerfile and package.json file are all in the express folder...there is no app folder
The Dockerfile is as follows (with comments):
FROM node
#Use the command FROM to specify base image (dependency) to get: can use latest tag, but gets latest by #default.
COPY . .
#use the COPY command to copy the files from this DIR to the container DIR (hence two periods used).
RUN npm install
#Use the RUN command with npm to install the dependencies listed in the JSON file (npm install will #automatically look for the JSON file).
CMD ["node", "server.js"]
#specify default command for application- use square brackets, with arguments in double quotes (prefferred #format)- before we used:
#serve ./display
#but this creates a shell within container to run command.
#Next step would be to build a Docker image using this Dockerfile by (in the same DIR) using the command:
#docker build . -t benscontainer2/express