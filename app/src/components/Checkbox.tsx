import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  habit: boolean;
  title: string;
}

export function Checkbox({ checked = false, title, habit, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >

      {
        checked 
          ?
          <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </View>
          :
          <View className="h-8 w-8 bg-zinc-900 rounded-lg border-2 border-zinc-800" />
      }

      {
        habit
          ?
          <Text className="ml-3 font-semibold text-xl text-white">
            {title}
          </Text>
          :
          <Text className="ml-3 text-white text-base">
            {title}
          </Text>
      }

    </TouchableOpacity>
  )
}