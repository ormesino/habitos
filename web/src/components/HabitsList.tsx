import { useEffect, useState } from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps {
  date: Date;
  onCompletedHabits: (completed: number) => void
}

interface HabitsInfo {
  habits: {
    id: string,
    title: string,
    created_at: string,
  }[],
  completedHabits: string[]
}

export function HabitsList({ date, onCompletedHabits }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  useEffect(() => {
    api.get('/dayHabits', {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
  }, []);

  async function handleToggleHabit(habitId: string) {
    try {
      let dayParsed = dayjs(date).startOf('day').toISOString()

      await api.patch(`/habits/toggle`, {
        date: dayParsed,
        id: habitId
      })

      let completedHabits: string[] = []

      if (habitsInfo?.completedHabits.includes(habitId)) {
        completedHabits = habitsInfo.completedHabits.filter(id => id !== habitId)
      } else {
        completedHabits = [...habitsInfo!.completedHabits, habitId]
      }

      setHabitsInfo({
        habits: habitsInfo!.habits,
        completedHabits
      })

      onCompletedHabits(completedHabits.length)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.habits.map(habit => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            className="flex items-center gap-3 group focus:outline-none"
            defaultChecked={habitsInfo?.completedHabits.includes(habit.id)}
          >
            <div className="h-8 w-8 bg-zinc-900 flex items-center justify-center border-2 border-zinc-800 rounded-lg group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500 group-focus:ring-2 group-focus:ring-offset-2 group-focus:ring-offset-bg group-focus:ring-violet-600">
              <Checkbox.Indicator>
                <Check size={20} weight="bold" className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="font-semibold text-xl text-white leading-tight">
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}
    </div>
  )
}