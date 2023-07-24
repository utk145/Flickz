import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { image500 } from '../api/moviedb';



export default function Card({ item ,width,height,handleCLickMovie}) {
    // console.log(item.poster_path);
    return (
        // Pre-api
        // <TouchableWithoutFeedback onPress={()=>handleCLickMovie(item)}>
        //     <Image source={require("../assets/images/moviePoster2.png")} style={{ width: width * .6, height: height * .4 }} className="rounded-3xl" />
        // </TouchableWithoutFeedback>
        
        // With-api 
        <TouchableWithoutFeedback onPress={()=>handleCLickMovie(item)}>
            <Image source={{uri:image500(item.poster_path)}} style={{ width: width * .6, height: height * .4 }} className="rounded-3xl" />
        </TouchableWithoutFeedback>
    )
}

