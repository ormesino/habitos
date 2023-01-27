import dayjs from 'dayjs'
import { prisma } from "../config/prisma"
import { FastifyInstance } from "fastify"   //  Utilizando a instância do Fastify para inserir na rota
import { string, z } from 'zod'  //  Para validação das entradas

//  Export da função routes() para ser usada no arquivo routes.ts quando o servidor for inicializado
export async function routes(app: FastifyInstance) {
  app.post('/habits', async (request, response) => {

    //  Validação de entrada
    const habitValidation = z.object({
      title: z.string(),
      weekDays: z.array(z.number().max(6).min(0))
    })
    const { title, weekDays } = habitValidation.parse(request.body)

    const date = dayjs().startOf('day').toDate()

    //  Criando o hábito
    await prisma.habit.create({
      data: {
        title,
        created_at: date,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })

    return response.status(500).send('Hábito criado com sucesso!')
  })

  app.get('/dayHabits', async (request) => {
    const paramsValidation = z.object({
      date: z.coerce.date()
    })

    const { date } = paramsValidation.parse(request.query)
    const weekDay = dayjs(date).get('day')

    const habits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          }
        }
      }
    })
    // Testing new user
    return habits
  })
}