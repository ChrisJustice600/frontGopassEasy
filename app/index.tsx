import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Eye, EyeOff } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  index: undefined;
  signup: undefined;
};

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-teal-500">
      <Animatable.View
        animation="fadeInDown"
        className="flex-1 justify-center items-center"
      >
        <Text className="text-white font-bold text-3xl">Welcome Back!</Text>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        className="flex-3 bg-white rounded-t-3xl p-8"
      >
        <Text className="text-gray-800 text-lg mt-5">Nom de l'utilisateur</Text>
        <TextInput
          className="border-b border-gray-200 mb-5 text-gray-800 text-lg"
          // placeholder="Entrez votre nom d'utilisateur"
          placeholderTextColor="gray"
        />
        <Text className="text-gray-800 text-lg mt-5">mot de passe</Text>
        <View className="flex-row items-center border-b border-gray-200 mb-5">
          <TextInput
            className="flex-1 text-gray-800 text-lg"
            // placeholder="Entrez le mot de passe"
            placeholderTextColor="gray"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <EyeOff stroke="gray" width={24} height={24} />
            ) : (
              <Eye stroke="gray" width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-teal-500 p-4 rounded-lg items-center mt-8">
          <Text className="text-white text-lg font-bold">Se connecté</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4 items-center"
          onPress={() => navigation.navigate("signup")}
        >
          <Text className="text-teal-500 text-sm">
            Vous n'avez pas de compte ? S'inscrire{" "}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
