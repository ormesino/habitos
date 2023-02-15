import { FormEvent, useState } from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";

const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('')
    setWeekDays([])
    alert('Hábito criado com sucesso!')
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(weekDays.filter(day => day !== weekDay))
    } else {
      setWeekDays([...weekDays, weekDay])
    }
  }

  return (
    //  Formulário de criação de novo hábito
    <form
      onSubmit={createNewHabit}
      className="w-full flex flex-col mt-6"
    >
      <label
        htmlFor="title"
        className="font-semibold leading-tight"
      >
        Qual o seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Estudar 2 horas por dia"
        className="p-4 rounded-lg mt-3 bg-zinc-700 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={event => setTitle(event.target.value)}
        value={title}
      />

      <label
        htmlFor=""
        className="font-semibold leading-tight mt-4"
      >
        Qual a recorrência
      </label>

      <div className="mt-3 gap-2 flex flex-col">
        {
          days.map((weekDay, index) => {
            return (
              <Checkbox.Root
                key={weekDay}
                className="flex items-center gap-3 group"
                checked={weekDays.includes(index)}
                onCheckedChange={() => handleToggleWeekDay(index)}
              >
                <div className="h-8 w-8 bg-zinc-900 flex items-center justify-center border-2 border-zinc-800 rounded-lg group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
                  <Checkbox.Indicator>
                    <Check size={20} className="text-white" />
                  </Checkbox.Indicator>
                </div>
                <span className="text-white leading-tight">
                  {weekDay}
                </span>
              </Checkbox.Root>
            )
          })
        }
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg gap-3 p-4 flex items-center font-semibold justify-center bg-green-600 hover:bg-green-500"
      >
        <Check
          size={20}
          weight="bold"
        />
        Confirmar
      </button>
    </form >
  )
}