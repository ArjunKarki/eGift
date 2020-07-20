import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from './screens/Home';

import QRScanScreen from './screens/QRScan';

import PaymentSuccessScreen from './screens/PaymentSuccess';

const TopLevelNavigator = createStackNavigator({
    home: HomeScreen,
    QRScan: QRScanScreen,
    PaymentSuccess: PaymentSuccessScreen
})

const TopLevelContainer = createAppContainer(TopLevelNavigator)

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <TopLevelContainer />
        );
    }
}

export default Router;