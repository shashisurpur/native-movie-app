import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import Search from "./search";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appWrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    errors: trendingErrors,
  } = useFetch(getTrendingMovies);

  console.log("trendin", trendingMovies);

  const {
    data: movies,
    errors: moviesErrors,
    loading: moviesLoading,
  } = useFetch(() => fetchMovies({ query: "" }));

  console.log("movies", movies);
  // useEffect(() => {
  //   console.log("movies", movies);
  // }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <ImageBackground
        source={images.bg}
        resizeMode="stretch"
        className="w-full h-full absolute z-0"
        // style={{
        //   resizeMode: "stretch",
        //   flex: 1,
        //   justifyContent: "center",
        //   alignItems: "center",
        //   width: "100%",
        //   height: "100%",
        // }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-12 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesErrors || trendingErrors ? (
          <Text>Error: {moviesErrors?.message || trendingErrors?.message}</Text>
        ) : (
          <View className="flex-1 mx-5 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
              value=""
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-white text-lg font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white mt-5 mb-3 font-bold">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} key={item.id} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  marginRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
