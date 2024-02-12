import { Dimensions, Image, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Clipper({ width, height }) {
  const dimensions = Dimensions.get("window");
  return (
    <View
      style={{
        ...styles.clip,
        left: dimensions.width / 2 - 150,
        // bottom: dimensions.height / 2 - 150,
        bottom: 50,
      }}
    >
      <Image
        source={require("../assets/sample.jpg")}
        style={{
          ...styles.image,
          width,
          height,
          marginLeft: -30,
          marginTop: -440,
        }}
      />
      <View style={styles.leftTop} />
      <View style={styles.rightTop} />
      <View style={styles.rightBottom} />
      <View style={styles.leftBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    position: "absolute",
    width: 300,
    height: 300,
    zIndex: 2,
    overflow: "hidden",
  },
  image: {},
  leftTop: {
    position: "absolute",
    width: 50,
    height: 50,
    borderLeftColor: "black",
    borderLeftWidth: 3,
    borderStyle: "solid",
    borderTopColor: "black",
    borderTopWidth: 3,
    borderStyle: "solid",
    left: 0,
    top: 0,
  },
  rightTop: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRightColor: "black",
    borderRightWidth: 3,
    borderStyle: "solid",
    borderTopColor: "black",
    borderTopWidth: 3,
    borderStyle: "solid",
    right: 0,
    top: 0,
  },
  rightBottom: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRightColor: "black",
    borderRightWidth: 3,
    borderStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 3,
    borderStyle: "solid",
    right: 0,
    bottom: 0,
  },
  leftBottom: {
    position: "absolute",
    width: 50,
    height: 50,
    borderLeftColor: "black",
    borderLeftWidth: 3,
    borderStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 3,
    borderStyle: "solid",
    left: 0,
    bottom: 0,
  },
});
