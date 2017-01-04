/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, TabBarIOS, View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');

import Map from './Map';
import Lab from './Lab';
import Topics from './Topics';
import Feed from './Feed';

export default class SocialSim extends Component {
      constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Map'
        };

    }
  render() {
    return (
        <ScrollableTabView>
        <Map tabLabel="Map" />
        <Lab tabLabel="Lab" />
        <Topics tabLabel="Topics" />
        <Feed tabLabel="Feed" />
      </ScrollableTabView>
    );
  }
}

AppRegistry.registerComponent('SocialSim', () => SocialSim);
