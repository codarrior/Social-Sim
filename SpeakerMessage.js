import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 3
    },
    rightContainer: {
        flex:1,
        flexDirection: 'column',
    },
    headShot: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    speakerName: {
        flex:1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#656565',
    },
    speakerWords: {
        flex:1,
        fontSize: 15,
        color: '#656565',
    }
});

export default class SpeakerMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (             
            <View style={styles.container}>
                <Image source={{uri: this.props.headShotURI}} style={styles.headShot} />
                <View style={styles.rightContainer}>
                    <Text style={styles.speakerName}>{this.props.sentences.slice(0, this.props.sentences.search(':')+1)}</Text>
                    <Text style={styles.speakerWords}>{this.props.sentences.slice(this.props.sentences.search(':')+1)}</Text>
                </View>                
            </View>      
        );
    }
}