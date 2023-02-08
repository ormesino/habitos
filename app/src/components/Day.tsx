import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"

const screenHorPadding = (32 * 2) / 5

export const dayMargin = 8
export const daySize = (Dimensions.get('screen').width / 7) - (screenHorPadding + 5)

interface DayProps extends TouchableOpacityProps {}

export function Day({ ...rest }: DayProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-zinc-900 border-zinc-800 rounded-lg border-2 m-1"
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.6}
    />
  )
}