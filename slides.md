---
title: K8S intro
author: Tomas Bulva
---

# Assumptions

 - You know your way around POSIX command line
 - You don't know anything about Kubernetes
 - You have some experience with docker containers
 - You have some experience with YAML (indentation)
 - You have a google account (gmail)

---

# What we are doing

 - We will deploy custom multi container application to the cloud
 - This app will be possible to expose to public internet
 - you can point a domain to it and run with it

 - We will be deploying it on google cloud which allows K8s for free

---

# What is Kubernetes

The name Kubernetes originates from Greek, meaning helmsman or pilot.
K8s abriviation = 8 letters between k and s.

- Kubernetes is a container orchestration tool
- Created for
  - Automation
  - Declarative configuration
  - HW abstraction
  - cloud independent/infra independent
  - deployment resiliance
  - scalability

---

# Kubernetes Anathomy

  - K8s Cluster
    - Master node
    - Kube node (kubelets)
      - pods
        - containers

---

# Basic Website Needs

  All stuff I will be deploying is JS based
  - basic backend
  - basic frontend
  - reverse proxy
  - ssl  (only if I can get freedomain)

---

# Jargon

  - Kubectl - CLI
  - Ingress is k8s term for a public facing proxy (enginx, ha proxy, apache, etc.)
  - HELM is a package manager for k8s

---

# step 1

install gcould
  `tar -xf ./tools/google-cloud-sdk-357.0.0-darwin-x86_64.tar.gz -C ~/`
  `./google-cloud-sdk/install.sh`
install kubectl
  `gcloud components install kubectl`
Authentificate with google cloud
  `gcloud init`
  `gcloud auth login`


