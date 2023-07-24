import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react';
import { ChevronLeftIcon, VideoCameraIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from "../theme"
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Casts from '../components/Casts';
import MovieList from '../components/MoviesList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500, movieVideo } from '../api/moviedb';


export default function MovieScreen() {
  const { params: item } = useRoute();
  var { width, height } = Dimensions.get("window");
  const ios = Platform.OS == "ios";// Because SafeAreaView doesnt work on Android
  const mTop = ios ? '' : "mt-3";

  const [Movie, setMovie] = useState({});
  const [video, setVideo] = useState({});
  useEffect(() => {
    // Fetching API
    // console.log("Item id: ",item.id);
    setloading(true);
    getMovieDetails(item.id);
    getVideo(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("Movie Details",data);
    if (data) {
      setMovie(data);
    }
    setloading(false);
  }

  const getVideo = async (id) => {
    const data = await movieVideo(id);
    // console.log("Video Details", data.results[0].key);
    if (data) {
      setVideo(data);
    }
    setloading(false);

  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log("Similar Movie",data);
    if (data && data.results) {
      setsimilarMovies(data.results);
    }
    setloading(false);
  }

  const nav = useNavigation();
  const [Fav, setFav] = useState(false);

  // const movieName = "Movie is this";

  const [cast, setCast] = useState([]);
  const [similarMovies, setsimilarMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log("Movie Credits",data);
    if (data && data.cast) {
      setCast(data.cast);
    }
    setloading(false);
  }
  return (
    <>
      {loading ? (<Loading />) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          className="flex-1 bg-neutral-900"
        >
          <View className={'w-full'}>
            <SafeAreaView className={"absolute z-20 w-full  flex-row justify-between items-center px-4" + mTop}>
              <TouchableOpacity className="p-1 rounded-xl" style={styles.background} onPress={() => nav.goBack()}>
                <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFav(!Fav)}>
                <HeartIcon size={35} color={Fav ? theme.background : "white"} />
              </TouchableOpacity>
            </SafeAreaView>
            <View>
              {/* <Image source={require("../assets/images/moviePoster1.png")} style={{ width: width, height: height * .55 }} /> */}
              <Image source={{ uri: image500(Movie.poster_path) || fallbackMoviePoster }} style={{ width: width, height: height * .55 }} />
              <LinearGradient colors={['transparent', 'rgba(23,23,23,.8)', 'rgba(23,23,23,1)']} style={{ width: width, height: height * .40 }} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} className="absolute bottom-0" />
            </View>
          </View>
          <View style={{ marginTop: -(height * .09) }} className="space-y-3">
            {/* <Text className='text-white text-center font-bold text-3xl tracking-wider'>{movieName}</Text> */}
            <Text className='text-white text-center font-bold text-3xl tracking-wider'>{Movie?.title}</Text>
            {/* <Text className='text-neutral-400 text-center font-semibold text-base'>Released • 2020 • 170 min</Text> */}
            {Movie?.id ? (
              <Text className='text-neutral-400 text-center font-semibold text-base'>{Movie?.status} • {Movie?.release_date?.split('-')[0]} • {Movie?.runtime} min</Text>
            ) : null}
            {/* Genre */}
            {/* <View className='flex-row justify-center mx-4 space-x-2'>
              <Text className='text-neutral-400 font-semibold text-base text-center'>Action • </Text>
              <Text className='text-neutral-400 font-semibold text-base text-center'>Comedy • </Text>
              <Text className='text-neutral-400 font-semibold text-base text-center'>Romance  </Text>
            </View> */}
            <View className='flex-row justify-center mx-4 space-x-2'>
              {Movie?.genres?.map((item, index) => {
                let show = index + 1 != Movie.genres.length;
                return (
                  <Text className='text-neutral-400 font-semibold text-base text-center' key={index}>{item?.name} {show && '•'} </Text>
                )
              })}
            </View>
            <Text className='text-neutral-400 mx-4 tracking-wide'>{Movie?.overview}</Text>
            <TouchableOpacity className='mx-4' onPress={() => nav.navigate("Videoplayer", video)}><VideoCameraIcon size={30} strokeWidth={2} color={theme.background} /></TouchableOpacity>
          </View>
          {cast?.length > 0 && <Casts cast={cast} nav={nav} />}
          {similarMovies?.length > 0 && <MovieList title="Similar Movies" hidden={true} data={similarMovies} />}

        </ScrollView>
      )}
    </>
  )
}

// 1:19:18