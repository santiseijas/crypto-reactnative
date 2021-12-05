import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { HistoricalChart } from "../../config/api";
import {
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartYLabel,
} from "@rainbow-me/animated-charts";
import moment from "moment";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { numberWithCommas } from "../components/Carrousel";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16171a",
    },
    title: {
        color: "gold",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
        alignSelf: "center",
        letterSpacing: 0,
    },
    header: {
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        margin: 10,
    },
    chart: {
        height: 250,
        width: width,
        opacity: 0.75,
        marginLeft: 20,
        marginRight: 20,
    },
    boldTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    name: {
        color: "white",
        fontSize: 25,

        marginBottom: 20,
        fontWeight: "900",
        letterSpacing: 0,
    },
    rank: {
        marginTop: 5,
        fontSize: 15,
        alignSelf: "center",
    },
    statistics: {
        marginTop: 30,
        alignItems: "flex-start",
    },
    statisticsTitle: {
        color: "gold",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
        margin: 10,
        letterSpacing: 0,
    },
    statisticsItem: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 20,
        margin: 10,
        letterSpacing: 0,
    },
    statisticsValue: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 20,
        margin: 10,
        letterSpacing: 0,
        alignItems: "flex-end",
        flex: 2,
        textAlign: "right",
    },
    statisticsPrice: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 20,
        margin: 10,
        letterSpacing: 0,
        alignItems: "flex-end",
        flex: 2,
        textAlign: "right",
    },
});

const { width: width, height: height } = Dimensions.get("window");

const Detail = (route, { navigation }) => {
    const data = route.route.params;
    const [trending, setTrending] = useState([]);

    const [isLoad, setLoad] = useState(false);

    let profit = data?.price_change_percentage_24h >= 0;
    let prices = [];


    const fetchHistory = async (data) => {
        return fetch(HistoricalChart(data.id))
            .then((response) => response.json())
            .then((json) => {
                for (let a = 0; a < json.prices.length; a++) {
                    prices.push(json.prices[a][1]);
                }
                return prices;
            })
            .catch((error) => {
                console.error(error);
            });
    };


    useEffect(() => {
        fetchHistory(data).then((prices) => {
            setTrending(prices);
            setLoad(true);
        });
    }, []);


    const addFormatOnData = (data) => {
        const day = moment().subtract(1, "days").unix();
        let format = data.map((item, index) => {
            return {
                x: day + (index + 1) * 3600,
                y: item,
            };
        });
        return format;
    };


    const formatUSD = (value) => {
        "worklet";
        if (value === "") {
            return `$ ${data.current_price.toLocaleString()}`;
        }
        return `$ ${value.toLocaleString()}`;
    };


    const renderChart = () => {
        const points = addFormatOnData(trending);
        return (
            <View>
                <ChartPathProvider
                    data={{
                        points,
                    }}
                >
                    <View style={{ flexDirection: "row", alignContent: "center" }}>
                        <Text style={styles.name}>{data.name.toUpperCase()}</Text>
                    </View>
                    <ChartYLabel style={styles.boldTitle} format={formatUSD} />

                    <View>
                        <ChartPath
                            height={200}
                            stroke={profit ? "rgb(14, 203, 129)" : "red"}
                            width={width / 1.1}
                            strokeWidth={5}
                            selectedStrokeWidth={3}
                        />
                        <ChartDot
                            size={20}
                            style={{
                                backgroundColor: "white",
                            }}
                        />
                    </View>
                </ChartPathProvider>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        route.navigation.pop(1);
                    }}
                >
                    <Icon
                        name="arrow-back"
                        style={styles.title}
                        color={"white"}
                        size={30}
                    />
                </TouchableOpacity>
                <View style={{ alignSelf: "center", flexDirection: "row" }}>
                    <Image
                        source={{ uri: data.image }}
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 40,
                            backgroundColor: "black",
                            marginHorizontal: 10,
                        }}
                    />
                    <Text style={styles.title}>{data.symbol.toUpperCase()}</Text>
                </View>
            </View>
            {isLoad && <View style={styles.chart}>{renderChart()}</View>}
            <View style={styles.statistics}>
                <Text style={styles.statisticsTitle}>STATISTICS</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.statisticsItem}>Rank:</Text>
                    <Text style={styles.statisticsValue}>{data.market_cap_rank}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.statisticsItem}>Market Cap:</Text>
                    <Text style={styles.statisticsValue}>
                        {numberWithCommas(data.market_cap)}$
          </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.statisticsItem}>Price change 24h:</Text>
                    <Text
                        style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontSize: 17,
                            fontWeight: "bold",
                            marginBottom: 20,
                            margin: 10,
                            letterSpacing: 0,
                            alignItems: "flex-end",
                            flex: 2,

                            textAlign: "right",
                        }}
                    >
                        {numberWithCommas(data.price_change_24h.toFixed(2))}$
          </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.statisticsItem}>Price change %:</Text>
                    <Text
                        style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontSize: 17,
                            fontWeight: "bold",
                            marginBottom: 20,
                            margin: 10,
                            letterSpacing: 0,
                            alignItems: "flex-end",
                            flex: 2,

                            textAlign: "right",
                        }}
                    >
                        {data.market_cap_change_percentage_24h.toFixed(2)}%
          </Text>
                </View>
            </View>
        </View>
    );
};

export default Detail;
