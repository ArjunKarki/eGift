import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Share, Clipboard } from 'react-native';

import { ss } from '../constants/ss';
import { Color } from '../constants/colors';

const HEIGHT = Dimensions.get("window").height
const WIDTH = Dimensions.get("window").width



class PaymentSuccess extends Component {

    static navigationOptions = {
        headerShown: false

    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            pin_code: props.navigation.state.params.data
        }
    }

    toGoBack = () => {
        this.props.navigation.goBack()
    }

    onShare = async () => {


        let { pin_code } = this.state
        if (pin_code) {

            try {
                // Share.share({
                //     message: pin_code,
                // })
                const result = await Share.share({
                    message:
                        'React Native | A framework for building native apps using React',
                });
            } catch (error) {
                alert("fail to share.")
                console.log("eror", error)
            }
        }


    }

    saveToClickBoard = () => {
        let { pin_code } = this.state
        alert("Successfully saved.")


    }

    render() {
        let back = "<"

        let { pin_code } = this.state
        console.log("pay", pin_code)

        return (

            <View style={{ flex: 1 }}>

                <TouchableOpacity onPress={this.toGoBack} style={{ marginTop: 10, marginLeft: 20 }}>
                    <Text style={{ fontSize: 30, color: "#8E44AD" }}>{back}</Text>
                </TouchableOpacity>
                <View style={[{ marginTop: HEIGHT * 0.15, paddingHorizontal: 50 }, ss.all_center,]}>
                    <Text style={{ textAlign: "center", color: Color.grey, fontSize: 18 }}>Thanks for buying Google Playstore form eGift Card</Text>
                </View>

                <View style={[ss.all_center, { marginTop: 30 }]}>
                    <Text>Your pin code is here</Text>
                    <View style={[{ height: 50, backgroundColor: "#909497", width: WIDTH * 0.6, borderRadius: 8, marginTop: 20 }, ss.all_center]}>
                        <Text style={{ fontSize: 18, color: Color.white }}>{pin_code}</Text>
                    </View>
                </View>


                <View style={{ position: "absolute", bottom: 0, left: 20, right: 20, }}>


                    <TouchableOpacity onPress={this.saveToClickBoard} style={[ss.all_center, { borderRadius: 10, backgroundColor: Color.red, alignSelf: "center", height: 50, width: 150 }]}>
                        <Text style={{ color: Color.white }}>Save PIN CODE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onShare} style={[{ borderRadius: 10, marginTop: 20, backgroundColor: "#8E44AD", alignSelf: "center", height: 50, width: 150, marginBottom: 20 }, ss.all_center]}>
                        <Text style={{ color: Color.white }}>Share PIN CODE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.popToTop()} style={[ss.all_center, { marginBottom: 10 }]}>
                        <Text style={{ color: "#8E44AD" }}>Back to home</Text>
                    </TouchableOpacity>

                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({

})

export default PaymentSuccess;