import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import FormField from "../../components/formfield";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import CustomButton from "../../components/button";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Create = () => {
  const [isUploading, setUploading] = useState(false);
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ["images"] : ["videos"],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    const data = { ...form, userId: user.$id };
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Error", "Fill In All The Fields");
    }

    setUploading(true);

    try {
      await createVideo(data);

      Alert.alert("Success", "Successfully uploaded the file !");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give Your Video A Cool Title"
          handleTextChange={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-50 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            <View
              className="w-full h-36 px-4  rounded-2xl justify-center items-center"
              style={{
                backgroundColor: "#1E3045",
                borderColor: "#1E3045",
              }}
            >
              <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-50 font-pmedium">
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#1E3045",
                  borderColor: "#1E3045",
                }}
                className="w-full h-16 px-4  rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2"
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5 mr-2"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleTextChange={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={isUploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
