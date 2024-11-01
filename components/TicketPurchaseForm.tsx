import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const TicketPurchaseForm = () => {
  const [flightType, setFlightType] = useState("NATIONAL");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null); // Ajout de l'état QR code

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://gopasseasy.onrender.com/api/tickets/purchase",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ flightType, paymentMethod }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode); // Stocke le QR code reçu
        Alert.alert("Succès", "Votre ticket a été acheté avec succès !");
      } else {
        Alert.alert("Erreur", data.error || "Erreur lors de l'achat du ticket");
      }
    } catch {
      Alert.alert("Erreur", "Erreur de paiement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        width: "100%",
        padding: 16,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
      }}
    >
      <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: "bold" }}>
        Achetez votre ticket Go Pass
      </Text>

      <Text style={{ marginVertical: 4, color: "gray" }}>Type de vol</Text>
      <Picker
        selectedValue={flightType}
        onValueChange={(value) => setFlightType(value)}
        style={{ backgroundColor: "#e8eef3", borderRadius: 8 }}
      >
        <Picker.Item label="National" value="NATIONAL" />
        <Picker.Item label="International" value="INTERNATIONAL" />
      </Picker>

      <Text style={{ marginVertical: 4, color: "gray" }}>Mode de paiement</Text>
      <Picker
        selectedValue={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value)}
        style={{ backgroundColor: "#e8eef3", borderRadius: 8 }}
      >
        <Picker.Item label="Carte bancaire" value="CARD" />
        <Picker.Item label="Mobile Money" value="MOBILE_MONEY" />
      </Picker>

      <TouchableOpacity
        onPress={handlePurchase}
        style={{
          backgroundColor: "#007bff",
          borderRadius: 8,
          marginTop: 16,
          padding: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Acheter
          </Text>
        )}
      </TouchableOpacity>

      {/* Affichage du QR code si disponible */}
      {qrCode && (
        <View style={{ marginTop: 16, alignItems: "center" }}>
          <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>
            Code QR de votre ticket
          </Text>
          <Image
            source={{ uri: qrCode }}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>
      )}
    </Animated.View>
  );
};

export default TicketPurchaseForm;
