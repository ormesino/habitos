import { generateRange } from "../utils/rangeBetweenDates"
import { Day } from "./Day"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S',]

//  Relação de constantes para preencher com dias passados e dias que virão
const datesPassed = generateRange()
const minWeeks = 18 * 7 // 18 semanas
const datesToFill = minWeeks - datesPassed.length

export function Dashboard() {
  return (
    <div className='w-full flex'>
      {/* Geração de um grid com as iniciais dos dias da semana */}
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      {/* Geração de um grid com os dias passados e os dias que virão */}
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {datesPassed.map((date) => {
          return <Day key={date.toString()} />
        })}

        {datesToFill > 0 && Array.from({ length: datesToFill }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          )
        })}
      </div>
    </div>
  )
}
