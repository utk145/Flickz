import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { fallbackPersonImage, image185 } from '../api/moviedb';

const Casts = ({ cast, nav }) => {
    // var castName = "Naseeruddin Shah";
    // var charName = "Captain Nemo";

    return (
        <View className='my-6'>
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }} horizontal showsHorizontalScrollIndicator={false}>
                {cast?.map((item, index) => (
                    <TouchableOpacity key={index} className='mr-4 items-center' onPress={() => nav.navigate("Actor", item)}>
                        <View className='overflow-hidden rounded-full h-20 w-20 items-center  border border-neutral-500'>
                            <Image source={{ uri: image185(item?.profile_path) || fallbackPersonImage }} className="rounded-2xl h-24 w-20" />
                        </View>
                        <Text className='text-white text-xs mt-1'>{item?.character.length > 10 ? item?.character.slice(0, 10) + '...' : item?.character}</Text>
                        <Text className='text-neutral-400 text-xs mt-1'>{item?.original_name.length > 10 ? item?.original_name.slice(0, 10) + '...' : item?.original_name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Casts