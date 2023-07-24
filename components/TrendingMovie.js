import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Carousel } from "react-native-snap-carousel";
import Card from "./Card";
import { useNavigation } from "@react-navigation/native";



export default function TrendingMovie({ data }) {
    var { width, height } = Dimensions.get("window");
    const nav = useNavigation();
    const handleCLickMovie = (item) => {
        // console.log("Click Works");
        nav.navigate("Movie", item);
    };
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5 font-semibold">
                Trending
            </Text>
            <Carousel
                data={data}
                renderItem={({ item }) => (
                    <Card
                        item={item}
                        width={width}
                        height={height}
                        handleCLickMovie={handleCLickMovie}
                    />
                )}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: "flex", alignItems: "center" }}
            />
        </View>
    );
}
