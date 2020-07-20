import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ss } from '../constants/ss';
import { Color } from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from "react-qr-code";
import { Config } from '../constants/config';

const width = Dimensions.get("window").width


class QRScan extends Component {

    static navigationOptions = {
        headerShown: false,


    };


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            card: this.props.navigation.state.params.data
        }
    }

    onPay = () => {
        let { card } = this.state
        this.setState({ isLoading: true })
        const url = Config.apiUrl + "/confirmPurchase"

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                txnId: card.txnId
            })
        })
            .then(res => res.json())
            .then(json_res => {
                
                this.setState({ isLoading: false })
                if (json_res.status == "Fail") {
                    alert("Something went wrong")
                } else {

                    this.props.navigation.navigate("PaymentSuccess", { data: json_res.pinCode })


                }
            })
            .catch((error) => console.log("error", error))

    }

    toGoBack = () => {
        this.props.navigation.goBack()
    }


    render() {
        let { card, isLoading } = this.state
        let back = "<"
        return (
            <View style={{ flex: 1 }}>

                <TouchableOpacity onPress={this.toGoBack} style={{ marginTop: 10, marginLeft: 20 }}>
                    <Text style={{ fontSize: 30, color: "#8E44AD" }}>{back}</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <Text style={[ss.greyText, { fontSize: 25 }]}>{card.name}</Text>
                </View>

                <View style={[ss.all_center, { marginTop: 30, marginBottom: 30 }]}>
                    <View style={{ borderWidth: 2, padding: 10, borderRadius: 10, backgroundColor: "#FEF9E7" }}>
                        <QRCode size={80} value={card.qrString} />
                    </View>
                </View>

                <View>
                    <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                        <Text style={[ss.greyText, { fontSize: 25, fontWeight: "600" }]}>{card.shopName}</Text>
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.txtStyle}>Transaction Id : </Text>
                            <Text style={styles.txtStyle}>{card.txnId}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={styles.txtStyle}>Card price :</Text>
                            <Text style={styles.txtStyle}>{card.cardPrice}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={[styles.txtStyle]}>Fee:</Text>
                            <Text style={styles.txtStyle}>{card.fee} MMK</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={styles.txtStyle}>Total:</Text>
                            <Text style={styles.txtStyle}>{card.total} MMK</Text>
                        </View>
                    </View>
                </View>

                <View style={{ position: "absolute", bottom: 0 }}>
                    <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, letterSpacing: 0.5, color: Color.grey }}>After pay with Aya-Pay, Please click the payment button</Text>
                    </View>
                    <TouchableOpacity disabled={isLoading} onPress={this.onPay} style={[ss.all_center, { backgroundColor: Color.red, height: 40, marginHorizontal: width / 4, marginBottom: 10, borderRadius: 10 }]}>
                        {
                            isLoading ?
                                <ActivityIndicator color={Color.white} />

                                :
                                <Text style={{ color: Color.white, fontSize: 16 }}>Payment</Text>
                        }
                    </TouchableOpacity>

                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    txtStyle: {
        flex: 1,
        color: Color.grey
    }

})

export default QRScan;