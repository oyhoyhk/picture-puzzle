import { Image, StyleSheet, Pressable, Dimensions } from "react-native";

const ImageFragment = ({ length, image, i, j, x, y }) => {
  const totalLength = Dimensions.get("window").width - 25;
  return (
    <Pressable
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
          width: totalLength,
          height: totalLength,
          position: "absolute",
          left: y * length * -1,
          top: x * length * -1,
        }}
        resizeMode="cover"
      />
    </Pressable>
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
