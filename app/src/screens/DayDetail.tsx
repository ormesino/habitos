import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, DatePickerIOSProps } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { api } from "../lib/axios";

import { generateProgressPercentage } from "../utils/generateProgressPercentage";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";

interface DayDetailProps {
  date: Date
  amount: number
}

interface DayInfo {
  habits: {
    id: string,
    title: string,
  }[];
  completedHabits: string[];
}

export function DayDetail() {
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { navigate } = useNavigation();

  const { date } = route.params as DayDetailProps;
  const dateFormatted = dayjs(date).add(3, 'hours').toISOString();
  const weekDay = dayjs(date).format('dddd');
  const abvDay = dayjs(date).format('DD/MM');

  const dayProgress = dayInfo?.habits.length ? generateProgressPercentage(completedHabits.length, dayInfo.habits.length) : 0;

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      setLoading(true);
      const response = await api.get(`/dayHabits`, {
        params: {
          date: dateFormatted,
        }
      })
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert('ERRO!', 'Não foi possível carregar os hábitos do dia.');
    } finally {
      setLoading(false);
    }
  } 

  async function handleToggleHabit(habitId: string) {
    try {
      let dayParsed = dayjs(date).startOf('day').add(3, 'hours').toISOString()

      await api.patch('/habits/toggle', {
        date: dayParsed,
        id: habitId
      })

      if (completedHabits.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(id => id !== habitId));
      } else {
        setCompletedHabits(prevState => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return (<Loading />)

  return (
    <View className="flex-1 flex-col bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <BackButton />

        <Text className="mt-4 font-semibold text-zinc-400 text-base lowercase">
          {weekDay}
        </Text>

        <Text className="mt-2 text-white font-extrabold text-3xl">
          {abvDay}
        </Text>

        <ProgressBar progress={dayProgress} />

        <View className="mt-6">
          {
            dayInfo?.habits.length
            ?
            dayInfo?.habits.map((habit) => (
              < Checkbox
                key={habit.id}
                habit={true}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
            : 
            <Text className="text-white text-base">
              Poxa... Você não tem hábitos cadastrados para este dia. 😢
              <Text 
                className="text-violet-400 font-semibold underline active:text-violet-500"
                onPress={() => navigate('new')}              
              >
                {"\n\n"}Comece cadastrando um! 📝
              </Text>
            </Text>
          }
        </View>
      </ScrollView>
    </View>
  );
}