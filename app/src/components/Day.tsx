import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"
import clsx from "clsx"
import dayjs from "dayjs"

import { generateProgressPercentage } from "../utils/generateProgressPercentage"

const screenHorPadding = (32 * 2) / 5

export const dayMargin = 8
export const daySize = (Dimensions.get('screen').width / 7) - (screenHorPadding + 5)

interface DayProps extends TouchableOpacityProps {
  amountOfHabits?: number
  amountCompleted?: number
  date: Date
}

export function Day({ amountCompleted = 0, amountOfHabits = 0, date, ...rest }: DayProps) {
  const progressPercentage = amountCompleted > 0 ? generateProgressPercentage(amountCompleted, amountOfHabits) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today, 'day')

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        "bg-violet-500 border-violet-400": progressPercentage >= 80,
        "bg-violet-600 border-violet-500": progressPercentage >= 60 && progressPercentage < 80,
        "bg-violet-700 border-violet-500": progressPercentage >= 40 && progressPercentage < 60,
        "bg-violet-800 border-violet-600": progressPercentage >= 20 && progressPercentage < 40,
        "bg-violet-900 border-violet-700": progressPercentage > 0 && progressPercentage < 20,
        "bg-zinc-900 border-zinc-800": progressPercentage === 0,
        "border-zinc-200 border-3": isCurrentDay
      })}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.6}
      {...rest}
    />
  )
}