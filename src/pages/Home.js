import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carrousel from "../components/Carrousel";
import CryptoList from "../components/CryptoList";
import Search from "../components/Search";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16171a",
  },
});
const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Carrousel />
      <Search />
      <CryptoList navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
