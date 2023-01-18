import Fastify from "fastify";
import { PrismaClient } from "@prisma/client"

const server = Fastify();
const prisma = new PrismaClient();

/*
  Métodos HTTP: Get, Post, Put, Delete
*/

server.get('/', async () => {
  const habits = await prisma.habit.findMany()

  return habits
})

server.listen({
  port: 3333
}).then(() => {
  console.log("HTTP server running!")
})