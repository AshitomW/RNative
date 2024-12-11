import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { icons } from "../constants";
import { Image } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const zoomIn = {
  0: {
    scale: 0.85,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.85,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.showNowPlayingNotification = false;
    player.currentTime = 10;
    player.play();
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center items-center"
        activeOpacity={0.7}
        onPress={() => {
          setPlay(true);
          setVideoUrl(item.uri);
        }}
      >
        <ImageBackground
          source={{ uri: item.thumbnail }}
          className="w-52 h-72 rounded-[35px] my-3 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
        <Image
          source={icons.play}
          className="w-12 h-12 absolute"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = function ({ viewableItems }) {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
      }}
      contentOffset={{ x: 170 }}
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return <TrendingItem activeItem={activeItem} item={item} />;
      }}
    />
  );
};

export default Trending;
