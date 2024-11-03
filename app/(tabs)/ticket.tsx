import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Assurez-vous d'installer Ionicons pour l'icône de validation
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

interface Transaction {
  amount: number;
  paymentMethod: string;
}
interface Ticket {
  id: number;
  flightType: string;
  transaction: Transaction;
  createdAt: string;
  status: string;
  qrCode?: string;
}

export default function UserTicketsScreen() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://gopasseasy.onrender.com/api/tickets/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error("Erreur lors de la récupération des tickets");
        }
      } catch (error) {
        console.error(
          "Erreur réseau lors de la récupération des tickets :",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.token) fetchTickets();
  }, [user]);

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#3b5998" />
      </View>
    );
  }

  if (!tickets.length) {
    return (
      <View className="items-center justify-center flex-1 p-5 bg-white">
        <Text className="text-lg text-gray-500">Aucun ticket trouvé</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="m-4 overflow-hidden bg-white shadow-xl rounded-3xl">
          {/* Header avec un fond dégradé */}
          <View
            style={{
              backgroundColor: "linear-gradient(to right, #3b5998, #8b9dc3)",
              padding: 16,
              paddingBottom: 24,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Text className="text-xl font-bold text-white">
              {item.flightType} - {item.status.toUpperCase()}
            </Text>
            <Text className="text-sm text-gray-700">
              {"le " +
                new Date(item.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
            </Text>
          </View>

          {/* Corps de la carte */}
          <View className="px-2 py-2 bg-white">
            <View className="flex-row items-center mb-2">
              <MaterialIcons name="attach-money" size={20} color="#3b5998" />
              <Text className="ml-2 text-lg text-gray-900">
                Montant :{" "}
                <Text className="font-bold">{item.transaction.amount} USD</Text>
              </Text>
            </View>

            <View className="flex-row items-center mb-4">
              <MaterialIcons name="flight-takeoff" size={20} color="#3b5998" />
              <Text className="ml-2 text-lg text-gray-900">
                Type de vol : {item.flightType}
              </Text>
            </View>
            <View className="flex-row items-center mb-4">
              {/* Icône de validation */}
              {item.status.toLowerCase() === "valid" ? (
                <Ionicons name="checkmark-circle" size={24} color="#34D399" /> // Vert clair pour l'icône de validation
              ) : (
                <MaterialIcons name="cancel" size={24} color="#EF4444" /> // Rouge pour un statut non valide
              )}
              <Text
                className={`ml-2 text-lg font-bold ${
                  item.status.toLowerCase() === "valid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                TICKET {item.status.toUpperCase()}E
              </Text>
            </View>

            {/* QR Code */}
            {item.qrCode && (
              <View className="items-center justify-center p-4 mt-4 bg-gray-100 rounded-lg shadow-md">
                <Text className="mb-2 text-lg font-semibold text-gray-700">
                  Code QR de votre ticket
                </Text>
                <Image
                  source={{ uri: item.qrCode }}
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: "#3b79",
                  }}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </View>
      )}
      contentContainerStyle={{
        paddingBottom: 20,
        paddingHorizontal: 10,
      }}
    />
  );
}
