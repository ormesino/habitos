import { View } from "react-native"

interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  return (
    <View className="bg-zinc-700 h-3 w-full mt-4 rounded-xl">
      <View
        className="h-3 bg-violet-600 rounded-xl"
        style={{ width: `${progress}%` }}
      >
      </View>
    </View>
  )
}