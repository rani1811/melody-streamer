module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.k8s_version

  vpc_id = aws_vpc.eks_vpc.id

  subnet_ids = [
    aws_subnet.subnet1.id,
    aws_subnet.subnet2.id
  ]

  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    dev = {
      instance_types = [var.node_instance_type]

      min_size     = var.node_min_size
      max_size     = var.node_max_size
      desired_size = var.node_desired_size
    }
  }
}
