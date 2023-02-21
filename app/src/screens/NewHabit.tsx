import { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { api } from "../lib/axios";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabit() {
  const [title, setTitle] = useState<string>('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleCheckbox(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(prevState => prevState.filter((weekDays) => weekDays !== weekDay))
    } else {
      setWeekDays(prevState => [...prevState, weekDay])
    }
  }

  async function handleCreateHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert('Novo Hábito', 'Preencha o título do hábito e a periodicidade')
      }

      await api.post('/habits', {
        title,
        weekDays
      })

      setTitle('')
      setWeekDays([])

      Alert.alert('Novo Hábito', 'Hábito criado com sucesso!')
    } catch (error) {
      console.log(error)
      Alert.alert('ERRO!', 'Não foi possível criar o hábito')
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
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {
          availableWeekDays.map((weekDay, index) => {
            return (
              <Checkbox
                key={weekDay}
                habit={false}
                title={weekDay}
                checked={weekDays.includes(index)}
                onPress={() => handleToggleCheckbox(index)}
              />
            )
          })
        }

        <TouchableOpacity
          className="w-full flex-row h-14 bg-green-600 justify-center items-center rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateHabit}
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