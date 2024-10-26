import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignup = () => {
    // Logique d'inscription ici
    router.replace("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      className="flex-1 justify-center items-center"
    >
      <Animatable.View
        animation="fadeInUpBig"
        className="bg-white w-11/12 rounded-3xl p-8 shadow-lg"
      >
        <Text className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Créer un compte
        </Text>
        <Animatable.View animation="fadeIn" delay={500}>
          <View className="flex-row items-center border-b border-gray-300 mb-4 py-2">
            <Ionicons name="person-outline" size={24} color="#3b5998" />
            <TextInput
              className="flex-1 ml-2 text-gray-700"
              placeholder="Nom d'utilisateur"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </Animatable.View>
        <Animatable.View animation="fadeIn" delay={700}>
          <View className="flex-row items-center border-b border-gray-300 mb-4 py-2">
            <Ionicons name="mail-outline" size={24} color="#3b5998" />
            <TextInput
              className="flex-1 ml-2 text-gray-700"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </Animatable.View>
        <Animatable.View animation="fadeIn" delay={900}>
          <View className="flex-row items-center border-b border-gray-300 mb-6 py-2">
            <Ionicons name="lock-closed-outline" size={24} color="#3b5998" />
            <TextInput
              className="flex-1 ml-2 text-gray-700"
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </Animatable.View>
        <TouchableOpacity
          className="bg-blue-500 rounded-full py-3 mb-4"
          onPress={handleSignup}
        >
          <Text className="text-white text-center font-bold text-lg">
            S'inscrire
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-blue-500 text-center">
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      {!isKeyboardVisible && (
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          // source={require("../../assets/logo.png")}
          className="w-32 h-32 mt-8"
          resizeMode="contain"
        />
      )}
    </LinearGradient>
  );
}
