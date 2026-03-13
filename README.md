# 🎵 Melody Streamer 
A cloud-native music streaming application deployed using modern DevOps tools including Docker, Kubernetes (EKS), Terraform, Jenkins CI/CD, Prometheus, and Grafana.

This project demonstrates the complete DevOps lifecycle:

```bash
  Code → Build → Containerize → Deploy → Monitor → Scale
```
The goal of this project is to show how applications can be automatically built, deployed, and monitored in a cloud environment.

## 📌 Project Overview

Melody Streamer is a two-tier music streaming platform consisting of:
- Frontend – React application served via Nginx
- Backend – Node.js API
- Database – MySQL
- Infrastructure – AWS EKS created using Terraform
- CI/CD – Jenkins pipeline
- Monitoring – Prometheus & Grafana

The project demonstrates how to implement a production-style DevOps pipeline

## 🏗 Architecture

Developer 
   |
   ▼
GitHub Repository
   │
   ▼
Jenkins CI/CD Pipeline
   │
   ├── Build Docker Images
   ├── Push Images to DockerHub
   └── Deploy to Kubernetes
            │
            ▼
        AWS EKS Cluster
            │
            ├── Frontend Pod
            ├── Backend Pod
            └── MySQL Pod
            │
            ▼
         Kubernetes Service
            │
            ▼
           Users


#### Monitoring Layer

Prometheus → Collect Metrics
Grafana → Visualize Metrics

#### Infrastructure Layer

Terraform → AWS Infrastructure

## ⚙️ Tech Stack

**Cloud:** AWS (EKS, EC2, EBS)

**Containerization:** Docker

**Container Orchestration:** Kubernetes

 **CI/CD:** Jenkins , GitHub Webhooks

 **Infrastructure as Code:** Terraform

 **Monitoring:** Prometheus , Grafana

 **Application:** React , Node.js , MySQL , Nginx


## 📁 Project Structure

melody-streamer/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/
│   ├── src/
│   ├── server.js
│   └── Dockerfile
│
├── k8s/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mysql-deployment.yaml
│   ├── services.yaml
│   ├── ingress.yaml
│   └── mysql-pvc.yaml
│
├── terraform/
│   ├── provider.tf
│   ├── vpc.tf
│   ├── eks.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── monitoring/
│   ├── prometheus-values.yaml
│   └── grafana-dashboard.json
│
├── jenkinsfile
│   
│
└── README.md




## ☁️ Infrastructure Setup (Terraform)

Navigate to Terraform directory

```bash
  cd terraform
```

Initialize Terraform

```bash
  terraform init
```

Create Infrastructure

```bash
  terraform apply
```

####  Terraform will automatically create:

VPC

Subnets

Security Groups

AWS EKS Cluster

Node Groups

#### Configure Kubernetes (EKS)

Update kubeconfig:

```bash
aws eks update-kubeconfig --region ap-south-1 --name music-cluster
```
Verify pods:

```bash
kubectl get pods -n music-app
```

Check services:

```bash
kubectl get svc -n music-app
```

## 🔄 CI/CD Pipeline

The Jenkins pipeline automates application deployment.

Pipeline stages:

```bash
1. Checkout Code
2. Build Docker Images
3. Tag Images using Git Commit SHA
4. Push Images to DockerHub
5. Deploy to Kubernetes
6. Perform Smoke Test
```
Example image tags:
```bash
music-frontend:git-a3f9c2
music-backend:git-a3f9c2
```

## 📊 Monitoring

Monitoring stack deployed using Helm.

#### Components installed:

Prometheus

Grafana

Node Exporter

Kube State Metrics

#### Install monitoring stack:
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm upgrade --install monitoring prometheus-community/kube-prometheus-stack -n monitoring -f monitoring/prometheus-values.yaml
```

## 📈 Grafana Dashboard

#### Example metrics monitored:

Pod CPU usage

Memory usage

Pod restart count

Network traffic

Pod status

## 🎯 DevOps Skills Demonstrated

#### This project demonstrates practical experience with:

Docker containerization

Kubernetes orchestration

Infrastructure as Code (Terraform)

CI/CD automation using Jenkins

GitHub Webhooks

Monitoring with Prometheus and Grafana

Persistent storage using AWS EBS

Cloud deployment on AWS EKS

## 🚀 Future Improvements

Helm charts for Kubernetes deployments

ArgoCD GitOps pipeline

Centralized logging using ELK stack

SSL using Cert-Manager

Blue-Green deployments


## 👨‍💻 Author

Rani Ingle

DevOps Engineer (Transitioning from Frontend Development)

GitHub: 
```bash
https://github.com/rani1811
```
