import { useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"
import dayjs from "dayjs"

import { ProgressBar } from "./ProgressBar"
import { HabitsList } from "./HabitsList"

//  Props indicando a quantidade de tarefas completas e a quantidade total de tarefas
interface DayProps {
  defaultCompleted?: number
  totalHabits?: number
  date: Date,
  refreshDay: () => void
}

export function Day({ defaultCompleted = 0, totalHabits = 0, date, refreshDay }: DayProps) {
  //  Calculando a porcentagem de tarefas completas
  const [completedHabits, setCompletedHabits] = useState(defaultCompleted)

  const completedPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM")
  const dayOfWeek = dayjs(date).format("dddd")

  function handleCompletedHabits(completed: number) {
    setCompletedHabits(completed)
    if (totalHabits === 0) refreshDay()
  }

  return (
    <Popover.Root>
      {/* Estilização condicional do dia */}
      <Popover.Trigger
        className={clsx("w-10 h-10 border-2 rounded-lg hover:brightness-110 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg", {
          "bg-violet-500 border-violet-400 focus:ring-violet-400": completedPercentage >= 80,
          "bg-violet-600 border-violet-500 focus:ring-violet-500": completedPercentage >= 60 && completedPercentage < 80,
          "bg-violet-700 border-violet-500 focus:ring-violet-500": completedPercentage >= 40 && completedPercentage < 60,
          "bg-violet-800 border-violet-600 focus:ring-violet-600": completedPercentage >= 20 && completedPercentage < 40,
          "bg-violet-900 border-violet-700 focus:ring-violet-700": completedPercentage > 0 && completedPercentage < 20,
          "bg-zinc-900 border-zinc-800 focus:ring-zinc-700": completedPercentage === 0
        })}
      />

      {/* Conteúdo do card do dia */}
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl flex flex-col bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-700">
          <span className="font-semibold text-zinc-400">
            {dayOfWeek}
          </span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList 
            date={date}
            onCompletedHabits={handleCompletedHabits}
          />

          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}