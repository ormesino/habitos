import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//  Constantes que possuem exemplos pré-feitos
const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {

  //  Para deletar quaisquer registros que estejam no BD
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()

  //  Criação dos hábitos através do Promisse.all()
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Academia',
        created_at: firstHabitCreationDate,
        weekDays: {
          create: [           //  Indica que esse hábito se repetirá nas terças~quintas
            { week_day: 0 },
            { week_day: 2 },
            { week_day: 4 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Beber 2L de água',
        created_at: secondHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Dormir 7h',
        created_at: thirdHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    })
  ])

  await Promise.all([
    //  Até o momento, não havia outro hábito sem ser o primeiro, logo, 1/1
    prisma.day.create({
      data: {
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          }
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          }
        }
      }
    }),

    //  A partir dessa data, já haviam dois hábitos cadastrados, portanto 2/2
    prisma.day.create({
      data: {
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: firstHabitId },
            { habit_id: secondHabitId },
          ]
        }
      }
    }),
  ])
}

//  Execução do script
run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })