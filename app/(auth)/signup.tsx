import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

// Déclaration des types
type PasswordStrength = { level: string; color: string };
type Errors = { username?: string; email?: string; password?: string };

// Fonction de vérification de la force du mot de passe
const getPasswordStrength = (password: string): PasswordStrength => {
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  if (strength <= 2) return { level: "Faible", color: "red" };
  if (strength === 3) return { level: "Moyen", color: "orange" };
  return { level: "Fort", color: "green" };
};

export default function SignupScreen() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const { login } = useAuth();
  const router = useRouter();

  // Évaluer la force du mot de passe en temps réel
  const passwordStrength = getPasswordStrength(password);

  const handleSignup = async () => {
    let newErrors: Errors = {};
    if (!username) newErrors.username = "Nom d'utilisateur requis";
    if (!email) newErrors.email = "Email requis";
    if (!password) newErrors.password = "Mot de passe requis";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://gopasseasy.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();
      console.log("Réponse du serveur:", data);

      if (response.ok) {
        // const user = {
        //   id: data.id,
        //   username: data.username,
        //   email: data.email,
        // };
        // await login(user);
        router.replace("/(auth)/login");
      } else {
        console.error(
          "Échec de l'inscription:",
          data.message || "Erreur inconnue"
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="justify-center flex-1 p-8 bg-white"
    >
      <Text className="mb-8 text-3xl font-bold text-center text-blue-500">
        Inscription
      </Text>

      <View className="flex-row items-center px-4 py-3 mb-2 bg-gray-100 rounded-lg">
        <Ionicons name="person-outline" size={24} color="#3b5998" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      {errors.username && (
        <Text style={{ color: "red", marginBottom: 8 }}>{errors.username}</Text>
      )}

      <View className="flex-row items-center px-4 py-3 mb-2 bg-gray-100 rounded-lg">
        <Ionicons name="mail-outline" size={24} color="#3b5998" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {errors.email && (
        <Text style={{ color: "red", marginBottom: 8 }}>{errors.email}</Text>
      )}

      <View className="flex-row items-center px-4 py-3 mb-2 bg-gray-100 rounded-lg">
        <Ionicons name="lock-closed-outline" size={24} color="#3b5998" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#3b5998"
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={{ color: "red", marginBottom: 8 }}>{errors.password}</Text>
      )}

      {/* Indicateur de force du mot de passe */}
      {password && (
        <Text style={{ color: passwordStrength.color, marginBottom: 16 }}>
          Force du mot de passe : {passwordStrength.level}
        </Text>
      )}

      <TouchableOpacity
        className="py-4 mb-4 bg-blue-500 rounded-lg"
        onPress={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-lg font-bold text-center text-white">
            S'inscrire
          </Text>
        )}
      </TouchableOpacity>

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity>
          <Text className="text-center text-blue-500">
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </Link>
    </KeyboardAvoidingView>
  );
}
