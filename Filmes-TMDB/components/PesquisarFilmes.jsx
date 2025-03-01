import React, { useState } from "react";
import { 
  View, Text, TextInput, FlatList, Image, 
  StyleSheet, ActivityIndicator, TouchableOpacity 
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "./themes/ThemeContext";

const API_URL = "https://api.themoviedb.org/3/search/movie";

const PesquisarFilmes = () => {
  const [query, setQuery] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme(); // Obtém o estado do tema

  const buscarFilmes = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}?api_key=${API_KEY}&query=${query}&language=pt-BR`);
      if (response.data.results.length === 0) {
        setError("Nenhum filme encontrado.");
      }
      setFilmes(response.data.results);
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? "#121212" : "#fff" }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input, 
            { backgroundColor: isDarkTheme ? "#333" : "#ddd", color: isDarkTheme ? "#fff" : "#000" }
          ]}
          placeholder="Digite o nome do filme"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={isDarkTheme ? "#999" : "#666"}
        />
        <TouchableOpacity style={styles.searchButton} onPress={buscarFilmes}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {loading && <ActivityIndicator size="large" color="#E50914" style={styles.loading} />}
      {error ? <Text style={[styles.error, { color: isDarkTheme ? "#E50914" : "red" }]}>{error}</Text> : null}

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filme, { borderBottomColor: isDarkTheme ? "#444" : "#ccc" }]}
            onPress={() => navigation.navigate("DetalhesFilme", { movieId: item.id })}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.info}>
              <Text style={[styles.titulo, { color: isDarkTheme ? "#fff" : "#000" }]}>{item.title}</Text>
              <Text style={[styles.data, { color: isDarkTheme ? "gray" : "#555" }]}>Lançamento: {item.release_date || "Data desconhecida"}</Text>
              <Text numberOfLines={3} style={[styles.sinopse, { color: isDarkTheme ? "#ddd" : "#333" }]}>{item.overview || "Sem descrição disponível."}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  input: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 5 },
  searchButton: { marginLeft: 10, backgroundColor: "#E50914", padding: 10, borderRadius: 5 },
  loading: { marginVertical: 20 },
  error: { textAlign: "center", marginVertical: 10 },
  filme: { flexDirection: "row", padding: 10, borderBottomWidth: 1 },
  poster: { width: 80, height: 120, borderRadius: 5, marginRight: 10 },
  info: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: "bold" },
  data: { fontSize: 14 },
  sinopse: { fontSize: 14, marginTop: 5 },
});

export default PesquisarFilmes;
