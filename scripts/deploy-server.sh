#! /bin/bash
set -e
CNAME=sisu-server
REPOSITORY=nexus.jukk.it
CTAG=$REPOSITORY/sisu2/server
PORTS=8080:3456

if [ "$(docker ps -qa -f name=$CNAME)" ]; then
    echo ":: Found container - $CNAME"
    if [ "$(docker ps -q -f name=$CNAME)" ]; then
        echo ":: Stopping running container - $CNAME"
        docker stop $CNAME;
    fi
    echo ":: Removing stopped container - $CNAME"
    docker rm $CNAME;
fi

echo Deploying server version $1
docker login $REPOSITORY
docker pull $CTAG:$1

docker run -d --name $CNAME --env-file /home/jukki/.env -p $PORTS $CTAG:test