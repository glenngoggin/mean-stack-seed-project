# To show only running containers use:
docker ps

# To show all containers use:
docker ps -a

# Remote into container
docker exec -it <mycontainer> bash
docker exec -it front_end bash
docker exec -it api bash
docker exec -it database bash

# Stop all containers
docker stop $(docker ps -a -q)

# Delete all containers
docker rm $(docker ps -a -q)

# Delete all images
docker rmi $(docker images -q)

# Start one or more stopped containers
docker start api

# Run everything	
docker-compose up -d	

# See all logs	
docker-compose logs -f	

# Logs for one componenent	
docker logs -f api	

# Stop everything (keep data)	
docker-compose stop	

# Stop and remove ALL data	This will reset your database!
docker-compose down	




 

