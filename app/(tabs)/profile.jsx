import {
  View,
  Text,
  Image,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { icons, images } from "../../constants/";
import SearchField from "../../components/searchInput";
import Trending from "../../components/trendings";
import EmptyState from "../../components/emptyState";
import {
  getAllPosts,
  getLatestPosts,
  getUserPosts,
  searchPosts,
  signOut,
} from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/videoCard";
import { router, useLocalSearchParams } from "expo-router";
import InfoBox from "../../components/infoBox";
const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace(`/sign-in`);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
            <TouchableOpacity
              className="w-full justify-center items-end mt-6 mb-12 px-4"
              onPress={() => {
                logout();
              }}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                containerStyles="mr-10"
                subtitle="posts"
                titleStyles="text-xl"
              />
              <InfoBox
                title={"1.2M"}
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Found"
              subtitle="Be the first one to create a video"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
