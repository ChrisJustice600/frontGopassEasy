import { StatusBar } from "expo-status-bar";
import React from "react";
import { TextInput, View } from "react-native";
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <StatusBar style="dark" />
      {/* search bar */}
      <View className="flex-row items-center px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Restaurant"
            placeholderTextColor="gray"
            className="ml-2 flex-1 text-black"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
