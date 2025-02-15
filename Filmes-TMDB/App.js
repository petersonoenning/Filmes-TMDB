import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PesquisarFilmes from "./components/PesquisarFilmes";
import DetalhesFilme from "./components/DetalhesFilme";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PesquisarFilmes" component={PesquisarFilmes} options={{ title: "Buscar Filmes" }} />
        <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} options={{ title: "Detalhes do Filme" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
