import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
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
    margin:3
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
  const [search, setSearch] = useState("");
  const [coinsFiler, setCoinsFilter] = useState([]);

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

  const handleSearch = () => {
    const filter = coins.filter(
      (coin) => coin.name.includes(search) || coin.symbol.includes(search)
    );
    setCoinsFilter(filter);     
    return filter;
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
                    width: 24,
                    height: 24,
                    backgroundColor: "#B0B0B0",
                    alignItems: "center",
                    marginRight: 3,
                    borderRadius: 20,
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
      <View>
        <SearchBar
          round
          value={search}
          placeholder="Search your favorite Crypto"
          placeholderTextColor={"white"}
          containerStyle={{
            backgroundColor: "#404040",
            borderRadius: 10,
            marginTop: 5,
            height: 50,
          }}
          inputStyle={{ color: "white" }}
          underlineColorAndroid={"transparent"}
          cancelButtonProps={{ disabled: "true" }}
          cancelButtonTitle={""}
          clearIcon={false}
          onChangeText={(e) => {
            if (e.length >= 1) {
              setSearch(e);
              handleSearch();
            } else {
              setSearch("");
              setCoinsFilter(coins);
            }
          }}
        />
      </View>
      <FlatList
        data={coinsFiler && coinsFiler.length > 0 ? coinsFiler : coins}
        renderItem={renderItem}
      ></FlatList>
    </ScrollView>
  );
};

export default CryptoList;
