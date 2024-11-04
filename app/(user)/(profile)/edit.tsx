import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useAuth } from "../../../context/AuthContext";

export default function EditProfileScreen() {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation(); // Pour naviguer en arrière

  const handleSaveChanges = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      await updateUser({ username, email });
      setSuccess(true);
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-6 pt-12 bg-gray-100">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: "blue", marginBottom: 10 }}>Retour</Text>
      </TouchableOpacity>

      <Animatable.Text
        animation="fadeInDown"
        duration={600}
        className="mb-8 text-3xl font-bold text-center text-gray-900"
      >
        Modifier le Profil
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        {/* Champs Nom d'utilisateur et Email */}
        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Nom d'utilisateur
          </Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Nom d'utilisateur"
            className="p-4 text-gray-900 bg-white border border-gray-300 rounded-lg"
          />
        </View>
        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray-700">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            className="p-4 text-gray-900 bg-white border border-gray-300 rounded-lg"
          />
        </View>

        {/* Bouton de sauvegarde */}
        <TouchableOpacity
          className={`mt-6 bg-blue-600 p-4 rounded-lg items-center justify-center ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          onPress={handleSaveChanges}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text className="text-lg font-semibold text-white">
              Enregistrer les modifications
            </Text>
          )}
        </TouchableOpacity>

        {/* Message de succès */}
        {success && (
          <Animatable.Text
            animation="fadeIn"
            duration={500}
            className="mt-4 text-lg font-semibold text-center text-green-600"
          >
            Modifications enregistrées avec succès !
          </Animatable.Text>
        )}
      </Animatable.View>
    </View>
  );
}
