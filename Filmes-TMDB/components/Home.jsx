import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "./themes/ThemeContext";

const API_URL = "https://api.themoviedb.org/3/movie/popular";

const Home = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme(); // Obtém o estado do tema

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const response = await axios.get(`${API_URL}?api_key=${API_KEY}&language=pt-BR`);
        setFilmes(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes populares.", error);
      } finally {
        setLoading(false);
      }
    };
    buscarFilmes();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#E50914" style={styles.loading} />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkTheme ? "#121212" : "#fff" }]}>
      <Text style={[styles.header, { color: isDarkTheme ? "#FFF" : "#000" }]}>Próximos Lançamentos</Text>
      <FlatList
        horizontal
        data={filmes.slice(0, 5)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("DetalhesFilme", { movieId: item.id })}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.poster} />
            <Text style={[styles.titulo, { color: isDarkTheme ? "#FFF" : "#000" }]}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={[styles.header, { color: isDarkTheme ? "#FFF" : "#000" }]}>Mais Bem Avaliados</Text>
      <FlatList
        horizontal
        data={filmes.sort((a, b) => b.vote_average - a.vote_average).slice(0, 5)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("DetalhesFilme", { movieId: item.id })}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.poster} />
            <Text style={[styles.titulo, { color: isDarkTheme ? "#FFF" : "#000" }]}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loading: { marginTop: 20 },
  poster: { width: 120, height: 180, margin: 10, borderRadius: 10 },
  titulo: { textAlign: "center", fontSize: 14, fontWeight: "bold" },
  header: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
});

export default Home;
