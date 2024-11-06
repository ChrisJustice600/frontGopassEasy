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
          name="home"
          options={{
            title: "Accueil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ticket"
          options={{
            title: "Ticket",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ticket" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
