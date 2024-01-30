pipeline {
    agent any
    environment {
        APP_NAME = 'synergy_cooperative_frontend'
        DOCKER_REGISTRY_URL = "${DOCKER_REGISTRY_URL}"
        BUILD_NO = "${BUILD_NUMBER}"
        TARGET_SERVER_IP = "${SYNERGY_SERVER_URL}"
        TARGET_SERVER_PASS = "${SYNERGY_SERVER_PASS}"
        SECRET_KEY = "${SECRET_KEY}"
        DOCKER_USERNAME = "${DOCKER_USERNAME}"
        DOCKER_PASSWORD = "${DOCKER_PASSWORD}"
        BASE_URL = "${BASE_URL}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Npm Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Docker Build and Push') {
            steps {
                script {
                    sh 'docker build --build-arg ENCRYPTION_KEY=$SECRET_KEY --build-arg BASE_URL=$BASE_URL -t synergy_cooperative_frontend:1.0 .'
                    sh 'docker tag $APP_NAME:1.0 $DOCKER_REGISTRY_URL:$BUILD_NO'
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'docker push $DOCKER_REGISTRY_URL:$BUILD_NO'
                }
            }
        }

        stage('Cleanup Remote Docker Containers') {
            steps {
                script {
                    sh "sshpass -p '$SYNERGY_SERVER_PASS' ssh -o stricthostkeychecking=no root@$TARGET_SERVER_IP 'docker stop $APP_NAME || true'"
                    sh "sshpass -p '$SYNERGY_SERVER_PASS' ssh -o stricthostkeychecking=no root@$TARGET_SERVER_IP 'docker rm $APP_NAME || true'"
                }
            }
        }

        stage('Run Docker Container on Remote Server') {
            steps {
                script {
                    sh "sshpass -p '$SYNERGY_SERVER_PASS' ssh -o stricthostkeychecking=no root@$TARGET_SERVER_IP 'docker run -d --name $APP_NAME -p 80:3000 -e ENCRYPTION_KEY=$SECRET_KEY -e BASE_URL=$BASE_URL  --restart always $DOCKER_REGISTRY_URL:$BUILD_NO'"
            }
        }
    }

    }
    triggers {
        githubPush()
    }
}