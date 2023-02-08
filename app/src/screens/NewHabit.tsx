import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabit() {
  const [checkedDays, setCheckedDays] = useState<number[]>([])

  function handleToggleCheckbox(weekDay: number) {
    if (checkedDays.includes(weekDay)) {
      setCheckedDays(prevState => prevState.filter((checkedDays) => checkedDays !== weekDay))
    } else {
      setCheckedDays(prevState => [...prevState, weekDay])
    }
  }

  return (
    <View className="flex-1 flex-col bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          selectionColor={colors.green[600]}
          placeholder="Execício físico, dormir 6hrs, ler 1h, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {
          weekDays.map((weekDay, index) => {
            return (
              <Checkbox
                habit={false}
                key={weekDay}
                title={weekDay}
                checked={checkedDays.includes(index)}
                onPress={() => handleToggleCheckbox(index)}
              />
            )
          })
        }

        <TouchableOpacity
          className="w-full flex-row h-14 bg-green-600 justify-center items-center rounded-md mt-6"
          activeOpacity={0.7}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className="font-semibold text-white text-base ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}