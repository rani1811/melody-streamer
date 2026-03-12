variable "aws_region" {
  default = "ap-south-1"
}

variable "cluster_name" {
  default = "music-cluster"
}

variable "k8s_version" {
  default = "1.29"
}

variable "node_instance_type" {
  default = "t3.small"
}

variable "node_min_size" {
  default = 1
}

variable "node_max_size" {
  default = 1
}

variable "node_desired_size" {
  default = 1
}
