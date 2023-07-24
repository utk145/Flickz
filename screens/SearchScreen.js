import { View, Text, Dimensions, Platform, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import { debounce, values } from 'lodash';
import { fallbackMoviePoster, image500, searchMovies } from '../api/moviedb';


export default function SearchScreen() {
  var { width, height } = Dimensions.get("window");
  const ios = Platform.OS == "ios";
  const nav = useNavigation();
  const [results, setResults] = useState([])

  // const movieName = "Shang-Chi and the Legend of the Ten Rings (2021)";

  const handleSearch = val => {
    // console.log(val);
    if (val && val.length > 2) {
      searchMovies({ query: val, include_adult: "false", language: "en-US", page: "1" }).then(data => {
        // console.log(data);
        if (data && data.results) {
          setResults(data?.results);
        }
      })
    } else {
      setResults([]);
    }
  }
  const textDebounce = useCallback(debounce(handleSearch, 400), []);



  return (
    <View className={"flex-1 bg-neutral-800"}>
      <SafeAreaView className={ios ? "" : 'mt-4'}>
        <View className='mx-4 mb-3 flex-row items-center justify-between border border-neutral-500 rounded-full'>
          <TextInput onChangeText={textDebounce} placeholder='Search for movies/series ..' placeholderTextColor={"lightgray"} color="white" className='pb-1 pl-6 flex-1 text-base font-semibold tracking-wider' />
          <TouchableOpacity onPress={() => nav.goBack()} className='p-3 m-1 bg-neutral-500 rounded-full'>
            <XMarkIcon size={27} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
        {results.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className='space-y-3'>
            <Text className='text-white font-semibold ml-1'>Results ({results.length})</Text>
            <View className='flex-row justify-between flex-wrap'>
              {results.map((item, index) => {
                let movieName = item?.original_title;
                return (
                  <TouchableWithoutFeedback key={index} onPress={() => nav.push("Movie", item)}>
                    <View className='space-y-2 mb-4'>
                      {/* <Image className='rounded-3xl' source={require("../assets/images/moviePoster1.png")} style={{ width: width * 0.44, height: height * .3 }} /> */}
                      <Image className='rounded-3xl' source={{ uri: image500(item?.poster_path) || fallbackMoviePoster }} style={{ width: width * 0.44, height: height * .3 }} />
                      <Text className='text-neutral-400 ml-1'>{movieName?.length > 14 ? movieName.slice(0, 18) + '...' : movieName}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </View>
          </ScrollView>
        ) : (
          <View className='flex justify-center'>
            <Text className='text-white text-center font-semibold ml-1 mt-3'>Unable to get the requested result</Text>
            <Image source={require("../assets/images/movieTime.png")} className='h-96 w-96' />
          </View>
        )}

      </SafeAreaView>
    </View>
  )
}
// 50:03