import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchRecipe from "./views/SearchRecipe";
import SearchRecipe2 from "./views/SearchRecipe2";
import Main from "./views/Main";

import Header from "./views/header";

{
  // Navigation
}
const Stack = createNativeStackNavigator();

function ChangeView() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{
          header: (props) => <Header {...props} />,
        }}
        component={Main}
      />
      <Stack.Screen
        name="SearchRecipe"
        options={{
          title: "Recipe",
          headerStyle: {
            backgroundColor: "#7094db",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerTitleAlign: "center",
        }}
        component={SearchRecipe}
      />
      <Stack.Screen
        name="SearchRecipe2"
        options={{
          title: "Recipe",
          headerStyle: {
            backgroundColor: "#7094db",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerTitleAlign: "center",
        }}
        component={SearchRecipe2}
      />


    </Stack.Navigator>
  );
  
}

export default function App() {
  return (
    <NavigationContainer>
      <ChangeView />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
