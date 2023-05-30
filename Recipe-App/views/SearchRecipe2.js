import React, { useState } from "react";
import firebase from "../database/firebase";
import { SliderBox } from "react-native-image-slider-box";

import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from "react-native";

// Test data will later be replaced with firebase values
const text1 =
  "Lightly beat the egg white in the cup. Add the remaining ingredients one at a time and stir. A smooth dough is formed. Add the ingredients for the filling one at a time and mix. Bake in the microwave for 1 min 30 sec at 7000 watts.";

const ingridients = ["1 Egg white", "2tsp Powdered sugar", "1tsp Flour", "1/4tsp Baking powder", "1tsp Ground almons", "5 Raspberries"];
const tools = ["Cup", "Microwave"];

export default class SearchRecipe extends React.Component {
  // returns array as List in Text for
  renderCategories(categories) {
    return categories.map((item, index) => (
      <Text style={styles.ListText} key={index}>
        {"\u2022" + item}
      </Text>
    ));
  }
  renderTools(categories) {
    return categories.map((item, index) => (
      <Text style={styles.ListText2} key={index}>
        {"\u2022" + item}
      </Text>
    ));
  }
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://firebasestorage.googleapis.com/v0/b/recipe-app-3e7ca.appspot.com/o/images%2Fraspberry-mug-cake.jpg?alt=media&token=db7a5719-d32f-4cb1-81ff-5c61625fa942"
        
      ],
    };
  }
  // other component code ...

  render() {
    return (
      <ScrollView id="parentView">
        <View id="title" style={styles.Title}>
          <Text style={styles.TitleText}>Almond biscuits with raspberries</Text>
        </View>
        <View id="pictures" style={styles.Pictures}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={200}
            dotColor="white"
            inactiveDotColor="grey"
          />
        </View>
        <View id="time">
          <Text style={styles.Stats}>Time: 7 Min </Text>
          <Text style={styles.Stats}>difficultie: very easy </Text>
        </View>

        <View id="List">
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ListTextTitle}> Ingridients</Text>
              {this.renderCategories(ingridients)}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.ListText2Title}> Tools</Text>
              {this.renderTools(tools)}
            </View>
          </View>
        </View>
        <View id="calories">
          <Text style={styles.Stats}>Calories: </Text>
        </View>
        <View id="contains" style={styles.Description}>
          <Text>{text1}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Title: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 30,

    paddingBottom: 10,
    alignItems: "center",
  },
  TitleText: {
    fontWeight: "200",
    fontSize: 30,
    marginTop: 10,
  },
  ListText2: {
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  ListText2Title: {
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 5,
  },
  ListText: {
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  ListTextTitle: {
    fontSize: 16,
    justifyContent: "flex-start",
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 5,
  },
  pics: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    paddingBottom: 10,
  },
  Description: {
    marginTop: 1,
    paddingLeft: 20,
    paddingRight: 20,

    paddingTop: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },
  List: {
    flex: 1,
    fontSize: 10,

    flexDirection: "row",
    flexWrap: "wrap",
  },
  Stats: {
    paddingLeft: 0,
    paddingTop: 20,
    color: "grey",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 22,
  },
});
