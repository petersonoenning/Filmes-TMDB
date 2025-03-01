import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

// Criar o contexto do tema
const ThemeContext = createContext();

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Carregar o tema salvo ao iniciar o app
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme !== null) {
        setIsDarkTheme(savedTheme === "dark");
      }
    };
    loadTheme();
  }, []);

  // Alternar tema e salvar no AsyncStorage
  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme: isDarkTheme ? DarkTheme : DefaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o contexto
export const useTheme = () => useContext(ThemeContext);
