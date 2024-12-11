import { View, Text, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { images } from "../../constants/";
import SearchField from "../../components/searchInput";
import Trending from "../../components/trendings";
import EmptyState from "../../components/emptyState";
import { getAllPosts, getLatestPosts, searchPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/videoCard";
import { useLocalSearchParams } from "expo-router";
const Query = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
              </View>
            </View>
            <SearchField
              initialQuery={query}
              placeholder="Search For A Video Topic"
            />
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

export default Query;
