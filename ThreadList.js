import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

import ProblemDetail from './ProblemDetail';
import * as firebase from 'firebase';
import SpeakerMessage from './SpeakerMessage';

const firebaseConfig = {
  apiKey: 'AIzaSyCrgdzru43Nbhc0LaoL-nrbP00bJeYur-o',
  authDomain: 'polyup-react.firebaseapp.com',
  databaseURL: 'https://polyup-react.firebaseio.com',
  storageBucket: 'polyup-react.appspot.com'
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    topic: {
        height:50,
        marginLeft:50,
        justifyContent:'center',

    },
    thumbnail: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        marginBottom: 8
    },
    author: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
   threadPic: {
       width: 280,
       height: 200,
       marginLeft: 70,
       marginRight: 10,
       marginBottom: 10,
       backgroundColor: "#FFFFFF"
   }
});

export default class ThreadList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            independentTexts: {},
            npcLists: {},
            npcNameLists: [],
            topicNameList:[],
            topicList: {},
            topicCount: 0,
            npcCount: 0,
            playerName: "Emma",
            playerHeadshot: "https://firebasestorage.googleapis.com/v0/b/polyup-react.appspot.com/o/player%2FPlayerHeadshot2.png?alt=media&token=c3cdd78b-6da5-4fdd-b665-570e8541f622",
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            topicSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            topicNameSelected:'',
            threadRowList:[],
            isTopicNameSelected: false,
        };

        this.threadRef = firebaseApp.database().ref('threads');
        this.textRef = firebaseApp.database().ref('independent_texts');
        this.npcRef = firebaseApp.database().ref('npc');
        this.vipRef = firebaseApp.database().ref('vip');
        this.topicsRef = firebase.database().ref('topics');
    }

    listViewStyle = function() {
        if ( this.props.listType == 'topic') {
            if ( this.props.isTopicNameSelected == true) {
                return {
                    flex:1,
                    backgroundColor: '#FFFFFF',
                }
            }
            else {
                return {
                    flex:1,
                    marginTop: 60,
                    backgroundColor: '#FFFFFF',
                    marginBottom:50,
                }
            }
        }
        else if ( this.props.listType == 'showAll') {
            return {
                flex:1,
                marginTop: 60,
                backgroundColor: '#FFFFFF',
                marginBottom:50,
            }
        }
    }

    listenForItems(itemsRef, textRef, npcRef, vipRef, topicsRef ) {
        npcRef.on('value', (snap) => {
            var names = [];
            var length = 0;
            snap.forEach((child) => {
                names.push({
                    npcName: child.key
                })
                length += 1;
            });

            this.setState({
                npcLists: snap.val(),
                npcNameLists: names,
                npcCount: length
            });

            itemsRef.on('value', (snap) => {
                // get children as an array
                var items = [];
                snap.forEach((child) => {
                    var rNum1 = Math.floor((Math.random() * length)) % length;
                    items.push({
                        author: child.val().Author,
                        parody: child.val().Parody,
                        threadPic: child.val().Pic,
                        posts: child.val().Posts,
                        prerequisite: child.val().Prerequisite,
                        region: child.val().Region,
                        threadText: child.val().Text,
                        threadTopic: child.val().Topic,
                        threadVIP: child.val().VIP,
                        threadIndex: child.key,
                        threadNPCName: names[rNum1].npcName,
                        threadPostCount: 0,
                    });
                });

                this.setState({
                    threadRowList: items,
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                });
            });

        });

        textRef.on('value', (snap) => {
            this.setState({
                independentTexts: snap.val()
            })
        });

        topicsRef.on('value', (snap) => {
            var names = [];
            var length = 0;
            snap.forEach((child) => {
                names.push({
                    topicName: child.key
                })
                length += 1;
            });

            this.setState({
                topicList: snap.val(),
                topicNameList: names,
                npcCount: length
            });

            this.setState({
                topicSource: this.state.dataSource.cloneWithRows(names),
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.listenForItems(this.threadRef, this.textRef, this.npcRef, this.vipRef, this.topicsRef );
    }

    showProblemDetail(threadSelected) {
       this.props.navigator.push({
           title: '',
           component: ProblemDetail,
           passProps: { currentThread: threadSelected,
                        currentPost: threadSelected.posts["post_"+1],
                        independentTexts: this.state.independentTexts,
                        npcLists:this.state.npcLists,
                        npcCount: this.state.npcCount,
                        npcNameLists:this.state.npcNameLists,
                        playerName:this.state.playerName,
                        playerHeadShot: this.state.playerHeadshot,
                        topicList: this.state.topicList,
                        topicNameList: this.state.topicName,
                        topicCount: this.state.topicList
                     },
           index: 1
       });
    }

    renderThread(threadSelected) {
       return (
            <TouchableHighlight onPress={() => this.showProblemDetail(threadSelected)}  underlayColor='#dddddd'>
                <View>
                    <SpeakerMessage
                            headShotURI={this.state.npcLists[threadSelected.threadNPCName].Headshot}
                            sentences= {'@' + threadSelected.threadNPCName + ': ' + threadSelected.threadText} />
                    <View style={styles.threadPic}>
                        <Image source={{uri: threadSelected.threadPic}} style={{flex: 1}}/>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }

   renderTopicThread(topicSelected) {
        var items = [];
        this.state.threadRowList.forEach((child) => {
            if ( child.threadTopic == topicSelected.topicName) {
                items.push(child);
            }
        });

        var topicThreadListSource =  new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            });
        topicThreadListSource = topicThreadListSource.cloneWithRows(items);
        this.props.navigator.push({
            title: '',
            component: ThreadList,
            passProps: {listType:'topic', isTopicNameSelected:true, topicThreadListSource: topicThreadListSource},
        });
   }

   renderTopics(topicSelected) {
       return (
            <TouchableHighlight onPress={() => this.renderTopicThread(topicSelected)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.topic}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>{topicSelected.topicName}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }

   render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        else if ( this.props.listType == 'topic' ) {
            if ( this.props.isTopicNameSelected == true)
            {
                return ( <
                    ListView dataSource = { this.props.topicThreadListSource }
                    renderRow = { this.renderThread.bind(this) }
                    style = { this.listViewStyle() }
                    />
                );
            }
            else {
                return (<
                    ListView dataSource = { this.state.topicSource }
                    renderRow = { this.renderTopics.bind(this) }
                    style = { this.listViewStyle() }
                />);
            }

        }

        return ( <
            ListView dataSource = { this.state.dataSource }
            renderRow = { this.renderThread.bind(this) }
            style = { this.listViewStyle() }
            />
        );
   }

    renderLoadingView() {
        if ( this.props.listType == 'topic') {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                    <Text>
                        Loading Topics...
                    </Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                    <Text>
                        Loading Threads...
                    </Text>
                </View>
            );
        }
    }
}
