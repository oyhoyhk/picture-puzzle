import React from "react";
import { StyleSheet } from "react-native";
import GlobalStyles from "./components/GlobalStyles";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./components/MainScreen";
import PuzzleScreen from "./components/PuzzleScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#8091ff",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "darkgray",
          tabBarIcon: ({ focused }) => {
            if (route.name === "Home") {
              return (
                <AntDesign
                  name="picture"
                  size={24}
                  color={focused ? "white" : "darkgray"}
                />
              );
            } else if (route.name === "Puzzle") {
              return (
                <Ionicons
                  name="extension-puzzle-outline"
                  size={24}
                  color={focused ? "white" : "darkgray"}
                />
              );
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Puzzle" component={PuzzleScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.androidSafeArea,
    marginTop: 41,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 300,
    width: 300,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#4287f5",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
