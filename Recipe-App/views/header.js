import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../images/Logo.png";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={require("../images/Logo.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    alignItems: "center",
    backgroundColor: "#7094db",
  },
  image: {
    flex: 1,
    width: 100,
    resizeMode: "contain",
  },
});
