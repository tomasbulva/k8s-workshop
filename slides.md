---
title: K8S worshop
author: Tomas Bulva
---

# Assumptions

 - you know your way around POSIX command line
 - you don't know anything about Kubernetes
 - you have some experience with docker containers
 - you have some experience with YAML (indentation)
 - you have a google account (gmail)

---

# What we are doing

 - intro
 - setup kubernetes tools on your local machine
 - login into cloud with the tools (kubectl and docker)
   - we will be deploying it on google cloud which allows K8s for free
 - explain how to declare deployment in yaml
 - we will deploy custom multi container application to the cloud
 - how to debug deployments
 - this app will be exposed to the public internet

  ## Advanced

 - you can point a domain to it and run with it

---

# What is Kubernetes

the name Kubernetes originates from Greek, meaning helmsman or pilot
k8s abriviation = 8 letters between k and s

- kubernetes is a container orchestration tool
- created for
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

# setup - step 1

install gcould
  `tar -xf ./tools/google-cloud-sdk-357.0.0-darwin-x86_64.tar.gz -C ~/`
  `./google-cloud-sdk/install.sh`
install kubectl
  `gcloud components install kubectl`
install docker
  `brew install docker --cask` or [download](https://docs.docker.com/desktop/mac/install/)

---

# setup - step 2

- [open google cloud console](https://console.cloud.google.com/)
- create a google cloud project -> click the button or search for `create new project`
- create a service account
- create a new service account key
  - > actions [...]
  - > manage keys
  - > add key
  - > create new key
  - > download json key

---

# setup - step 3

- Authentificate with google cloud
  - `gcloud init`
  - `gcloud auth login`
  
- login with authentificaion helper
  - `gcloud auth activate-service-account ACCOUNT_NAME@PROJECT_NAME.iam.gserviceaccount.com --key-file=.keys/PROJECT_NAME-RANDOM_ID.json`
- configure docker to use gcloud authentification for gcloud repositories
  - `gcloud auth configure-docker`

---

# setup - step 4

for the next part the billing has to be enabled
this whole flow is completely free (Google gives everyone $300 to play around)
  - search for billing in the console or follow [this link](https://console.cloud.google.com/billing/)
  - fill out your info
  - activate the free trial
  - enable [Google Container Registry](https://console.cloud.google.com/gcr)
  - enable gcr api `gcloud services enable containerregistry.googleapis.com`

---

# setup - step 5

build docker images
  - `cd frontend`
  - `docker build -t frontend:latest .` 

docker container gcr tag
  - pick one of the repository servers
    - **gcr.io** hosts images in data centers in the United States, but the location may change in the future
    - **us.gcr.io** hosts images in data centers in the United States, in a separate storage bucket from images hosted by gcr.io
    - **eu.gcr.io** hosts the images in the European Union
    - **asia.gcr.io** hosts images in data centers in Asia
  
  - `docker tag frontend:latest HOSTNAME/PROJECT-ID/IMAGE:TAG`
  
  - push to the gcloud repository: `docker push HOSTNAME/PROJECT-ID/IMAGE`

  ...repeat for all parts frontend, restServer, socketServer

---

# setup - step 6

  set some defaults:
  - gcloud config set project PROJECT_ID
  - gcloud config set compute/zone europe-west4-a
  - gcloud config set compute/region europe-west4
  
  create cluster:
  - gcloud container clusters create workshop-test --num-nodes=1

---

# setup - step 7
  edit yaml
  - add your names of the container images into the yaml
  - change port numbers if you changed this in your app
  
  deploy
  - `kubectl apply -f path/to/yaml`

---

# setup - step 8
  debugging and problem solving
  1. it's not instant
  2. check all parts first: 
    - check pods
      - does pod exist? `kubectl get pods`
      - more info `kubectl describe pod NAME` 
    - check deployment
      - deployment should give you very similar info as pod `kubectl describe deployment NAME` 
    - check services
      - is it running? `kubectl get svc`
      - more info `kubectl describe svc NAME`
    - check ingress
      - is it running? `kubectl get ing`
      - more info `kubectl describe ing NAME`
  3. if all these look good. 
    - get logs from containers
      - `kubectl logs $(kubectl get pod --selector="POD_SELECTOR" --output jsonpath='{.items[0].metadata.name}') -c CONTAINER_NAME`
    - port forwarding
      - `kubectl port-forward $(kubectl get pod --selector="POD_SELECTOR" --output jsonpath='{.items[0].metadata.name}') 8080:3000`

# cleaning up
  - `kubectl detele -f path/to/yaml`