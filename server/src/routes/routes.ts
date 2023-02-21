import dayjs from 'dayjs'
import { prisma } from "../config/prisma"
import { FastifyInstance } from "fastify"   //  Utilizando a instância do Fastify para inserir nas rotas
import { z } from 'zod'  //  Para validação das entradas

//  Export da função routes() para ser usada no arquivo routes.ts quando o servidor for inicializado
export async function routes(app: FastifyInstance) {
  //  Criação de hábitos
  app.post('/habits', async (request) => {

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

  //  Selecionar quais hábitos foram ou não completos
  app.patch('/habits/:id/toggle', async (request) => {
    const paramsValidation = z.object({
      id: z.string().uuid()
    })

    const dateValidation = z.object({
      date: z.coerce.date()
    })

    const { id } = paramsValidation.parse(request.params)
    const { date } = dateValidation.parse(request.query)

    let day = await prisma.day.findUnique({
      where: {
        date: dayjs(date).startOf('day').toDate()
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: dayjs(date).startOf('day').toDate()
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })

      const dayEmpty = await prisma.dayHabit.findFirst({
        where: {
          day_id: day.id
        }
      })
      if (!dayEmpty) {
        await prisma.day.delete({
          where: {
            id: day.id
          }
        })
      }

    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })

  //  Resumo dos dias
  app.get('/habits/summary', async (request) => {
    /*
      Tentando reproduzir o raw SQL usando o Prisma

      const allHabits = await prisma.habitWeekDays.findMany({
        
      })
      const totalDays = await prisma.day.findMany({
        include: {
          _count: {
            select: { dayHabits: true },
          }
        }
    }) */

    //  Por ser uma query bem complexa, optamos por usar o raw SQL
    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H 
            ON HWD.habit_id = H.id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as totalHabits
      FROM days D
    `

    return summary
  })
}