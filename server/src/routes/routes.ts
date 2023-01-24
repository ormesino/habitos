import { prisma } from "../config/prisma"
import { FastifyInstance } from "fastify"
import { z } from 'zod';

export async function routes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const { title, weekDays } = request.body

    return habits
  })
}