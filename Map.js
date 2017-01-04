import React, { Component, PropTypes } from 'react';
import { StyleSheet, NavigatorIOS, View, Image, Text } from 'react-native';


const styles = StyleSheet.create({
    bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    bgImage: {
        resizeMode: "stretch",
        width: 375,
        height: 650,
        marginTop:20,
        alignItems: 'stretch',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});


export default class Map extends Component {

    render() {
            var mapImageURI = './images/SocialLabMockup-Map.png';
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.bgImageWrapper}>
                        <Image source={require('./images/SocialLabMockup-Map.png')} style={styles.bgImage} />
                    </View>
                </View>
        );
    }
}
