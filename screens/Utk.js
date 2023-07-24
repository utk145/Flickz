
import React from 'react';
import { Image, SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableHighlight, Linking } from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = width * 0.5;

const Utk = () => {

    const handleGithubLinkPress = () => {
        // Open link to github.com/utk145 in browser
        Linking.openURL('https://github.com/utk145');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: "https://avatars.githubusercontent.com/u/122993091?v=4" }} style={[styles.image, { width: imageSize, height: imageSize, borderRadius: imageSize / 2 }]} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Hey there! Thanks for checking out my React Native Movies App! My name is Utkarsh and I'm the developer behind this app.  I hope you liked it and you enjoyed using it as much as I enjoyed creating it.
                </Text>
                <TouchableHighlight onPress={handleGithubLinkPress} underlayColor="transparent">
                    <Text style={styles.linkText}>
                        github.com/utk145
                    </Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(38, 38, 38)",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:30,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    image: {
        resizeMode: 'cover',
    },
    textContainer: {
        marginHorizontal: 20,
        marginTop: 20, 
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        marginBottom: 20,
        color:"#FFEBCD",
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: 2,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    linkText: {
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: 2,
        fontWeight: 'bold',
        color: "#ea0808",
    },
});

export default Utk;