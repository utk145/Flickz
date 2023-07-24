import { View, Text, SafeAreaView, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, RssIcon } from "react-native-heroicons/outline"
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import TrendingMovie from '../components/TrendingMovie';
import MovieList from '../components/MoviesList';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb"


const ios = Platform.OS == "ios";// Because SafeAreaView doesnt work on Android
export default function HomeScreen() {

  const nav = useNavigation();
  const [tredingMovies, setTredingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log("Trending movies are ", data);
    if (data && data.results) {
      setTredingMovies(data.results);
      setloading(false);
    }
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log("Upcoming movies are ", data);
    if (data && data.results) {
      setUpcomingMovies(data.results);
      setloading(false);
    }
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log("Toprated movies are ", data);
    if (data && data.results) {
      setTopRatedMovies(data.results);
      setloading(false);
    }
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx-4 mt-1">
          <TouchableOpacity onPress={() => nav.navigate("Utk")}>
            <RssIcon color="#c0c0c0" size={26} strokeWidth={2} />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>F</Text>lickz
          </Text>
          <TouchableOpacity onPress={() => nav.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
          {tredingMovies.length > 0 &&
            <TrendingMovie data={tredingMovies} />
          }
          {
            upcomingMovies.length > 0 &&
            <MovieList title="Upcoming" data={upcomingMovies} />
          }
          {
            topRatedMovies.length > 0 &&
            <MovieList title="Top Rated" data={topRatedMovies} />
          }
        </ScrollView>
      )}
    </View>
  )
}