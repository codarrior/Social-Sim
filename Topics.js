import React, { Component, PropTypes } from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';

import ThreadList from './ThreadList';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class Topics extends Component {
    render() {
        return (
            < NavigatorIOS
                style = { styles.container }
                initialRoute = {
                {
                    title: 'Topics',
                    component: ThreadList,
                    passProps: {listType: 'topic'}
                }
            }
            />
        );
    }
}
