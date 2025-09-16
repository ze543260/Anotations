import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import axios, { AxiosError } from "axios";

// Tipos
type Level = "iniciante" | "intermediario" | "avancado";

interface ApiResponse {
  success: boolean;
  data: {
    topic: string;
    level: string;
    notes: string;
    generatedAt: string;
  };
}

interface ErrorResponse {
  error: string;
  message: string;
}

const API_BASE_URL = "http://192.168.1.100:4000/api"; // Ajuste para o IP da sua máquina

export default function App(): JSX.Element {
  const [topic, setTopic] = useState<string>("");
  const [level, setLevel] = useState<Level>("intermediario");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateNotes = async (): Promise<void> => {
    if (!topic.trim()) {
      Alert.alert("Erro", "Por favor, digite um tópico");
      return;
    }

    setLoading(true);
    setNotes("");

    try {
      const response = await axios.post<ApiResponse>(
        `${API_BASE_URL}/generate-notes`,
        {
          topic: topic.trim(),
          level,
        }
      );

      if (response.data.success) {
        setNotes(response.data.data.notes);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Alert.alert("Erro", "Erro ao gerar anotações");
      }
    } catch (error: unknown) {
      console.error("Erro:", error);

      let errorMessage = "Erro inesperado. Tente novamente.";

      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (
        axiosError.code === "ECONNREFUSED" ||
        axiosError.message?.includes("Network Error")
      ) {
        errorMessage =
          "Não foi possível conectar com o servidor. Verifique se o backend está rodando e se o IP está correto.";
      }

      Alert.alert("Erro", errorMessage);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyNotes = async (): Promise<void> => {
    if (notes) {
      await Clipboard.setStringAsync(notes);
      Alert.alert(
        "Sucesso",
        "Anotações copiadas para a área de transferência!"
      );
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleClearNotes = (): void => {
    Alert.alert("Confirmar", "Tem certeza que deseja limpar as anotações?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: () => {
          setNotes("");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      },
    ]);
  };

  const getLevelEmoji = (level: Level): string => {
    switch (level) {
      case "iniciante":
        return "🟢";
      case "intermediario":
        return "🟡";
      case "avancado":
        return "🔴";
      default:
        return "🟡";
    }
  };

  const getLevelText = (level: Level): string => {
    switch (level) {
      case "iniciante":
        return "Iniciante";
      case "intermediario":
        return "Intermediário";
      case "avancado":
        return "Avançado";
      default:
        return "Intermediário";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🤖 Anotations</Text>
            <Text style={styles.headerSubtitle}>
              Gerador de anotações inteligentes
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>📝 Tópico para estudar:</Text>
              <TextInput
                style={styles.textInput}
                value={topic}
                onChangeText={setTopic}
                placeholder="Ex: JavaScript, React, Node.js..."
                placeholderTextColor="#999"
                editable={!loading}
                multiline={false}
                returnKeyType="done"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>🎯 Nível de conhecimento:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={level}
                  onValueChange={(itemValue: Level) => setLevel(itemValue)}
                  style={styles.picker}
                  enabled={!loading}
                >
                  <Picker.Item
                    label={`${getLevelEmoji("iniciante")} ${getLevelText(
                      "iniciante"
                    )}`}
                    value="iniciante"
                  />
                  <Picker.Item
                    label={`${getLevelEmoji("intermediario")} ${getLevelText(
                      "intermediario"
                    )}`}
                    value="intermediario"
                  />
                  <Picker.Item
                    label={`${getLevelEmoji("avancado")} ${getLevelText(
                      "avancado"
                    )}`}
                    value="avancado"
                  />
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.generateButton,
                (!topic.trim() || loading) && styles.buttonDisabled,
              ]}
              onPress={handleGenerateNotes}
              disabled={!topic.trim() || loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="white" size="small" />
                  <Text style={styles.buttonText}>Gerando...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>🚀 Gerar Anotações</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Notes Result */}
          {notes ? (
            <View style={styles.notesContainer}>
              <View style={styles.notesHeader}>
                <Text style={styles.notesTitle}>📚 Suas anotações</Text>
                <View style={styles.notesActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.copyButton]}
                    onPress={handleCopyNotes}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="copy-outline" size={16} color="white" />
                    <Text style={styles.actionButtonText}>Copiar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.clearButton]}
                    onPress={handleClearNotes}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="trash-outline" size={16} color="white" />
                    <Text style={styles.actionButtonText}>Limpar</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.notesScrollView} nestedScrollEnabled>
                <TextInput
                  style={styles.notesTextArea}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  scrollEnabled={false}
                  placeholder="Suas anotações aparecerão aqui..."
                  placeholderTextColor="#999"
                />
              </ScrollView>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#667eea",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 8,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    minHeight: 48,
  },
  pickerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#333",
  },
  generateButton: {
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 107, 107, 0.6)",
    elevation: 0,
    shadowOpacity: 0,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  notesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    flex: 1,
  },
  notesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    flex: 1,
    marginBottom: 10,
  },
  notesActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  copyButton: {
    backgroundColor: "#2ecc71",
  },
  clearButton: {
    backgroundColor: "#e74c3c",
  },
  actionButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  notesScrollView: {
    flex: 1,
    maxHeight: 400,
  },
  notesTextArea: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    minHeight: 300,
    textAlignVertical: "top",
  },
});
