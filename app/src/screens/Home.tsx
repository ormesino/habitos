import { useState, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import { api } from "../lib/axios";
import { generateRange } from "../utils/rangeBetweenDates";

import { Day, daySize } from "../components/Day";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type SummaryProps = {
  id: string;
  date: string;
  completed: number;
  totalHabits: number;
}[]

//  Relação de constantes para preencher com dias passados e dias que virão
const datesPassed = generateRange()
const minWeeks = 18 * 10 // 18 semanas
const datesToFill = minWeeks - datesPassed.length

export function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (error) {
      Alert.alert('Network', 'Erro ao buscar dados')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []
  ))

  if (loading) return (<Loading />)

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
        {
          summary &&
          <View
            className="flex-row flex-wrap"
          >
            {
              datesPassed.map((date) => {
                const dayWithHabits = summary.find((day) => {
                  return dayjs(date).isSame(day.date, 'day')
                })

                return (
                  <Day
                    key={date.toISOString()}
                    date={date}
                    amountCompleted={dayWithHabits?.completed}
                    amountOfHabits={dayWithHabits?.totalHabits}
                    onPress={() => navigate('day', { date: date.toISOString() })}
                  />
                )
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
        }
      </ScrollView>
    </View>
  )
}