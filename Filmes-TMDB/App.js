import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./components/themes/ThemeContext";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import Home from "./components/Home";
import PesquisarFilmes from "./components/PesquisarFilmes";
import Categorias from "./components/Categorias";
import DetalhesFilme from "./components/DetalhesFilme";
import DetalhesCategoria from "./components/DetalhesCategoria";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Botão para alternar o tema no cabeçalho
const ThemeToggleButton = () => {
  const { toggleTheme, isDarkTheme } = useTheme();
  
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ paddingRight: 15 }}>
      <Ionicons name={isDarkTheme ? "sunny" : "moon"} size={24} color={isDarkTheme ? "yellow" : "black"} />
    </TouchableOpacity>
  );
};

// Navegação das Abas
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Início") iconName = "home";
          else if (route.name === "Buscar") iconName = "search";
          else if (route.name === "Categorias") iconName = "list";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        headerRight: () => <ThemeToggleButton />, // Adiciona o botão de alternar tema no cabeçalho
        headerShown: true,
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Buscar" component={PesquisarFilmes} />
      <Tab.Screen name="Categorias" component={Categorias} />
    </Tab.Navigator>
  );
}

// Stack Principal que contém TUDO
function AppNavigator() {
  const { theme } = useTheme();
  
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} />
        <Stack.Screen name="DetalhesCategoria" component={DetalhesCategoria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
