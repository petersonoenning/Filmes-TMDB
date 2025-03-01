import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./themes/ThemeContext";

const API_URL = "https://api.themoviedb.org/3/genre/movie/list";

// Definição de ícones para cada categoria
const IconesCategorias = {
  Ação: "flame",
  Comédia: "happy-outline",
  Drama: "sad-outline",
  Terror: "skull-outline",
  Romance: "heart-outline",
  "Ficção Científica": "planet-outline",
  Fantasia: "sparkles-outline",
  Animação: "color-palette-outline",
  Documentário: "document-text-outline",
  Suspense: "search-outline",
};

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const response = await axios.get(`${API_URL}?api_key=${API_KEY}&language=pt-BR`);
        setCategorias(response.data.genres);
      } catch (error) {
        console.error("Erro ao buscar categorias.", error);
      }
    };
    buscarCategorias();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? "#121212" : "#F5F5F5" }]}>
      
      
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalhesCategoria", { genreId: item.id, genreName: item.name })}
          >
            <Ionicons 
              name={IconesCategorias[item.name] || "film-outline"} 
              size={28} 
              color="white" 
            />
            <Text style={styles.texto}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 8,
    borderRadius: 10,
    height: 100,
    backgroundColor: "#FF1493", // Todas as caixas agora são rosa
  },
  texto: { fontSize: 16, color: "#fff", marginTop: 5 },
});

export default Categorias;
