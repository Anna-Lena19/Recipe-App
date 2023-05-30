import React, { useState, useEffect } from "react";
import {
  scrollView,
  View,
  Text,
  ScrollView,
  FlatList,
  Alert,
  Image,
  LogBox,
  TouchableOpacity,
} from "react-native";

import { Button, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MultiSelect from "react-native-multiple-select";
import FlatButton from "../shared/button";

import { db } from "../database/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Main = (props) => {
  
  //removes Timer Warning
  LogBox.ignoreLogs(["Setting a timer"]);

  
  const Food = ["Tomato", "Cheese", "Apple", "Salat"];
  const Tools = ["Microwave", "Mixer"];
  

  // Data for the MutiSelect
  const items = [
    // name key is must. It is to show the text in front
    { id: 1, name: "Lentils" },
    { id: 2, name: "Vegetable brod" },
    { id: 3, name: "Yogurt" },
    { id: 4, name: "Butter" },
    { id: 5, name: "Quark" },
    { id: 6, name: "Eggs" },
    { id: 7, name: "Milk" },
    { id: 8, name: "rice flakes" },
    { id: 9, name: "Cocoa Powder" },
    { id: 10, name: "Food starch" },
    { id: 11, name: "Vanilla sugar" },
    { id: 12, name: "Cream" },
    { id: 13, name: "Spaghetti" },
    { id: 14, name: "Cream cheese" },
    { id: 15, name: "Bananas" },
    { id: 16, name: "Flour" },
    { id: 17, name: "Baking powder" },
    { id: 18, name: "Oil" },
    { id: 19, name: "Honey" },
    { id: 20, name: "Gingerbread spice" },
    { id: 21, name: "Eggwhite" },
    { id: 22, name: "Powder sugar" },
    { id: 23, name: "Ground almons" },
    { id: 24, name: "Raspberries" },
  ];
  const items2 = [
    // name key is must. It is to show the text in front
    { id: 25, name: "Pot" },
    { id: 26, name: "Mixer" },
    { id: 27, name: "Waffle maker" },
    { id: 28, name: "Whisk" },
    { id: 29, name: "Pan" },
    { id: 30, name: "Spatula" },
    { id: 31, name: "Cup" },
    { id: 32, name: "Microwave" },
  ];

  
  
  // Data Source for the SearchableDropdown
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };

  /*/
  useEffect(() => {
    fetch("https://aboutreact.herokuapp.com/demosearchables.php")
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
*/


  //Database
  //Gets the recipes from the database when the page reloads and saves them in recipes

  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "Rezepte");

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getRecipes();
  }, []);

  //ExactSearch find all Recipes that contain only the ingreedients and tools inserted
  //ingredients is a Array of strings
  //tools is a Array of strings
  //return a Array of Objects with the found recipes
  //can be accesed by var.Ingredient[x].name or var.Title
  //if no recipe is found a empty Array is returned

  function exactSearch(ingredients, tools) {
    let countIngredients = 0;
    let countTools = 0;
    let foundRecipes = [];
    let foundEndRecipes = [];

    for (let x = 1; x <= recipes.length; x++) {
      let c = x - 1;

      for (let y = 1; y <= ingredients.length; y++) {
        let d = y - 1;

        for (let z = 1; z <= recipes[c].Ingredient.length; z++) {
          let a = z - 1;

          if (ingredients[d] == recipes[c].Ingredient[a].name) {
            countIngredients = countIngredients + 1;
          }
        }
      }

      if (
        countIngredients == recipes[c].Ingredient.length &&
        countIngredients == ingredients.length
      ) {
        foundRecipes.push(recipes[c]);
        countIngredients = 0;
      }
      countIngredients = 0;
    }

    for (let x = 1; x <= foundRecipes.length; x++) {
      let k = x - 1;

      for (let y = 1; y <= tools.length; y++) {
        let d = y - 1;

        for (let z = 1; z <= foundRecipes[k].Tools.length; z++) {
          let a = z - 1;

          if (tools[d] == foundRecipes[k].Tools[a]) {
            countTools = countTools + 1;
          }
        }
      }

      if (
        countTools == foundRecipes[k].Tools.length &&
        countTools == tools.length
      ) {
        foundEndRecipes.push(foundRecipes[k].Title);
        countTools = 0;
      }
      countTools = 0;
    }
    return foundEndRecipes;
  }

  //overviewSearch find all Recipes that contain the ingreedients and tools inserted, but not exclusively
  //ingredients is a Array of strings
  //tools is a Array of strings
  //return a Array of Objects with the found recipes
  //can be accesed by var.Ingredient[x].name or var.Title
  //if no recipe is found a empty Array is returned

  function overviewSearch(ingredients, tools) {
    let countIngredients = 0;
    let foundRecipes = [];
    let countTools = 0;
    let foundEndRecipes = [];

    for (let x = 1; x <= recipes.length; x++) {
      let c = x - 1;

      for (let y = 1; y <= ingredients.length; y++) {
        let d = y - 1;

        for (let z = 1; z <= recipes[c].Ingredient.length; z++) {
          let a = z - 1;

          if (ingredients[d] == recipes[c].Ingredient[a].name) {
            countIngredients = countIngredients + 1;
          }
        }
      }
      if (countIngredients == ingredients.length) {
        foundRecipes.push(recipes[c]);
        countIngredients = 0;
      }
      countIngredients = 0;
    }

    for (let x = 1; x <= foundRecipes.length; x++) {
      let k = x - 1;

      for (let y = 1; y <= tools.length; y++) {
        let d = y - 1;

        for (let z = 1; z <= foundRecipes[k].Tools.length; z++) {
          let a = z - 1;

          if (tools[d] == foundRecipes[k].Tools[a]) {
            countTools = countTools + 1;
          }
        }
      }

      if (countTools == tools.length) {
        foundEndRecipes.push(foundRecipes[k].Title);
        countTools = 0;
      }
      countTools = 0;
    }
    return foundEndRecipes;
  }

  return (
    <View style={styles.container}>
      <View style={styles.TextContainer}>
        <Text>Select your Ingridients</Text>
      </View>

      <MultiSelect
        hideTags
        items={items}
        uniqueKey="name"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Pick Ingridients"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#7094db"
        submitButtonText="Submit"
      />

      <View style={styles.TextContainer}>
        <Text>Select your Tools</Text>
      </View>

      <MultiSelect
        hideTags
        items={items2}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Pick Tools"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#7094db"
        submitButtonText="Submit"
      />

      <View style={styles.ButtonContainer}>
        <FlatButton text="exact Search" onPress={() => props.navigation.navigate("SearchRecipe")}></FlatButton>
      </View>
      <View style={styles.ButtonContainer}>
        <FlatButton text="overview Search" onPress={() => props.navigation.navigate("SearchRecipe2")}></FlatButton>
      </View>
      <Text>{selectedItems}</Text>
    </View>
  );
};

export default Main;
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flex: 1,
  },
  ButtonContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },
  SelectText: {
    alignSelf: "center",
    alignItems: "center",
  },
  TextContainer: {
    paddingBottom: 10,
  },
});
