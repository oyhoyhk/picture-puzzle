import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import GlobalStyles from "./GlobalStyles";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const options = [
  {
    N: 3,
    value: "3 × 3",
  },
  {
    N: 4,
    value: "4 × 4",
  },
  {
    N: 5,
    value: "5 × 5",
  },
  {
    N: 8,
    value: "8 × 8",
  },
];

const MainScreen = ({ navigation }) => {
  const length = Dimensions.get("window").width - 25;
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState(null);

  const onSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePress = () => {
    if (!image) {
      Alert.alert("Select an Image!", "Please select an image to proceed", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      return;
    }
    if (!level) {
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
    navigation.navigate("Puzzle", { image, level });
  };
  return (
    <SafeAreaView style={styles.container}>
      {image ? (
        <Image
          style={{ width: length, height: length }}
          source={{ uri: image }}
        />
      ) : (
        <Pressable
          style={{ ...styles.emptyImage, width: length, height: length }}
          onPress={onSelectImage}
        >
          <Text>
            <AntDesign name="picture" size={50} color="darkgray" />
          </Text>
        </Pressable>
      )}
      <View style={{ ...styles.levelContainer, width: length }}>
        {options.map(({ N, value }) => (
          <Pressable
            key={N}
            style={{
              ...styles.level,
              ...(level === N ? styles.levelActive : {}),
            }}
            onPress={() => setLevel(N)}
          >
            <Text style={{ color: level === N ? "white" : "lightgray" }}>
              {value}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        onPress={onSelectImage}
        style={{
          ...styles.button,
          width: length,
          backgroundColor: "#8091ff",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
          Select a Picture
        </Text>
      </Pressable>
      <Pressable
        onPress={handlePress}
        style={{
          ...styles.button,
          width: length,
          backgroundColor: image ? "#8091ff" : "darkgray",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
          Go to Puzzle
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.androidSafeArea,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  emptyImage: {
    display: "flex",
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
  },
  button: {
    marginTop: 15,
    height: 50,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10,
  },
  levelContainer: {
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  level: {
    width: "20%",
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  levelActive: {
    borderWidth: 0,
    backgroundColor: "#4287f5",
  },
});

export default MainScreen;
