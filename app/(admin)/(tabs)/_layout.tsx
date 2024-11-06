import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function TabLayout() {
  return (
    <>
      {/* Configurer la barre d'état en sombre */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Tabs>
        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="scan" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profileAdmin"
          options={{
            title: "ProfilAdmin",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
