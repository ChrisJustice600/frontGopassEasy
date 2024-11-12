import { ScannerIcon } from "@/assets/ScannerIcon";
import axios from "axios";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

export function QRScanner() {
  const [items, setItems] = useState<string[]>([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<any>(null);

  async function handleBarcodeScanned(data: BarcodeScanningResult) {
    const scannedItem = data.data;
    console.log(scannedItem);

    if (items.includes(scannedItem)) return;

    setItems((state) => [...state, scannedItem]);

    try {
      const response = await axios.post(
        "https://gopasseasy.onrender.com/api/agent/scan",
        { qrCode: scannedItem }
      );

      const { message, ticket } = response.data;

      if (ticket) {
        setTicketInfo({
          message,
          username: ticket.user?.username || "Non spécifié",
          flightType: ticket.flightType || "Non spécifié",
          amount: ticket.transaction?.amount || "Non spécifié",
          paymentMethod: ticket.transaction?.paymentMethod || "Non spécifiée",
        });
        setModalVisible(true);
      } else {
        setTicketInfo({
          error: "Les informations du ticket sont incomplètes.",
        });
        setModalVisible(true);
      }

      setScanning(false);
    } catch (error: any) {
      setTicketInfo({
        error:
          axios.isAxiosError(error) && error.response
            ? error.response.data.error ||
              "Une erreur est survenue lors de la validation."
            : "Une erreur réseau est survenue.",
      });
      setModalVisible(true);
    }
  }

  function resetScanner() {
    setItems([]);
    setScanning(true);
    setModalVisible(false);
    setTicketInfo(null);
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

        <Modal isVisible={isModalVisible} onBackdropPress={resetScanner}>
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            {ticketInfo?.error ? (
              <Text style={{ color: "red", fontSize: 18 }}>
                {ticketInfo.error}
              </Text>
            ) : (
              <>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
                >
                  {ticketInfo?.message}
                </Text>
                <Text>Utilisateur: {ticketInfo?.username}</Text>
                <Text>Type de vol: {ticketInfo?.flightType}</Text>
                <Text>Montant de la transaction: {ticketInfo?.amount}</Text>
                <Text>Méthode de paiement: {ticketInfo?.paymentMethod}</Text>
              </>
            )}
            <TouchableOpacity onPress={resetScanner} style={{ marginTop: 20 }}>
              <Text style={{ color: "blue", textAlign: "center" }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
