import React from 'react'
import { Dimensions } from 'react-native';
import { View, Text } from 'react-native'
import * as Progress from 'react-native-progress';

export default function Loading() {
    var { width, height } = Dimensions.get("window");
    return (
        <View className="absolute flex-row items-center justify-center bg-neutral-800" style={{ width, height }}>
            <Progress.CircleSnail color={['#F25022', 'green', 'yellow','lightblue']} thickness={10} size={160} />
        </View>
    )
}