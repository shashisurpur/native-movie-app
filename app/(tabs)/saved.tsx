import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { getSavedMovies } from "@/services/appWrite";
import useFetch from "@/services/useFetch";
import { Link } from "expo-router";

interface SavedMovieCardProp {
  movieId: number;
  title?: string;
  poster_url?: string;
}

const SavedMovieCard = ({ movieId, title, poster_url }: SavedMovieCardProp) => {
  return (
    <Link href={`/movies/${movieId}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_url
              ? `https://image.tmdb.org/t/p/w500${poster_url}`
              : `https://placehold.co/600*400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

const Saved = () => {
  const {
    data: savedMovies,
    errors: savedMoviesErrors,
    loading: savedMoviesLoading,
  } = useFetch(getSavedMovies);

  return (
    <View className="bg-primary flex-1 px-5 mt-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        {savedMoviesLoading && (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="my-3"
          />
        )}
        {savedMovies && savedMovies?.length > 0 ? (
          <View className="mt-24 flex-1 flex-col items-start justify-center ">
            <Text className="text-4xl text-white font-bold" numberOfLines={1}>
              Your Saved Movies
            </Text>
            <FlatList
              data={savedMovies}
              renderItem={({ item }) => (
                <SavedMovieCard {...item} key={item.id} />
              )}
              keyExtractor={(item) => item.movieId}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                marginRight: 5,
                marginBottom: 10,
                marginTop: 10,
              }}
              className="mt-14"
              scrollEnabled={false}
            />
          </View>
        ) : (
          <View className="flex flex-1 items-center justify-center flex-col gap-5">
            <Image source={icons.save} className="size-10" tintColor={"#fff"} />
            <Text className="text-base text-gray-500">Saved</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
