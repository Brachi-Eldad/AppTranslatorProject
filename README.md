🚀 App Translator Project

Full DevOps & Cloud-Native Microservices Platform

App Translator is a cloud-native microservices platform that enables users to translate text through a scalable and production-ready infrastructure.

The project focuses on implementing modern DevOps practices including Kubernetes orchestration, CI/CD automation, secure cloud deployment, and infrastructure scalability using AWS services.

📌 Project Overview

App Translator is a complete end-to-end DevOps project that demonstrates modern cloud-native application deployment using:

Docker
Kubernetes
Helm
CI/CD Pipelines
AWS Cloud Services
GitHub Actions
Microservices Architecture
Secrets Management
Persistent Storage
Production Deployment Practices

The project was designed to simulate a real-world production-grade DevOps environment.

🏗️ System Architecture

The system is composed of four main services:

Service	Description
Frontend	Static web UI served with NGINX
Backend API	Node.js API handling translation requests
LibreTranslate	Translation microservice
PostgreSQL	Persistent database storage
☁️ Infrastructure Architecture
Users
   │
   |
   ▼
CloudFront CDN
   │
   |
   ▼   
AWS S3 Static Hosting
   │
   |
   ▼   
Frontend Service (NGINX)
   │
   |
   ▼   
Backend API (Node.js)
   │
   |
   ▼   
LibreTranslate Service
   │
   |
   ▼  
PostgreSQL Database

⚙️ Technologies Used

Category	Technologies
Frontend	HTML, JavaScript, NGINX
Backend	Node.js, Express
Translation Engine	LibreTranslate
Database	PostgreSQL
Containerization	Docker
Multi-container	Docker Compose
Orchestration	Kubernetes
Package Manager	Helm
CI/CD	GitHub Actions
Cloud	AWS EC2, S3, CloudFront
Registry	DockerHub
Secrets	Kubernetes Secrets, Sealed Secrets
Authentication	AWS OIDC
Networking	Kubernetes Ingress
Persistence	PVC + StatefulSet

📂 Project Structure

AppTranslatorProject/
│
|
├── .github/workflows/
|
│   ├── ci-backend.yml
|
│   └── ci-frontend.yml
|
│
|
├── backend/
|
│   ├── Dockerfile
|
│   ├── package.json
|
│   ├── server.js
|
│   ├── server.test.js
|
│   └── server.integration.test.js
|
│
|
├── frontend/
|
│   ├── Dockerfile
|
│   ├── index.html
|
│   ├── nginx.conf
|
│   └── script.js
|
│
|
├── db/
|
│   └── init.sql
|
│
|
├── helm/
|
│   ├── templates/
|
│   ├── Chart.yaml
|
│   ├── values.yaml
|
│   └── sealed-postgres-password.yaml
|
│
|
├── k8s/
|
│   ├── backend-deployment.yaml
|
│   ├── backend-service.yaml
|
│   ├── db-statefulset.yaml
|
│   ├── db-pvc.yaml
|
│   ├── db-secret.yaml
|
│   ├── libretranslate.yaml
|
│   └── frontend.yaml
|
│
|
├── docker-compose.yml
|
├── docker-compose.test.yml
|
└── README.md

🐳 Docker Implementation

The project uses Docker for full containerization of all services.

Backend Docker Image
docker build -t app-translator-backend .
Frontend Docker Image
docker build -t app-translator-frontend .
🐙 Docker Compose

Docker Compose was used for:

Local development
Integration testing
Multi-container orchestration
Run Full Application
docker compose up -d
Run Test Environment
docker compose -f docker-compose.test.yml up

☸️ Kubernetes Deployment

The application was deployed to Kubernetes using:

Deployments
Services
StatefulSets
ConfigMaps
Secrets
Persistent Volumes
Ingress

📦 Kubernetes Components

Component	Purpose
Deployment	Stateless application management
StatefulSet	Persistent PostgreSQL storage
Service	Internal networking
ConfigMap	Database configuration
Secret	Sensitive credentials
PVC	Persistent database storage
Ingress	External access routing

🌐 Kubernetes Networking

Ingress NGINX was used to expose the application externally.

Example Routing
Path	Destination
/	Frontend
/api	Backend API

🗄️ PostgreSQL Persistence

The database uses:

Persistent Volume Claims (PVC)
StatefulSets

This ensures data survives pod restarts and redeployments.

🔐 Secrets Management

The project implements secure secret management using:

Kubernetes Secrets
Bitnami Sealed Secrets
Why Sealed Secrets?

Regular Kubernetes Secrets are only Base64 encoded.

Sealed Secrets provide encrypted secrets safe for Git repositories.

📦 Helm Chart Deployment

The Kubernetes manifests were migrated into a reusable Helm Chart.

Helm Features
Centralized configuration
Reusable templates
Easier upgrades
Dynamic values management
Production-ready deployment process
Helm Installation
helm install app-translator ./helm
Helm Upgrade
helm upgrade app-translator ./helm

🔄 CI/CD Pipelines

The project includes two separate production-style CI/CD pipelines:

Backend Pipeline
Frontend Pipeline

Implemented using GitHub Actions.

🧪 Backend CI/CD Pipeline

The backend pipeline includes:

✔ Unit Tests
npm test
✔ Docker Build Validation
docker build
✔ Integration Tests

Integration tests run using:

docker compose -f docker-compose.test.yml up
✔ DockerHub Push

Images are pushed automatically with:

latest tag
Git SHA tag
✔ EC2 Deployment

Automatic deployment to AWS EC2 using SSH.

☁️ Frontend CI/CD Pipeline

The frontend pipeline includes:

✔ Frontend Validation

Basic frontend verification stage.

✔ AWS OIDC Authentication

Secure temporary AWS authentication without static access keys.

✔ S3 Deployment

Frontend files are automatically deployed to AWS S3.

✔ CloudFront Cache Invalidation

Automatic CDN cache clearing after deployment.

☁️ AWS Services Used
AWS Service	Purpose
EC2	Backend deployment
S3	Static frontend hosting
CloudFront	CDN distribution
IAM OIDC	Secure GitHub authentication

🧪 Testing Strategy

The project includes:

Test Type	Purpose
Unit Tests	Backend functionality
Integration Tests	Multi-service validation
Docker Validation	Container verification
Health Checks	Kubernetes readiness

❤️ Kubernetes Health Checks

Liveness Probe
livenessProbe:
  httpGet:
    path: /health
    port: 3001
Readiness Probe
readinessProbe:
  httpGet:
    path: /health
    port: 3001
    
🛠️ Debugging & Troubleshooting

The project included troubleshooting scenarios such as:

CrashLoopBackOff
ImagePullBackOff
Pending Pods
OOMKilled
CreateContainerConfigError
Useful Commands
kubectl get pods
kubectl logs deployment/backend
kubectl describe pod <POD_NAME>
kubectl get events

📈 Production Best Practices Implemented

✅ Multi-stage CI/CD Pipelines

✅ Docker Image Validation

✅ Integration Testing

✅ SHA Image Tagging

✅ Secure Secret Management

✅ OIDC Authentication

✅ Kubernetes StatefulSets

✅ Persistent Storage

✅ Ingress Networking

✅ Helm Templating

✅ CloudFront CDN Deployment

✅ Automated EC2 Deployment

✅ Separation of Environments

✅ Microservices Architecture

🚀 DevOps Concepts Demonstrated

This project demonstrates:

Containerization
Kubernetes orchestration
Infrastructure automation
CI/CD implementation
Cloud deployment
Secure authentication
Secrets management
Production debugging
Persistent storage
Helm packaging
Multi-service architecture
📊 Advanced Features

The project includes several advanced DevOps features beyond basic requirements:

Advanced Feature	Status
AWS OIDC Authentication	✅

CloudFront CDN	✅

Integration Testing	✅

DockerHub SHA Tagging	✅

Automatic EC2 Deployment	✅

Sealed Secrets	✅

Stateful PostgreSQL	✅

Helm Charts	✅

✅ Requirements Verification

Based on the repository structure and implementation:

Requirement	Status
Docker	✅ Completed

Docker Compose	✅ Completed

Backend API	✅ Completed

Frontend Service	✅ Completed

PostgreSQL	✅ Completed

LibreTranslate	✅ Completed

Kubernetes	✅ Completed

Deployments	✅ Completed

Services	✅ Completed

StatefulSet	✅ Completed

Persistent Volume	✅ Completed

ConfigMap	✅ Completed

Secrets	✅ Completed

Sealed Secrets	✅ Completed

Helm	✅ Completed

CI/CD	✅ Completed

Unit Tests	✅ Completed

Integration Tests	✅ Completed

DockerHub Push	✅ Completed

EC2 Deployment	✅ Completed

S3 Deployment	✅ Completed

CloudFront	✅ Completed

OIDC Authentication	✅ Completed

🎯 Final Evaluation

This project successfully demonstrates a complete cloud-native DevOps workflow and exceeds standard DevOps course requirements.

The implementation includes:

Real-world CI/CD practices
Kubernetes orchestration
Cloud deployment automation
Secure AWS authentication
Infrastructure scalability concepts
Production-grade deployment techniques

This repository represents a strong junior-level DevOps portfolio project.

👩‍💻 Author

App Translator Project
Full DevOps & Cloud-Native Deployment Platform
Built with Docker, Kubernetes, Helm, GitHub Actions & AWS 🚀
