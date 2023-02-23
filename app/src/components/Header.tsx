import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from 'tailwindcss/colors';

import Logo from '../assets/logo.svg';

export function Header() {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        activeOpacity={0.6}
        className="flex-row h-11 px-4 border border-violet-500 items-center rounded-lg group active:text-violet-500"
        onPress={() => navigate('new')}
      >
        <Feather
          name="plus"
          size={24}
          color={colors.violet[500]}
        />
        <Text
          className="text-white ml-3 font-semibold text-base"
        >
          Novo hábito
        </Text>
      </TouchableOpacity>
    </View>
  )
}