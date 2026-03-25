---
title: "Container Security em 2025: Guia Prático para Identificar e Corrigir CVEs em Docker e Kubernetes"
category: "AppSec"
date: "Mar 2025"
image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&q=80"
tags: ["Docker", "Kubernetes", "DevSecOps", "CVE", "Security"]
---

# 🐳 Container Security em 2025

A segurança moderna não está mais limitada ao código.

Com a adoção massiva de containers e Kubernetes, novas superfícies de ataque surgiram — e ignorá-las hoje é um risco real em produção.

Neste guia, você vai aprender como:
- identificar vulnerabilidades (CVEs)
- corrigir imagens Docker inseguras
- proteger workloads em Kubernetes
- integrar segurança no pipeline (DevSecOps)

---

## Sumário

- O problema das imagens vulneráveis
- Escaneamento de vulnerabilidades
- Correção de CVEs
- Segurança em Kubernetes
- DevSecOps na prática
- Hardening de containers
- Erros comuns
- Conclusão

---

## O problema das imagens vulneráveis

Cada imagem Docker é composta por múltiplas camadas e dependências.

Isso significa que ao usar uma imagem base, você também herda:
- bibliotecas desatualizadas
- pacotes com vulnerabilidades conhecidas
- componentes que você nem sabe que existem

### Exemplo:

```dockerfile
FROM node:18
```

---

## 1. Escaneando imagens

```bash
trivy image nginx:latest
```

---

## 2. Remediação efetiva

```dockerfile
FROM node:20-alpine
```

```bash
docker build --no-cache .
```

---

## 3. Kubernetes: além da imagem

```yaml
securityContext:
  runAsUser: 1000
```

---

## 4. Segurança no pipeline

```yaml
- name: Scan container
  run: trivy image my-app
```

---

## 5. Hardening

```yaml
readOnlyRootFilesystem: true
```

---

## Conclusão

Container Security não é sobre ferramenta.

> Você deixa de ser apenas um pentester e passa a atuar como Security Engineer

---

 Segurança não é encontrar vulnerabilidades.  
É garantir que elas não voltem.
