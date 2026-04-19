import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

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
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
