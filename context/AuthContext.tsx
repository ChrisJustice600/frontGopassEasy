import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Assurez-vous d'importer axios
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (e) {
      console.error("Erreur lors du chargement de l'utilisateur", e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  // Méthode pour mettre à jour les informations utilisateur
  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    try {
      // Appel API pour mettre à jour l'utilisateur côté serveur
      const response = await axios.put(
        "https://gopasseasy.onrender.com/auth/update",
        userData
      );

      // Mise à jour du contexte avec les nouvelles infos reçues du serveur
      const updatedUser = { ...user, ...response.data.user };
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
