---
title: "Bug Bounty em 2025: Guia Realista para Começar do Zero ao Primeiro Bug"
category: "AppSec"
date: "2025-03-20"
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80"
tags: ["Bug Bounty", "Recon", "Web", "Metodologia", "AppSec"]
---

# Bug Bounty em 2025: Por onde começar (de verdade)

Bug Bounty não é só “caçar bugs”.  
É **pensar como atacante, entender sistemas complexos e encontrar o que ninguém viu**.

Em 2025, o cenário está mais competitivo — mas também **mais acessível do que nunca**.  
Empresas expõem APIs, microserviços, aplicações mobile… e isso abre uma superfície enorme pra exploração.

Se você quer sair do zero e chegar no seu primeiro report válido, esse é o caminho.

---

## 1. Mentalidade > Ferramentas

Antes de sair rodando scanner, entenda isso:

> Bug Bounty não recompensa quem roda ferramenta — recompensa quem **entende comportamento**.

Você precisa dominar:

- **Web (essencial)**
  - HTTP/HTTPS na prática (headers, cookies, cache, auth)
  - Como o browser realmente funciona

- **Backend básico**
  - Fluxo de APIs (REST/JSON)
  - Autenticação (JWT, sessões, tokens)

- **Lógica de aplicação**
  - Onde estão as decisões críticas?
  - Onde o sistema confia no usuário?

 *A maioria dos bugs críticos não é técnica — é lógica.*

---

## 2. Setup do Hacker (mínimo viável)

Esquece 50 ferramentas. Começa com isso:

- **Burp Suite** → interceptação, repeater, intruder
- **Browser + DevTools**
- **subfinder / assetfinder** → recon inicial
- **ffuf** → fuzzing

Se você domina **Burp + lógica**, já tá na frente de muita gente.

---

## 3. Recon: onde os bugs realmente estão

A homepage é só fachada.

Os bugs vivem em:
- APIs esquecidas
- subdomínios antigos
- endpoints internos expostos
- versões legacy

Exemplo real de recon:

```bash
subfinder -d target.com -all -recursive | tee subdomains.txt

cat subdomains.txt | httpx -silent -o alive.txt

ffuf -u https://target.com/FUZZ -w wordlist.txt