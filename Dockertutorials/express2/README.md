    #LECTURE 15: Build an express.js image and use to create a container called "express".

    #This is the fisrt attempt for tutorial video 15.  The server.js file, Dockerfile and package.json file are all in the express folder...there is no app folder
    #The Dockerfile is as follows (with comments):
FROM node
    #Use the command FROM to specify base image (dependency) to get: can use latest tag, but gets latest by default.
COPY . .
    #use the COPY command to copy the files from this DIR to the container DIR (hence two periods used).
RUN npm install
    #Use the RUN command with npm to install the dependencies listed in the JSON file (npm install will automatically look for the JSON file).
CMD ["node", "server.js"]
    #specify default command for application- use square brackets, with arguments in double quotes 
    (prefferred format)- before we used:
    #serve ./display
    #but this creates a shell within container to run command.
    #Next step would be to build a Docker image using this Dockerfile by (in the same DIR) using the command:
    #docker build . -t benscontainer2/express


    #LECTURE 16: Layered image cache and using .dockerignore (to optimise).

    #We have move the application file(s) into a seperate app folder to seperate it from files that do not need to be copied over.  We aslo create a .dockerignore file that acts in a similar way to a .gitignore file so that files that are unnecessary are not incorporated into the docker image built.  #We also change the dockerfile to seperate out steps: the node package is installed and then run, then the app folder olny is copied, then the command(s) are set.

    #This new Docker file is:

FROM node
    #Use the command FROM to specify base image (dependency) to get: can use latest tag, but gets latest by default, as before.
COPY package.json package.json
    #For this second tutorial we split up the COPY and RUN steps: firstly copy the files required to install the node package manager, then...
RUN npm install
    #...use the RUN command with npm to install the dependencies listed in the JSON file now implicitly copied, (and so we don't need to then copy the package.json and package-lock.json files, and the node_modules folder, into the docker image, and thus the docker container).  All of these are installed once npm install runs in the container!  We can next copy the app folder, (ie the code), including the server.js file.  This means that #npm only installs once regardless if the app 
    (eg the server.js) is changed.  It will only rerun if the dependencies (ie package.json) change.
    #We can then just copy the code or app we will develop or deploy.
COPY ./app ./app
    #Again we specify the default commands in the #container using square brackets containing the arguments in double quotes.
CMD ["node", "app/server.js]
    #Next step would be to build a Docker image #using this Dockerfile by (in the same DIR) using the command:
    #docker build . -t "name_of_docker_image".
    #and using:
    #docker run --name="nameofcontainer" -d -p=3002:80 "nameofcontainer"
    #where we use the "-d" command to run the container detached so we don't lose control of the terminal, and "-p=3002:80" to map node.js port 80 to another port (chosen here as 3002).

    #LECTURE 17 and 18 (optional): Additional feature.

    #It is good practice to leave a comment in the Dockerfile to show which port will be exposed by the container (eg: npm will expose port 80).  This is for information only, and is used to help future development, (such as the port to map when building the docker image).  It is not a command! The new Dockerfile now would be:

FROM node
COPY package.json package.json
RUN npm install
COPY ./app ./app
EXPOSE 80
CMD ["node", "app/server.js]
