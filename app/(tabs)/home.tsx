import React from "react";
import { Text, View } from "react-native";
import TicketPurchaseForm from "../../components/TicketPurchaseForm";
import { useAuth } from "../../context/AuthContext";

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f2f6f9",
      }}
    >
      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "bold" }}>
        Bonjour, {user?.username} !
      </Text>
      <TicketPurchaseForm />
    </View>
  );
};

export default HomeScreen;
