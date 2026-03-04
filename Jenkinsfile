pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/rani1811/melody-streamer.git'
            }
        }

        stage('Check Docker Access') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps'
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful 🚀'
        }
        failure {
            echo 'Pipeline Failed ❌'
        }
    }
}
