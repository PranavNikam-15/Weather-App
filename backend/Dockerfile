# Use official Java 21 JDK image
FROM eclipse-temurin:21-jdk-jammy

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies (cache optimization)
COPY pom.xml .
RUN apt-get update && apt-get install -y maven && mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the project
RUN mvn clean package -DskipTests

# Expose the port Render will provide
EXPOSE 8080

# Run the Spring Boot JAR
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]