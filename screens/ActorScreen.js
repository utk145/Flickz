import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles, theme } from '../theme';
import { useState, useEffect } from 'react';
import MovieList from '../components/MoviesList';
import Loading from '../components/Loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342, image500 } from '../api/moviedb';

export default function ActorScreen() {
  var { width, height } = Dimensions.get("window");
  const ios = Platform.OS == "ios";// Because SafeAreaView doesnt work on Android
  const nav = useNavigation();
  const mVertical = ios ? '' : "my-3";
  const [Fav, setFav] = useState(false);


  const [actorMovies, setactorMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [actor, setActor] = useState({});

  const { params: item } = useRoute();
  useEffect(() => {
    setloading(true);
    getActorDetails(item.id);
    getActorMovies(item.id);
  }, [item])

  const getActorDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    // console.log(data);
    if (data) {
      setActor(data);
    }
    setloading(false);
  }
  const getActorMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log(data);
    if (data&&data.cast) {
      setactorMovies(data.cast);
    }
    setloading(false);
  }

  return (<>
    {loading ? (
      <Loading />) : (
      <ScrollView className="flex-1 bg-neutral-800" contentContainerStyle={{ paddingBottom: 20 }}>
        <SafeAreaView className={"mt-2 z-20 w-full  flex-row justify-between items-center px-4" + mVertical}>
          <TouchableOpacity className="p-1 rounded-xl" style={styles.background} onPress={() => nav.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFav(!Fav)}>
            <HeartIcon size={35} color={Fav ? theme.background : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        <View >
          <View className='flex-row justify-center'>
            <View className='items-center rounded-full border-2 border-neutral-400 overflow-hidden h-72 w-72 shadow-slate-500'>
              <Image source={{ uri: image342(actor?.profile_path) || fallbackPersonImage }} style={{ height: height * .43, width: width * .74 }} />
            </View>
          </View>
          <View className='mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>{actor?.name}</Text>
            <Text className='text-base text-neutral-500 text-center'>{actor?.place_of_birth}</Text>
          </View>
          <View className='mx-3 mt-6 flex-row justify-between items-center bg-neutral-900 rounded-2xl p-4'>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className='text-white font-semibold'>Gender</Text>
              <Text className='text-neutral-300 text-sm'>{actor?.gender === 2 ? "Male" : "Female"}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className='text-white font-semibold'>Birthday</Text>
              <Text className='text-neutral-300 text-sm'>{actor?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className='text-white font-semibold'>Known for</Text>
              <Text className='text-neutral-300 text-sm'>{actor?.known_for_department}</Text>
            </View>
            <View className="px-2 items-center">
              <Text className='text-white font-semibold'>Popularity</Text>
              <Text className='text-neutral-300 text-sm'>{actor?.popularity?.toFixed(2)} %</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className='text-white text-lg'>Biography</Text>
            <Text className="text-white opacity-50 text-justify text-[15px]">{actor.biography || "NA"}</Text>
          </View>
          <MovieList title="Movies" hidden={true} data={actorMovies} />
        </View>
      </ScrollView>
    )}
  </>
  )
}
