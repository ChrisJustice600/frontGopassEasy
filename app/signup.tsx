import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const navigation = useNavigation();

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
        <Text className="text-gray-800 text-lg mt-5">Username</Text>
        <TextInput
          className="border-b border-gray-200 mb-5 text-gray-800 text-lg"
          placeholder="Enter your username"
          placeholderTextColor="gray"
        />
        <Text className="text-gray-800 text-lg mt-5">Password</Text>
        <TextInput
          className="border-b border-gray-200 mb-5 text-gray-800 text-lg"
          placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry
        />
        <TouchableOpacity className="bg-teal-500 p-4 rounded-lg items-center mt-8">
          <Text className="text-white text-lg font-bold">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4 items-center"
          // onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text className="text-teal-500 text-lg">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
