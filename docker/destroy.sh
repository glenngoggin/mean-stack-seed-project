#!/usr/bin/env bash
while true; do
    read -p "Are you sure you want to delete all containers and images?" yn
    case $yn in
        [Yy]* ) 
            docker stop $(docker ps -a -q); 
            docker rm $(docker ps -a -q);
            docker rmi $(docker images -q);
            break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done