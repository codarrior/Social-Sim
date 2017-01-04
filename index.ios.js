import React, { Component } from 'react';
import { AppRegistry, TabBarIOS, View, Text } from 'react-native';

import Map from './Map';
import Lab from './Lab';
import Topics from './Topics';
import Feed from './Feed';


class SocialSim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Map'
        };

    }

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'Map'}
                    title = ""
                    icon={require('./icons/mapIcon.png')}
                    selectedIcon  = {require('./icons/mapIcon_active.png')}
                    renderAsOriginal
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Map'
                        });
                    }}>
                    <Map/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'Lab'}
                    title = ""
                    icon={require('./icons/labIcon.png')}
                    selectedIcon  = {require('./icons/labIcon_active.png')}
                    renderAsOriginal
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Lab'
                        });
                    }}>
                    <Lab/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'Topic'}
                    title = ""
                    icon={require('./icons/shopIcon.png')}
                    selectedIcon  = {require('./icons/shopIcon_active.png')}
                    renderAsOriginal
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Topic'
                        });
                    }}>
                    <Topics typeChanged='t'/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'Feed'}
                    title = ""
                    icon={require('./icons/feedIcon.png')}
                    selectedIcon  = {require('./icons/feedIcon_active.png')}
                    renderAsOriginal
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Feed'
                        });
                    }}>
                    <Feed typeChanged='t' />
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('SocialSim', () => SocialSim);
