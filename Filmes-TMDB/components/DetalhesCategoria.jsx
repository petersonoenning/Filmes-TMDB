import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./themes/ThemeContext";

const API_URL = "https://api.themoviedb.org/3/discover/movie";

const DetalhesCategoria = () => {
  const route = useRoute();
  const { genreId, genreName } = route.params;
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const response = await axios.get(`${API_URL}?api_key=${API_KEY}&with_genres=${genreId}&language=pt-BR`);
        setFilmes(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes da categoria.", error);
      } finally {
        setLoading(false);
      }
    };
    buscarFilmes();
  }, [genreId]);

  if (loading) return <ActivityIndicator size="large" color="#E50914" style={styles.loading} />;

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? "#121212" : "#F5F5F5" }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={isDarkTheme ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.titulo, { color: isDarkTheme ? "#fff" : "#000" }]}>{genreName}</Text>
      </View>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalhesFilme", { movieId: item.id })}
          >
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.poster} />
            <Text style={[styles.tituloFilme, { color: isDarkTheme ? "#fff" : "#000" }]} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.avaliacaoContainer}>
              <Text style={styles.avaliacao}>{item.vote_average.toFixed(1)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingBottom: 60 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: { padding: 5 },
  titulo: { fontSize: 22, fontWeight: "bold", marginLeft: 10 },
  loading: { marginTop: 20 },
  listContainer: { paddingBottom: 80 },
  card: { flex: 1, margin: 5, alignItems: "center" },
  poster: { width: 110, height: 160, borderRadius: 8 },
  tituloFilme: { fontSize: 14, marginTop: 5, textAlign: "center" },
  avaliacaoContainer: {
    position: "absolute",
    top: 5,
    right: 10,
    backgroundColor: "#E50914",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  avaliacao: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});

export default DetalhesCategoria;
