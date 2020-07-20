import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { FlatList, TouchableOpacity } from 'react-native';
import { ss } from '../constants/ss';
import Loader from '../components/Loader'
import { Color } from '../constants/colors';
import { Config } from '../constants/config';



class Home extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "eGift",
            headerTitleStyle: { textAlign: "center", flex: 1 },

        };
    };

    constructor(props) {
        super(props);
        this.state = {
            gift_cards: null,
            isLoading: true
        }
    }

    componentDidMount() {
        const url = Config.apiUrl + '/giftCards';
        const config = {
            method: 'GET'
        }

        fetch(url, config)
            .then((res) => res.json())
            .then((json_res) => {
                console.log("res", json_res.Body)
                this.setState({ gift_cards: json_res.Body, isLoading: false })
            })

    }

    toQrScan = (card) => {

        console.log("id", card._id)
        this.setState({ isLoading: true })
        let url = Config.apiUrl + "/purchaseCard"

        let data = {
            "giftCardId": card._id
        }

        const config = {
            headers: { "Content-Type": "application/json", Accept: 'application/json', },

            method: 'POST',
            body: data

        }

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                giftCardId: card._id
            })
        })
            .then(res => res.json())
            .then(json_res => {
                this.setState({ isLoading: false })
                if (json_res.status == "error") {
                    alert(json_res.message.message)
                } else {

                    this.props.navigation.navigate("QRScan", { "data": json_res })
                }
            })
            .catch((error) => console.log("error", error))

    }

    render() {

        let { gift_cards, isLoading } = this.state

        return (
            <View style={{ flex: 1 }}>
                {
                    gift_cards &&
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
                            <Text style={[ss.greyText]}>Today exchange rate</Text>
                            <Text style={{ color: Color.red, fontSize: 20 }}> 1USD = 1,470 MMK</Text>
                        </View>
                        <FlatList
                            // style={{ marginBottom: 50 }}
                            keyExtractor={(item, index) => index.toString()}
                            data={gift_cards}
                            renderItem={({ item, index }) =>
                                <View style={[ss.card, { marginBottom: 20, borderRadius: 10, marginHorizontal: 15, overflow: "hidden" }]} >
                                    <View style={{ height: 150 }} >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ width: "100%", height: "100%" }}
                                            resizeMode="cover"
                                        />

                                    </View>
                                    <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center" }}>
                                        <View>
                                            <Text style={[ss.greyText, { fontSize: 18 }]}>{item.name}</Text>
                                            <Text style={[ss.greyText]}>{item.price}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.toQrScan(item)} style={{ width: 70, height: 30, backgroundColor: "#FD1D1D", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>Buy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                }

                {isLoading && <Loader />}

            </View>
        );
    }
}

const styles = StyleSheet.create({

})
export default Home;