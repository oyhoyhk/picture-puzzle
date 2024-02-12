import { Image, StyleSheet, View } from "react-native";

const ImageFragment = ({ length, image, i, j, x, y }) => {
  return (
    <View
      style={{
        ...styles.container,
        width: length,
        height: length,
        left: j * length,
        top: i * length,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 300,
          height: 300,
          position: "absolute",
          left: y * length * -1,
          top: x * length * -1,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default ImageFragment;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderStyle: "solid",
    position: "absolute",
  },
});
