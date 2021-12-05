import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { CoinList } from "../../config/api";
import { numberWithCommas } from "./Carrousel";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#181818",
    padding: 15,

    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
  },
  imageAndName: {
    flexDirection: "row",
    alignItems: "center",
    width: 150,
    maxWidth: 200,
  },
  name: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  symbol: {},

  nameAndSymbol: {
    flexDirection: "column",
    marginLeft: 10,
  },
  rankAndSymbol: {
    flexDirection: "row",
  },
  rank: {
    alignItems: "center",
    fontSize: 15,
  },
  price: {
    justifyContent: "flex-end",

    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  mCapAndSymbol: {
    justifyContent: "flex-end",
    color: "grey",
    fontSize: 13,
    fontWeight: "bold",
  },
});

const CryptoList = ({ navigation }) => {
  const [coins, setCoins] = useState([]);

  let profit = coins?.price_change_percentage_24h >= 0;
  const currency = "usd";


  useEffect(() => {
    fetchCoins();
  }, [currency]);


  const fetchCoins = () => {
    return fetch(CoinList())
      .then((response) => response.json())
      .then((json) => {
        return setCoins(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.push("Detail", item)}>
        <View style={styles.item}>
          <View style={styles.imageAndName}>
            <Image
              source={{ uri: item.image }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 40,
                backgroundColor: "black",
              }}
            />
            <View style={styles.nameAndSymbol}>
              <View style={styles.rankAndSymbol}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#B0B0B0",
                    alignItems: "center",
                    marginRight: 3,
                    borderRadius: 10,
                  }}
                >
                  <Text style={styles.rank}>{item.market_cap_rank}</Text>
                </View>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={styles.rankAndSymbol}>
                <Text style={styles.mCapAndSymbol}>
                  {item.symbol.toUpperCase()}
                </Text>
                <Text
                  style={{
                    color:
                      item.price_change_percentage_24h > 0
                        ? "rgb(14, 203, 129)"
                        : "red",
                    fontSize: 12,
                    marginHorizontal: 2,
                  }}
                >
                  {numberWithCommas(
                    item.price_change_percentage_24h.toFixed(2)
                  )}
                  %
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              position: "absolute",
              right: 0,
              marginRight: 10,
              width: 100,
            }}
          >
            <Text style={styles.price}>
              $ {numberWithCommas(item.current_price.toFixed(1))}
            </Text>
            <Text style={styles.mCapAndSymbol}>
              $ {numberWithCommas(item.market_cap.toString().slice(0, -6))}M
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <FlatList data={coins} renderItem={renderItem}></FlatList>
    </ScrollView>
  );
};

export default CryptoList;
