import React, { useCallback, useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ImageFragment from "./ImageFragment";

const PuzzleScreen = ({ navigation, route }) => {
  const length = Dimensions.get("window").width - 25;
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
        temp.push({ x, y, i, j });
      }
      setList(temp);
    }, [level, image])
  );

  useEffect(() => {
    console.log("list", list.map((el) => el.x * level + el.y).join(" "));
  }, [list]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ ...styles.puzzleContainer, width: length, height: length }}
      >
        {list.map((el, idx) => (
          <ImageFragment
            key={idx}
            {...el}
            length={length / level}
            image={image}
          />
        ))}
      </View>
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
    position: "relative",
  },
});
