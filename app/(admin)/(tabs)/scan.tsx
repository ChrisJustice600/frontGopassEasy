import { ScannerIcon } from "@/assets/ScannerIcon";
import axios from "axios";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export function QRScanner() {
  const [items, setItems] = useState<string[]>([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(true);

  async function handleBarcodeScanned(data: BarcodeScanningResult) {
    const scannedItem = data.data;

    // Éviter de re-scanner le même code
    if (items.includes(scannedItem)) return;

    setItems((state) => [...state, scannedItem]);

    try {
      const response = await axios.post(
        "https://gopasseasy.onrender.com/api/agent/scan",
        { qrCode: scannedItem }
      );

      const { message, ticket } = response.data;

      // Vérifiez si les données du ticket existent avant d'afficher l'alerte
      if (ticket) {
        Alert.alert(
          "Succès",
          `${message}\n\nInformations du ticket:\n` +
            `- ID: ${ticket.id}\n` +
            `- Utilisateur: ${ticket.user?.username || "Non spécifié"}\n` +
            `- Type de vol: ${ticket.flightType || "Non spécifié"}\n` +
            `- Montant de la transaction: ${
              ticket.transaction?.amount || "Non spécifié"
            }\n` +
            `- Méthode de paiement: ${
              ticket.transaction?.paymentMethod || "Non spécifiée"
            }\n`
        );
      } else {
        Alert.alert("Erreur", "Les informations du ticket sont incomplètes.");
      }

      // Désactiver le scan temporairement
      setScanning(false);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Si l'erreur vient du serveur, afficher le message d'erreur
        console.error("Erreur serveur :", error.response.data);
        Alert.alert(
          "Erreur",
          error.response.data.error ||
            "Une erreur est survenue lors de la validation."
        );
      } else {
        // Si l'erreur est liée au réseau ou autre
        console.error("Erreur réseau :", error.message);
        Alert.alert("Erreur", "Une erreur réseau est survenue.");
      }
    }
  }

  function resetScanner() {
    // Réinitialiser l'état pour permettre un nouveau scan
    setItems([]);
    setScanning(true);
  }

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View className="items-center justify-center flex-1 bg-gray-900">
        <Text className="mb-4 text-lg text-white">
          Nous avons besoin de votre autorisation pour utiliser la caméra
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="px-4 py-2 bg-green-500 rounded-lg"
        >
          <Text className="font-bold text-white">Accorder l'autorisation</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      ratio="16:9"
      onBarcodeScanned={scanning ? handleBarcodeScanned : undefined}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#00FF00",
          borderWidth: 2,
          borderRadius: 12,
        }}
      >
        <ScannerIcon size={300} />

        <View style={{ position: "absolute", top: 16, right: 16 }}>
          <TouchableOpacity
            onPress={resetScanner}
            activeOpacity={0.7}
            style={{
              backgroundColor: "red",
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Reprendre le scan
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ position: "absolute", bottom: 32, alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Éléments scannés :
          </Text>
          <ScrollView
            style={{
              width: 200,
              maxHeight: 150,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: 8,
              borderRadius: 10,
              marginTop: 16,
            }}
          >
            {items.length ? (
              items.map((item) => (
                <View
                  key={item}
                  style={{
                    padding: 10,
                    backgroundColor: "gray",
                    marginBottom: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "white" }}>{item}</Text>
                </View>
              ))
            ) : (
              <View style={{ padding: 10 }}>
                <Text style={{ color: "white" }}>Aucun élément scanné.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </CameraView>
  );
}

export default QRScanner;
