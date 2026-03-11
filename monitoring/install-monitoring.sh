#!/bin/bash
set -e

NAMESPACE="monitoring"
RELEASE_NAME="monitoring"
DASHBOARD_FILE="grafana/dashboards/melody-streamer-dashboard.json"
SECRET_NAME="grafana-admin-secret"

echo "📦 Adding Helm repo..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts >/dev/null 2>&1 || true
helm repo update

echo "📁 Creating namespace..."
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

echo "🔐 Creating Grafana admin secret..."
kubectl create secret generic $SECRET_NAME \
  --from-literal=admin-user=admin \
  --from-literal=admin-password='YourStrongPassword@123' \
  -n $NAMESPACE \
  --dry-run=client -o yaml | kubectl apply -f -

echo "📊 Creating dashboard configmap..."
kubectl create configmap melody-dashboard \
  --from-file=$DASHBOARD_FILE \
  -n $NAMESPACE \
  --dry-run=client -o yaml | kubectl apply -f -

echo "🏷️ Labelling dashboard for Grafana sidecar..."
kubectl label configmap melody-dashboard grafana_dashboard=1 -n $NAMESPACE --overwrite

echo "🧹 Removing old Helm release if exists..."
helm uninstall $RELEASE_NAME -n $NAMESPACE >/dev/null 2>&1 || true

echo "🚀 Installing Prometheus + Grafana..."
helm upgrade --install $RELEASE_NAME prometheus-community/kube-prometheus-stack \
  -n $NAMESPACE \
  -f prometheus-values.yaml

echo ""
echo "✅ Monitoring stack installed successfully!"
echo ""
echo "🌐 Access Grafana:"
echo "1️⃣  Get NodePort:"
echo "   kubectl get svc monitoring-grafana -n $NAMESPACE"
echo ""
echo "2️⃣  Open in browser:"
echo "   http://<EC2_PUBLIC_IP>:<NODE_PORT>"
echo ""
echo "🔐 Login Credentials:"
echo "   Username: admin"
echo "   Password: YourStrongPassword@123"

