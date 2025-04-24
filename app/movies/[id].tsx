import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import { getSavedMovies, saveMovie } from "@/services/appWrite";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 text-sm font-normal">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    errors: movieErrors,
    loading: movieLoading,
  } = useFetch(() => fetchMovieDetails(id as string));

  const {
    data: savedMovies,
    errors: savedMoviesErrors,
    loading: savedMoviesLoading,
  } = useFetch(getSavedMovies);

  console.log(
    "saved",
    savedMovies,
    savedMovies?.findIndex((s) => Number(s.movieId) === Number(id)),
    id
  );

  const handleSaveMovie = async () => {
    if (movie) {
      // await saveMovie(movie?.id, movie?.title);
      await saveMovie(movie);
    }
  };

  return (
    <View className="flex-col gap-14 bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col justify-center items-start mt-5 px-5">
          <View className="w-full flex flex-row items-center justify-between">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            {savedMovies &&
            savedMovies?.length > 0 &&
            savedMovies?.findIndex((s) => Number(s.movieId) === Number(id)) !==
              -1 ? (
              <Image
                source={icons.saved}
                className="size-6"
                tintColor={"#fff"}
              />
            ) : (
              <TouchableOpacity onPress={() => handleSaveMovie()}>
                <Image
                  source={icons.save}
                  className="size-6"
                  tintColor={"#fff"}
                />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10{" "}
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget ? `$${movie?.budget / 1_000_000} millions` : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={movie?.revenue ? `$${movie?.revenue / 1_000_000}` : "N/A"}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((g) => g.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="flex mt-10 bottom-12  left-0 right-0 mx-2 bg-accent rounded-lg py-2.5 flex-row items-center justify-center absolute"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-base text-white font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
