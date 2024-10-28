import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../../context/AuthContext";

// Typages des états et des données du ticket
interface TicketData {
  user: { name: string };
  flightType: "NATIONAL" | "INTERNATIONAL";
  qrCode: string;
  status: "VALIDE" | "INVALIDE";
}

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const [flightType, setFlightType] = useState<"NATIONAL" | "INTERNATIONAL">(
    "NATIONAL"
  );
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "MOBILE_MONEY">(
    "CARD"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<TicketData | null>(null);

  // Fonction pour simuler la requête d'achat
  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fakePurchaseRequest();
      setTicket(response);
    } catch (error) {
      console.error("Erreur de paiement:", error);
    }
    setLoading(false);
  };

  // Simulation d'une requête de paiement
  const fakePurchaseRequest = (): Promise<TicketData> =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          user: { name: user?.username || "Utilisateur" },
          flightType,
          qrCode: `${user?.id}-${flightType}-${Date.now()}`,
          status: "VALIDE",
        });
      }, 2000)
    );

  return (
    <View className="flex-1 items-center justify-center bg-[#f2f6f9] px-6">
      <Text className="mb-6 text-2xl font-bold">
        Bonjour, {user?.username} !
      </Text>

      {!ticket ? (
        <View className="w-full p-4 bg-white rounded-lg shadow-lg">
          <Text className="mb-2 text-lg font-semibold">
            Achetez votre ticket Go Pass
          </Text>

          {/* Picker pour le type de vol */}
          <Text className="mt-4 mb-1 text-gray-500">Type de vol</Text>
          <Picker
            selectedValue={flightType}
            onValueChange={(value) =>
              setFlightType(value as "NATIONAL" | "INTERNATIONAL")
            }
            style={{ backgroundColor: "#e8eef3", borderRadius: 10 }}
          >
            <Picker.Item label="National" value="NATIONAL" />
            <Picker.Item label="International" value="INTERNATIONAL" />
          </Picker>

          {/* Picker pour le mode de paiement */}
          <Text className="mt-4 mb-1 text-gray-500">Mode de paiement</Text>
          <Picker
            selectedValue={paymentMethod}
            onValueChange={(value) =>
              setPaymentMethod(value as "CARD" | "MOBILE_MONEY")
            }
            style={{ backgroundColor: "#e8eef3", borderRadius: 10 }}
          >
            <Picker.Item label="Carte bancaire" value="CARD" />
            <Picker.Item label="Mobile Money" value="MOBILE_MONEY" />
          </Picker>

          {/* Bouton d'achat */}
          <TouchableOpacity
            onPress={handlePurchase}
            className="py-3 mt-6 bg-blue-600 rounded-full"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-lg font-semibold text-center text-white">
                Acheter
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center w-full p-6 bg-white rounded-lg shadow-lg">
          <Text className="mb-2 text-lg font-semibold">Votre Ticket</Text>
          <QRCode value={ticket.qrCode} size={150} />
          <Text className="mt-4 text-gray-600">
            Type de vol : {ticket.flightType}
          </Text>
          <Text className="mt-2 text-gray-600">Statut : {ticket.status}</Text>
          <Text className="mt-6 text-lg font-semibold text-blue-600">
            Validité Confirmée
          </Text>
        </View>
      )}

      {/* Animation de paiement en cours */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default HomeScreen;
