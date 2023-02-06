import * as Progress from "@radix-ui/react-progress"
import clsx from "clsx"

interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <Progress.Root className="overflow-hidden bg-zinc-700 rounded-xl w-full h-3 mt-4" >
      {/* Estilização condicional da barra */}
      <Progress.Indicator
        className={clsx("w-full h-full transition-transform", {
          "bg-violet-500": props.progress >= 80,
          "bg-violet-600": props.progress >= 60 && props.progress < 80,
          "bg-violet-700": props.progress >= 40 && props.progress < 60,
          "bg-violet-800": props.progress >= 20 && props.progress < 40,
          "bg-violet-900": props.progress > 0 && props.progress < 20,
          "bg-zinc-900": props.progress === 0
        })}
        style={{ transform: `translateX(-${(100 - props.progress)}%)` }}
      />
    </Progress.Root>
  )
}