import { useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";

const ImageFragment = ({
  length,
  image,
  posX,
  posY,
  imageX,
  imageY,
  dx,
  dy,
  handleMovePuzzle,
  setList,
  setCurrent,
  isMoving,
}) => {
  const totalLength = Dimensions.get("window").width - 25;
  const animationValue = useRef(
    new Animated.ValueXY({ x: posX * length, y: posY * length })
  ).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: { x: (posX + dx) * length, y: (posY + dy) * length },
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      if (dx !== 0 || dy !== 0) {
        setList((prev) => {
          const temp = [...prev];
          const idx = temp.findIndex(
            (el) => el.posX === posX && el.posY === posY
          );
          temp[idx].posX = posX + dx;
          temp[idx].posY = posY + dy;
          temp[idx].dx = 0;
          temp[idx].dy = 0;

          return temp;
        });
        setCurrent((prev) => ({ x: prev.x - dx, y: prev.y - dy }));
        isMoving.current = false;
      }
    });
  }, [dx, dy]);

  //const animatedStyle = {
  //  left: animationValue.interpolate({
  //    inputRange: [0, 1],
  //    outputRange: [j * length, (j + dy) * length],
  //  }),
  //  top: animationValue.interpolate({
  //    inputRange: [0, 1],
  //    outputRange: [i * length, (i + dx) * length],
  //  }),
  //};

  return (
    <Animated.View
      style={{
        width: length,
        height: length,
        position: "absolute",
        backgroundColor: "red",
        left: animationValue.y,
        top: animationValue.x,
      }}
    >
      <Pressable
        onPress={() => handleMovePuzzle(posX, posY)}
        style={{
          ...styles.container,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: totalLength,
            height: totalLength,
            position: "absolute",
            left: imageY * length * -1,
            top: imageX * length * -1,
          }}
          resizeMode="cover"
        />
      </Pressable>
    </Animated.View>
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
