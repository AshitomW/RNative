import {
  View,
  Text,
  TextInput,
  Touchable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants/";
const FormField = ({
  title,
  value,
  placeholder,
  handleTextChange,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium px-1 py-2">
        {title}
      </Text>
      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 flex flex-row items-center 
        ${isFocused ? "border-secondary-100" : "border-black-200"}`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((previousState) => !previousState)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
