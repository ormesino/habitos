import dayjs from 'dayjs'
import { prisma } from "../config/prisma"
import { FastifyInstance } from "fastify"   //  Utilizando a instância do Fastify para inserir nas rotas
import { z } from 'zod'  //  Para validação das entradas

//  Export da função routes() para ser usada no arquivo routes.ts quando o servidor for inicializado
export async function routes(app: FastifyInstance) {
  //  Criação de hábitos
  app.post('/habits', async (request, response) => {

    //  Validação de entrada
    const habitValidation = z.object({
      title: z.string(),
      weekDays: z.array(z.number().max(6).min(0))
    })
    const { title, weekDays } = habitValidation.parse(request.body)

    const date = dayjs().startOf('day').toDate()

    //  Criando o hábito
    const habit = await prisma.habit.create({
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

    return response.status(500).send(`Hábito "${habit.title}" criado com sucesso!`)
  })
  
  //  Listagem de hábitos do dia
  app.get('/dayHabits', async (request) => {
    const paramsValidation = z.object({
      date: z.coerce.date()
    })
    const { date } = paramsValidation.parse(request.query)
    
    const weekDay = dayjs(date).startOf('day').get('day')

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

    const day = await prisma.day.findUnique({
      where: {
        date: dayjs(date).startOf('day').toDate()
      },
      include: {
        dayHabits: true
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    })

    return {
      habits,
      completedHabits
    }
  })

  
}