FROM maven:3.8.3-openjdk-17 AS builder

# Set work directory inside the container
WORKDIR /backend

# Copy the Maven files first to leverage Docker cache
COPY pom.xml .
COPY src ./src

# Package the app (skip tests if needed)
RUN mvn clean package -DskipTests


FROM openjdk:17

# Set working directory
WORKDIR /backend

# Copy only the final jar from the previous stage
COPY --from=builder /backend/target/Forum-0.0.1-SNAPSHOT.jar forumentreprise.jar



# Expose app port (optional)
EXPOSE 9090




#ADD target/Forum-0.0.1-SNAPSHOT.jar forumentreprise.jar
ENTRYPOINT ["java", "-jar", "forumentreprise.jar"]