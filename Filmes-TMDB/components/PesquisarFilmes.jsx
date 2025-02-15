import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, FlatList, Image, 
  StyleSheet, ActivityIndicator, TouchableOpacity 
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";

const API_URL = "https://api.themoviedb.org/3/search/movie";

const PesquisarFilmes = () => {
  const [query, setQuery] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={buscarFilmes} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.filme}
            onPress={() => navigation.navigate("DetalhesFilme", { movieId: item.id })}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.info}>
              <Text style={styles.titulo}>{item.title}</Text>
              <Text style={styles.data}>Lançamento: {item.release_date || "Data desconhecida"}</Text>
              <Text numberOfLines={3} style={styles.sinopse}>{item.overview || "Sem descrição disponível."}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  loading: { marginVertical: 20 },
  error: { color: "red", textAlign: "center", marginVertical: 10 },
  filme: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  poster: { width: 80, height: 120, borderRadius: 5, marginRight: 10 },
  info: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: "bold" },
  data: { fontSize: 14, color: "gray" },
  sinopse: { fontSize: 14, color: "#333", marginTop: 5 },
});

export default PesquisarFilmes;
