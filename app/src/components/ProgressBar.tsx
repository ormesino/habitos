import { useEffect } from "react"
import { View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  const sharedProgress = useSharedValue(progress)

  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,

    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress);
  } , [progress])

  return (
    <View className="bg-zinc-700 h-3 w-full mt-4 rounded-xl">
      <Animated.View
        className="h-3 bg-violet-600 rounded-xl"
        style={style}
      >
      </Animated.View>
    </View>
  )
}