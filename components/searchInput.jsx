import {
  View,
  Text,
  TextInput,
  Touchable,
  Image,
  TouchableOpacity,
} from "react-native";
import { Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants/";
import { router, usePathname } from "expo-router";
const SearchField = ({ initialQuery, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View
      className={`w-full h-16 px-4 rounded-2xl border-2 flex flex-row items-center 
        ${isFocused ? "border-secondary-100" : ""}`}
      style={{
        backgroundColor: "#1E3045",
        borderColor: "#1E3045",
      }}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert(
              "Missing Query",
              "Please Input Something To Search"
            );
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
