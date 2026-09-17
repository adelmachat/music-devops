# Use the Eclipse Temurin JRE 17 base image
FROM eclipse-temurin:17-jre  

# Set the working directory inside the container to /app
WORKDIR /app  


# Copy the JAR file from the target directory to the container (image) and rename it to app.jar
COPY target/*.jar app.jar 

# COPY target/web-site-music-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 for the application
EXPOSE 8080 

# Set the entry point to run the JAR file using the java command in container
ENTRYPOINT ["java","-jar","app.jar"]

