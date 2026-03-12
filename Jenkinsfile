pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = credentials('dockerhub-creds')
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Get Git Commit') {
      steps {
        script {
          IMAGE_TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        }
      }
    }

    stage('Build Images') {
      steps {
        sh "docker build -t raniingale2025/music-frontend:${IMAGE_TAG} ./frontend"
        sh "docker build -t raniingale2025/music-backend:${IMAGE_TAG} ./backend"
      }
    }

    stage('Push Images') {
      steps {
        sh "echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin"
        sh "docker push raniingale2025/music-frontend:${IMAGE_TAG}"
        sh "docker push raniingale2025/music-backend:${IMAGE_TAG}"
      }
    }

    stage('Deploy to K8s') {
      steps {
        sh "kubectl set image deployment/frontend frontend=raniingale2025/music-frontend:${IMAGE_TAG} -n music-app"
        sh "kubectl set image deployment/backend backend=raniingale2025/music-backend:${IMAGE_TAG} -n music-app"
      }
    }

    stage('Smoke Test') {
      steps {
        sh "curl -f http://melody-streamer.duckdns.org || exit 1"
      }
    }
  }
}
