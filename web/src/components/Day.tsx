import clsx from "clsx"
import * as Popover from "@radix-ui/react-popover"
import * as Checkbox from "@radix-ui/react-checkbox"

import { ProgressBar } from "./ProgressBar"
import { Check } from "phosphor-react"
import dayjs from "dayjs"

//  Props indicando a quantidade de tarefas completas e a quantidade total de tarefas
interface DayProps {
  completed?: number
  amount?: number
  date: Date
}

export function Day({ completed = 0, amount = 0, date }: DayProps) {
  //  Calculando a porcentagem de tarefas completas
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format("DD/MM")
  const dayOfWeek = dayjs(date).format("dddd")

  return (
    <Popover.Root>
      {/* Estilização condicional do dia */}
      <Popover.Trigger
        className={clsx("w-10 h-10 border-2 rounded-lg hover:brightness-110", {
          "bg-violet-500 border-violet-400": completedPercentage >= 80,
          "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
          "bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
          "bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
          "bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
          "bg-zinc-900 border-zinc-800": completedPercentage === 0
        })}
      />

      {/* Conteúdo do card do dia */}
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl flex flex-col bg-zinc-900">
          <span className="font-semibold text-zinc-400">
            {dayOfWeek}
          </span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root
              className="flex items-center gap-3 group"
            >
              <div className="h-8 w-8 bg-zinc-900 flex items-center justify-center border-2 border-zinc-800 rounded-lg group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
                <Checkbox.Indicator>
                  <Check size={20} weight="bold" className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}