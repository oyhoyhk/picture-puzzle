import React, { useCallback, useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ImageFragment from "./ImageFragment";

const PuzzleScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState(null);
  const [list, setList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      console.log("useEffect", route, image);
      if ((!route.params || (route.params && !route.params.image)) && !image) {
        Alert.alert(
          "Select an Image!",
          "Please select an image to proceed",
          [
            {
              text: "Go Back",
              onPress: () => navigation.navigate("Home"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
        return;
      }
      if ((!route.params || (route.params && !route.params.level)) && !level) {
        Alert.alert(
          "Select Puzzle Level!",
          "Please select your puzzle level to proceed",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
        return;
      }
      setImage(route.params.image);
      setLevel(route.params.level);
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (!level || !image) return;
      const length = 300 / level;
      const temp = [];
      const map = new Set();
      let count = 0;
      while (map.size < level * level - 1) {
        const num = Math.floor(Math.random() * (level * level - 1));
        if (map.has(num)) continue;
        map.add(num);
        console.log(num);
        const x = Math.floor(num / level),
          y = num % level;
        const i = Math.floor(count / level),
          j = count % level;
        count += 1;
        temp.push(
          <ImageFragment
            length={length}
            image={image}
            i={i}
            j={j}
            x={x}
            y={y}
          />
        );
      }
      setList(temp);
    }, [level, image])
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.puzzleContainer}>
        {list.map((el, idx) => ({ ...el, key: idx }))}
      </View>
      {/* <Image source={{ uri: image }} style={styles.img} /> */}
    </SafeAreaView>
  );
};

export default PuzzleScreen;

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.androidSafeArea,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderStyle: "solid",
    borderWidth: 1,
    bordercolor: "black",
  },
  puzzleContainer: {
    width: 300,
    height: 300,
    position: "relative",
  },
  img: {
    width: 300,
    height: 300,
  },
});
