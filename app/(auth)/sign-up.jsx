import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/";
import FormField from "../../components/formfield";
import CustomButton from "../../components/button";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.username || !form.email || !form.password)
      Alert.alert("Error", "Please Fill In All The Fields");

    setSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-[90vh] justify-center px-6 my-6">
          <Image
            source={images.logo}
            resizeMethod="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white mt-10 font-psemibold">
            Sign Up To Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleTextChange={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleTextChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleTextChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account ?{" "}
            </Text>
            <Text
              onPress={() => router.back()}
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
