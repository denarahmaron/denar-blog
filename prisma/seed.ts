import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const article1Content = `
# DevOps Fundamentals: A Comprehensive Guide for Engineers

## Introduction

DevOps is not just a methodology—it's a cultural shift that bridges development and operations teams. In this guide, we'll explore the core principles that transform how software is delivered.

## The DevOps Mindset

### Culture of Collaboration

DevOps starts with culture. The traditional silos between development and operations must be broken down:

- **Shared Responsibility**: Both teams own the entire delivery pipeline
- **Feedback Loops**: Fast, continuous feedback between teams
- **Continuous Improvement**: Always iterating and improving processes

## Core Principles

### 1. Continuous Integration (CI)

Developers integrate code frequently, with automated tests running on every commit.

### 2. Continuous Delivery (CD)

Automated delivery to production-ready environments.

### 3. Infrastructure as Code (IaC)

Managing infrastructure through code, not manual processes.

## Key Metrics

- **Lead Time**: Time from commit to production
- **Deployment Frequency**: How often you deploy
- **Mean Time to Recovery (MTTR)**: Time to recover from failures
- **Change Failure Rate**: Percentage of failed deployments

## Tools of the Trade

| Category | Tools |
|----------|-------|
| CI/CD | Jenkins, GitHub Actions, GitLab CI |
| Container | Docker, containerd |
| Orchestration | Kubernetes, Docker Swarm |
| IaC | Terraform, Ansible, CloudFormation |
| Monitoring | Prometheus, Grafana, ELK |

## Getting Started

1. Start with small automation wins
2. Implement monitoring early
3. Create feedback loops
4. Measure everything
5. Iterate and improve

## Conclusion

DevOps is a journey, not a destination. Start small, learn continuously, and adapt to your organization's needs.
`

const article2Content = `
# Kubernetes in Production: Lessons Learned

## Introduction

After running Kubernetes clusters in production for years, here are the real-world lessons I've learned—stuff you won't find in any documentation.

## Cluster Architecture

### Design Principles

1. **Multi-Node Setup**: Minimum 3 nodes for HA
2. **Resource Quotas**: Prevent resource exhaustion
3. **Network Policies**: Segment your cluster

## Common Mistakes to Avoid

### 1. Running as Root

Never run containers as root - always use securityContext.

### 2. No Resource Limits

This is the #1 mistake. Your pods will consume all available resources.

### 3. Ignoring Taints and Tolerations

Production nodes should be tainted—don't schedule workloads on control plane.

## Monitoring Essentials

### Metrics to Track

- Node resource utilization
- Pod CPU/memory usage
- API server latency
- Deployment success rate
- Pod restart frequency

### Recommended Stack

- **Prometheus** for metrics
- **Grafana** for visualization
- **Fluentd** for logs

## Backup and Recovery

Always have etcd backups. Test your restore process regularly.

## Lessons Learned

1. **Start simple**: Don't over-engineer from day one
2. **Monitor everything**: If you can't measure it, you can't improve it
3. **Automate recovery**: Assume things will fail
4. **Document decisions**: Future you will thank present you
`

const article3Content = `
# Building Production-Grade CI/CD Pipelines

## Introduction

A production-grade CI/CD pipeline isn't just about deploying code—it's about deploying confidently. Here's how to build pipelines that scale.

## Pipeline Architecture

### The Stages

1. **Source**: Code changes trigger the pipeline
2. **Build**: Compile/package the application
3. **Test**: Run automated tests
4. **Security Scan**: Find vulnerabilities
5. **Stage**: Deploy to staging environment
6. **Integration Tests**: End-to-end testing
7. **Production**: Deploy to production
8. **Monitor**: Post-deployment monitoring

## Essential Practices

### 1. Fail Fast

Structure tests to fail fast—run unit tests first.

### 2. Caching

Speed up pipelines with caching.

### 3. Secrets Management

Never hardcode secrets - use GitHub Secrets.

### 4. Environment Promotion

Promote the same artifact through environments - build once, deploy everywhere.

## Testing Strategy

### The Testing Pyramid

- **Unit Tests**: Fast, many - run on every commit
- **Integration Tests**: Moderate - run on every PR
- **E2E Tests**: Slow, few - run pre-deploy

## Deployment Strategies

### Blue-Green Deployment

Zero-downtime deployments by running two identical production environments.

### Canary Deployment

Gradual rollout - start with 10%, then increase.

## Conclusion

A great CI/CD pipeline:

1. **Fails fast** - Catch issues early
2. **Provides feedback** - Everyone knows the status
3. **Is automated** - No manual steps
4. **Is secure** - Scans for vulnerabilities
5. **Is measurable** - Track everything
`

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const user = await prisma.user.upsert({
    where: { email: "admin@blog.com" },
    update: {},
    create: {
      email: "admin@blog.com",
      password: hashedPassword,
      name: "Admin",
    },
  })

  console.log("Seeded user:", user.email)

  const categories = [
    { name: "DevOps", slug: "devops" },
    { name: "Infrastructure", slug: "infrastructure" },
    { name: "Automation", slug: "automation" },
    { name: "Security", slug: "security" },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  console.log("Seeded categories")

  const devopsCategory = await prisma.category.findUnique({ where: { slug: "devops" } })
  const infraCategory = await prisma.category.findUnique({ where: { slug: "infrastructure" } })
  const automationCategory = await prisma.category.findUnique({ where: { slug: "automation" } })

  const articles = [
    {
      title: "DevOps Fundamentals: A Comprehensive Guide for Engineers",
      slug: "devops-fundamentals-comprehensive-guide",
      content: article1Content,
      excerpt: "A comprehensive guide to DevOps principles, practices, and tools that every engineer should know.",
      coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
      categoryId: devopsCategory?.id,
      published: true,
    },
    {
      title: "Kubernetes in Production: Lessons Learned",
      slug: "kubernetes-in-production-lessons-learned",
      content: article2Content,
      excerpt: "Real-world lessons from running K8s in production for years. Common mistakes, monitoring essentials, and security hardening.",
      coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
      categoryId: infraCategory?.id,
      published: true,
    },
    {
      title: "Building Production-Grade CI/CD Pipelines",
      slug: "building-production-grade-ci-cd-pipelines",
      content: article3Content,
      excerpt: "Learn how to build CI/CD pipelines that are fast, secure, and reliable. Includes deployment strategies.",
      coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
      categoryId: automationCategory?.id,
      published: true,
    },
  ]

  for (const article of articles) {
    const existing = await prisma.post.findUnique({
      where: { slug: article.slug },
    })

    if (!existing) {
      await prisma.post.create({
        data: {
          ...article,
          authorId: user.id,
        },
      })
    }
  }

  console.log("Seeded 3 DevOps articles")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())