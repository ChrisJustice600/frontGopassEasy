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

    if (items.includes(scannedItem)) return;

    setItems((state) => [...state, scannedItem]);

    try {
      const response = await axios.post(
        "http://votre-serveur/api/scanTickets",
        { qrCode: scannedItem }
      );
      Alert.alert("Succès", response.data.message);
    } catch (error) {
      Alert.alert("Une erreur est survenue lors de la validation.");
    }
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
          borderColor: "#00FF00", // Couleur verte pour un effet "viseur"
          borderWidth: 2,
          borderRadius: 12,
        }}
      >
        <ScannerIcon size={300} />

        <View style={{ position: "absolute", top: 16, right: 16 }}>
          <TouchableOpacity
            onPress={() => setScanning(!scanning)}
            activeOpacity={0.7}
          >
            {/* <AntDesign size={24} name="close" color="#FFF" /> */}
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
