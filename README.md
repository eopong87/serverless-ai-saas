# Serverless AI SaaS Platform

A full-stack authenticated AI SaaS platform...

---

# Live Features

- AI prompt submission
- Secure Cognito authentication
- JWT-protected APIs
- Prompt history storage
- DynamoDB integration
- Serverless backend
- Terraform-managed infrastructure
- CI/CD deployment with GitHub + Amplify
- WAF and CloudFront security concepts

---

# Architecture

User
↓
AWS Amplify Hosting
↓
Next.js Frontend
↓
API Gateway
↓
AWS Lambda
↓
OpenAI API + DynamoDB
↓
AI Responses + Prompt History

---

# Technologies Used

## Frontend
- Next.js
- React
- Tailwind CSS
- AWS Amplify UI

## Backend
- AWS Lambda
- API Gateway
- DynamoDB
- Cognito
- IAM

## DevOps / Infrastructure
- Terraform
- GitHub
- AWS Amplify
- S3 Terraform Backend
- DynamoDB State Locking

## Security
- JWT Authentication
- Cognito User Pools
- WAF
- CloudFront Concepts

---

# Infrastructure as Code

Terraform manages:

- DynamoDB
- Lambda
- API Gateway
- Cognito
- IAM Roles
- JWT Authorizers
- Remote Terraform State

---

# Key Features

## Authentication
Secure login using AWS Cognito with JWT token validation through API Gateway authorizers.

## AI Prompt Processing
Users can submit prompts securely to the backend where AWS Lambda communicates with OpenAI APIs.

## Prompt History
All prompt history is stored in DynamoDB and displayed in the frontend dashboard.

## CI/CD
Frontend automatically deploys through GitHub integration with AWS Amplify.

## Security
WAF protections and JWT authorization secure the application architecture.

---

# Terraform Backend

Terraform remote state configuration includes:

- S3 backend
- DynamoDB state locking
- Encrypted state storage

---

# Project Structure

serverless-ai-saas/
│
├── frontend/
├── terraform/
├── lambda/
└── README.md

---

# AWS Services Used

- AWS Lambda
- API Gateway
- DynamoDB
- Cognito
- IAM
- Amplify
- S3
- CloudWatch
- WAF
- CloudFront

---

# Future Enhancements

- Stripe subscription billing
- Admin dashboard
- Usage analytics
- Multi-region failover
- CloudFront CDN optimization
- Full Terraform automation
- Custom domain with Route 53
- Monitoring dashboards

---

# Learning Outcomes

This project demonstrates:

- Serverless architecture
- JWT authentication
- Infrastructure as Code
- API security
- CI/CD pipelines
- Cloud-native application development
- Terraform state management
- AWS security best practices

---

# Author

Edward Opong

Cloud Engineering / DevOps Portfolio Project
