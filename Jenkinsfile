pipeline {
    agent any

    stages {

        stage('Check Docker Access') {
            steps { sh 'docker ps' }
        }

        stage('Build Containers') {
            steps { sh 'docker compose build' }
        }

        stage('Start Containers') {
            steps { sh 'docker compose up -d' }
        }

        stage('Verify Containers') {
            steps { sh 'docker ps' }
        }
    }

    post {
        success { echo 'Deployment Successful ✅' }
        failure { echo 'Pipeline Failed ❌' }
    }
}
