import { View, Text, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useCallback } from 'react';
import { useState } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';


export default function VideoPlayer() {
    const { params: video } = useRoute();
    const key = video && video.results && video.results.length > 0 ? video.results[0].key : null;

    const [isFullScreen, setisFullScreen] = useState(false);

    const onFullScreenChange = useCallback((isFullScreen) => {
        if (isFullScreen) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }, []);

    const nav = useNavigation();

    return (
        <>
            {key !== null ? (
                <View className='flex-1 bg-black '>
                    {/* ... */}
                    <View className={'w-full'}>
                        <SafeAreaView className={" z-20 w-full  flex-row justify-between items-center px-4 mt-4"}>
                            <TouchableOpacity className="p-1 rounded-xl" style={styles.background} onPress={() => nav.goBack()}>
                                <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>
                    <YoutubePlayer
                        videoId={key}
                        height={300}
                        play={true}
                        webViewStyle={{ marginTop: 70 }}
                        onFullScreenChange={onFullScreenChange}
                    />
                </View>
            ) : (
                <View className='flex-1 bg-black items-center'>
                    <TouchableOpacity className="p-1 rounded-xl mt-20 mb-9" style={styles.background} onPress={() => nav.goBack()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <Text className='text-white text-lg '>Video Unavailable</Text>
                </View>
            )}
        </>
    );
}








// export default function VideoPlayer() {
//     const { params: video } = useRoute();
//     const key = video?.results[0].key
//     // console.log(video.results[0].key);


//     // This isn't working, gotta work again on this to get exact trailer video
//     // const TrailerKey = video.results.find((item)=>item.type.value==='Trailer')?.key;
//     // console.log(TrailerKey);

//     const [isFullScreen, setisFullScreen] = useState(false)
//     const onFullScreenChange = useCallback((isFullScreen) => {
//         if (isFullScreen) {
//             ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//         } else {
//             ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
//         }
//     }, [])

//     const nav = useNavigation();

//     return (
//         <>
//             {key !== null ? (
//                 <View className='flex-1 bg-black '>
//                     {/* <Text>{key}</Text> */}
//                     <View className={'w-full'}>
//                         <SafeAreaView className={" z-20 w-full  flex-row justify-between items-center px-4 mt-4"}>
//                             <TouchableOpacity className="p-1 rounded-xl" style={styles.background} onPress={() => nav.goBack()}>
//                                 <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
//                             </TouchableOpacity>
//                         </SafeAreaView>
//                     </View>
//                     <YoutubePlayer
//                         videoId={key}
//                         height={300}
//                         play={true}
//                         webViewStyle={{ marginTop: 70 }}
//                         onFullScreenChange={onFullScreenChange}
//                     />
//                 </View>
//             ) : (
//                 <View className='flex-1 bg-black '>
//                     <Text>Video Unavialble</Text>
//                 </View>
//             )}
//         </>
//     )
// }