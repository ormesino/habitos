import { View, Text, ScrollView } from "react-native";

import { generateRange } from "../utils/rangeBetweenDates";

import { Day, daySize } from "../components/Day";
import { Header } from "../components/Header";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

//  Relação de constantes para preencher com dias passados e dias que virão
const datesPassed = generateRange()
const minWeeks = 18 * 10 // 18 semanas
const datesToFill = minWeeks - datesPassed.length

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View
        className="flex-row mt-6 mb-2"
      >
        {
          weekDays.map((weekDay, index) => {
            return (
              <Text
                key={`${weekDay}-${index}`}
                className="text-zinc-400 text-xl font-bold text-center m-1"
                style={{ width: daySize }}
              >
                {weekDay}
              </Text>
            )
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View
          className="flex-row flex-wrap"
        >
          {
            datesPassed.map((date) => {
              return <Day key={date.toISOString()} />
            })
          }
          {
            datesToFill > 0 && Array.from({ length: datesToFill }).map((_, index) => {
              return (
                <View
                  key={index}
                  className="bg-zinc-900 border-zinc-800 rounded-lg border-2 m-1 opacity-40 cursor-not-allowed"
                  style={{ width: daySize, height: daySize }}
                />
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}