import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    ImageBackground,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { CoinList, TrendingCoins } from "../../config/api";

const styles = StyleSheet.create({
    carousel: {
        height: 200,
        width: width,
        display: "flex",
        alignItems: "center",
        marginTop: 50,
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textTransform: "uppercase",
        color: "white",
        width: width,
        marginTop: 20,
    },
    title: {
        backgroundColor: "transparent",
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: 20,
        fontWeight: "bold",
    },
    price: {
        backgroundColor: "transparent",
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: 15,
        fontWeight: "bold",
        alignItems: "center",
    },

    header: {
        color: "gold",
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "SinhalaSangamMN",
        marginBottom: 20,
    },
});

const { width: width, height: height } = Dimensions.get("window");

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carrousel = () => {
    const [trending, setTrending] = useState([]);
    const currency = "usd";

    const fetchTrendingCoins = () => {
        return fetch(CoinList())
            .then((response) => response.json())
            .then((json) => {
                return setTrending(json);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);


    const renderItem = ({ item, index }) => {
        let profit = item?.price_change_percentage_24h >= 0;
        return (
            <View style={styles.carouselItem}>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: 50, width: 50 }}
                ></Image>
                <View>
                    <View style={{ alignItems: "center" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            <Text style={styles.title}>{item.symbol.toUpperCase()}</Text>
                            <Text
                                style={{
                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                    fontSize: 14,
                                    paddingHorizontal: 10,
                                    alignItems: "center",
                                }}
                            >
                                {profit > 0 ? "+" : null}
                                {item.market_cap_change_percentage_24h.toFixed(2)}%
              </Text>
                        </View>
                        <Text style={styles.price}>
                            ${numberWithCommas(item.current_price.toFixed(2))}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const image = {
        uri:
            "/Users/santiseijas/ownProjects/crypto-reactnative/crypto-reactnative/assets/banner.jpeg",
    };

    return (
        <View style={styles.carousel}>
            <Text style={styles.header}>Crypto Market Cap</Text>
            <ImageBackground
                source={image}
                style={{ width: width, flex: 1, height: 150, resizeMode: "cover" }}
            >
                <Carousel
                    data={trending}
                    renderItem={renderItem}
                    windowSize={3}
                    sliderWidth={width}
                    itemWidth={width}
                    autoplay={true}
                    autoplayDelay={1500}
                    autoplayInterval={3000}
                    loop={true}
                />
            </ImageBackground>
        </View>
    );
};

export default Carrousel;
