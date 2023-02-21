import { View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface DayDetailProps {
  date: string
  amount: number
}

export function DayDetail({ amount }: DayDetailProps) {
  const { goBack } = useNavigation();
  const route = useRoute();

  const { date } = route.params as DayDetailProps;
  const weekDay = dayjs(date).format('dddd');
  const abvDay = dayjs(date).format('DD/MM');

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

        <ProgressBar progress={40}/>

        <View className="mt-6">
          <Checkbox habit={true} title="Beber 2L de água" checked={false} />
          <Checkbox habit={true} title="Estudar 1hr" checked={true} />
        </View>
      </ScrollView>
    </View>
  );
}