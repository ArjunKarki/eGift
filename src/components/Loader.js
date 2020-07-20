import React from 'react'

import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Color } from '../constants/colors';


const { width, height } = Dimensions.get('window');

class Loader extends React.PureComponent {
    render() {
        return (
            <View style={styles.page}>
                <View style={styles.view}>
                    <ActivityIndicator color={Color.red} size="large"  />
                </View>

            </View>
        )
    }
}



export default Loader

const styles = StyleSheet.create({
    page: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: height,
        backgroundColor: '#00000022',
        zIndex: 2000,
    },
    view: {
        backgroundColor: 'white',
        width: 100,
        height: 100,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        position: 'absolute',
        top: (height / 2) - 150,
        left: (width / 2) - 50,
        zIndex: 1000,

    }
})
