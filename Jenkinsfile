pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/rani1811/melody-streamer.git'
            }
        }

        stage('Check Files') {
            steps {
                sh 'pwd'
                sh 'ls -l'
            }
        }

        stage('Check Docker Access') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Build Containers') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'docker ps'
            }
        }
        stages {
    stage('Clean Workspace') {
      steps {
        deleteDir()
      }
    }

    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/rani1811/melody-streamer.git'
      }
    }

    }
}
