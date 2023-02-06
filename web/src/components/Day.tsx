import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"

import { ProgressBar } from "./ProgressBar"

//  Props indicando a quantidade de tarefas completas e a quantidade total de tarefas
interface DayProps {
  completed: number
  amount: number
}

export function Day(props: DayProps) {
  //  Calculando a porcentagem de tarefas completas
  const completedPercentage = Math.round((props.completed / props.amount) * 100)

  return (
    <Popover.Root>
      {/* Estilização condicional do dia */}
      <Popover.Trigger
        className={clsx("w-10 h-10 rounded-lg hover:brightness-110", {
          "bg-violet-500 border-violet-400": completedPercentage >= 80,
          "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
          "bg-violet-700 border-violet-600": completedPercentage >= 40 && completedPercentage < 60,
          "bg-violet-800 border-violet-700": completedPercentage >= 20 && completedPercentage < 40,
          "bg-violet-900 border-violet-800": completedPercentage > 0 && completedPercentage < 20,
          "bg-zinc-900 border-2 border-zinc-800": completedPercentage === 0
        })}
      />

      {/* Conteúdo do card do dia */}
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl flex flex-col bg-zinc-900">
          <span className="font-semibold text-zinc-400">
            segunda-feira
          </span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            06/02
          </span>

          <ProgressBar progress={completedPercentage} />

          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}