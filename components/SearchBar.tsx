import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View
      className="flex-row items-center bg-dark-200 rounded-full py-4 px-6"
      //   style={{
      //     paddingLeft:'1'
      //   }}
      //   style={{ paddingLeft: "22px" }}
    >
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#ab8bff"}
        className="flex ml-2 text-white w-full"
      />
    </View>
  );
};

export default SearchBar;
