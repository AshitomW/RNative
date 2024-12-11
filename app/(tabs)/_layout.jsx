import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { Image } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex justify-center gap-2 items-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6 top-3 "
      />
      <Text
        className={`${
          focused ? "font-semibold" : "font-normal"
        } text-xs top-3 w-16 text-center`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          borderWidth: 1,
          tabBarActiveTintColor: "#F39C12", // Matching secondary color from previous theme
          tabBarInactiveTintColor: "#E0E0E8", // Matching gray-100 from previous theme
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#3D4364", // Matching black-100 from previous theme
            borderTopWidth: 1,
            borderTopColor: "#2A4364", // Matching black-200 from previous theme
            height: 64,
          },
          tabBarIconStyle: {
            marginTop: 5, // Adjust icon positioning if needed
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",

            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
