#!/bin/bash
if [ $1 ] && [ $1 == "cold" ] && [ "$(docker ps -q -f name=mysqltest)" ]; then
    # Stop the existing container.
    echo -e "---> Removing current container for cold boot..."
    docker stop mysqltest
fi


if [ ! "$(docker ps -q -f name=mysqltest)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=mysqltest)" ] || [ "$(docker ps -aq -f status=created -f name=mysqltest)" ]; then
        # cleanup
        echo -e "---> Cleaning up old container..."
        docker rm mysqltest
    fi

########## UPDATE THIS IF YOU ARE ON WINDOWS ####################

    #homePath=$(pwd) # UNIX
    homePath=$(pwd -W) # WINDOWS

#################################################################

    # Create new sql container
    echo -e "---> Creating MySQL docker container..."
    docker run --name=mysqltest -p 3306:3306 -dit -v "$homePath":/gitBrunching jacoballen4534/mysqltest:git-brunching-latest
    echo -e "---> MySQL Started."

else
    echo -e "---> MySQL is already running..."
fi

docker exec mysqltest ./startScripts/dockerScript.sh