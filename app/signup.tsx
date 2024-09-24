import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  index: undefined;
  signup: undefined;
};

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3005/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // You can remove this line later

      setLoading(false);
      Alert.alert("Votre compte a été crée!");
      navigation.navigate("index");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-500">
      <Animatable.View
        animation="fadeInDown"
        className="flex-1 justify-center items-center"
      >
        <Text className="text-white font-bold text-3xl">Create Account</Text>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        className="flex-3 bg-white rounded-t-3xl p-8"
      >
        <Text className="text-gray-800 text-lg mt-5">Nom de l'utilisateur</Text>
        <TextInput
          className="border-b border-gray-200 mb-5 text-gray-800 text-lg"
          // placeholder="Enter your username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        <Text className="text-gray-800 text-lg mt-5">Mot de passe</Text>
        <TextInput
          className="border-b border-gray-200 mb-5 text-gray-800 text-lg"
          // placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-teal-500 p-4 rounded-lg items-center mt-8"
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-bold">S'inscrire</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4 items-center"
          onPress={() => navigation.navigate("index")}
        >
          <Text className="text-teal-500 text-lg">
            Vous avez déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
