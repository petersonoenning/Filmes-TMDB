import React, { useEffect, useState } from "react";
import { 
  View, Text, Image, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, SafeAreaView 
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./themes/ThemeContext";

const API_URL = "https://api.themoviedb.org/3/movie";

const DetalhesFilme = ({ route }) => {
  const { movieId } = route.params;
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}?api_key=${API_KEY}&language=pt-BR`);
        setFilme(response.data);
      } catch (err) {
        setError("Erro ao carregar detalhes do filme.");
      } finally {
        setLoading(false);
      }
    };

    buscarDetalhes();
  }, [movieId]);

  if (loading) return <ActivityIndicator size="large" color="#E50914" style={styles.loading} />;
  if (error) return <Text style={[styles.error, { color: isDarkTheme ? "#E50914" : "red" }]}>{error}</Text>;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? "#121212" : "#fff" }]}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={isDarkTheme ? "white" : "black"} />
      </TouchableOpacity>

      {/* Conteúdo */}
      <FlatList
        data={[filme]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={[styles.titulo, { color: isDarkTheme ? "#fff" : "#000" }]}>{item.title}</Text>
            <Text style={[styles.data, { color: isDarkTheme ? "lightgray" : "#555" }]}>
              📅 Lançamento: {item.release_date}
            </Text>
            <Text style={[styles.avaliacao, { color: isDarkTheme ? "#FFD700" : "#DAA520" }]}>
              ⭐ Avaliação: {item.vote_average} / 10
            </Text>
            <Text style={[styles.sinopse, { color: isDarkTheme ? "#fff" : "#333" }]}>
              {item.overview && item.overview.trim() !== "" 
                ? item.overview 
                : "Sem descrição disponível."}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { position: "absolute", top: 10, left: 10, zIndex: 10 },
  content: { padding: 20, alignItems: "center" },
  loading: { marginTop: 20 },
  error: { textAlign: "center", marginVertical: 20 },
  poster: { width: "70%", height: 300, borderRadius: 10, marginBottom: 20, resizeMode: "contain" },
  titulo: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  data: { fontSize: 14, textAlign: "center", marginVertical: 5 },
  avaliacao: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  sinopse: { fontSize: 16, textAlign: "justify", marginBottom: 20, lineHeight: 22 },
});

export default DetalhesFilme;
