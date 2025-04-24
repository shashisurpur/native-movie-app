import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

// interface Movie{
//     id:number,
//     title:string,adult:boolean,poster_path:,vote_average,release_date,video
// }

const MovieCard = ({
  id,
  title,
  adult,
  poster_path,
  vote_average,
  release_date,
  video,
}: Movie) => {
  const starCount = Math.round(vote_average) / 2;

  const arrayForStars = Array.from({ length: starCount }, (_, i) => i);

  return (
    <Link href={`/movies/${id}`} asChild key={id}>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600*400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          {/* {arrayForStars.map((stars, index) => (
            <Image source={icons.star} key={index} />
          ))} */}
          <Image source={icons.star} />
          <Text className="text-white text-xs font-bold uppercase">
            {starCount}{" "}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
