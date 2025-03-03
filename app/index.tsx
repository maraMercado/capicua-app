import { View, Text, Pressable, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeProvider";

const removeAccents = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
    .replace(/ñ/g, "ñ"); // Corrige la ñ si fue afectada
};

const esCapicua = (strCheck: string) => {
  let strNorm = strCheck.toLowerCase().trim();
  strNorm = removeAccents(strNorm);
  strNorm = strNorm.replace(/[^a-zñ\d]/g, "");

  if (strNorm.length === 0) {
    return { mensaje: "Por favor ingresa al menos una letra o número.", palabra: "" };
  }

  const esCapicua = strNorm === strNorm.split("").reverse().join("");
  const esSoloNumeros = (str: string): boolean => !isNaN(Number(str));

  const mensaje = `${esSoloNumeros(strNorm) ? "El número" : "La palabra"} ${strCheck} ${esCapicua ? "es capicúa 🥳🥳🥳" : "no es capicúa 😞"}`;

  return { mensaje, palabra: strCheck };
};

export default function Index() {
  const [palabra, setPalabra] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [resaltado, setResaltado] = useState("");

  const { dark, colors, setScheme } = useTheme();

  const ToggleTheme = () => {
    dark ? setScheme("light") : setScheme("dark");
  };

  const handleSubmit = () => {
    const resultado = esCapicua(palabra);
    setMensaje(resultado.mensaje);
    setResaltado(resultado.palabra);
  };

  return (
    <View style={[styles.containerPadre, { backgroundColor: colors.bg }]}>
      <View style={styles.cont1}>
        <Text style={[styles.title, { color: colors.title, textShadowColor: colors.shadow }]}>
          Capicúa Checker
        </Text>

        <TextInput
          value={palabra}
          placeholder="Ingresa una palabra"
          onChangeText={setPalabra}
          onEndEditing={handleSubmit}
          onSubmitEditing={handleSubmit}
          style={[styles.input, { borderColor: colors.border_color }]}
        />
      </View>

      <View style={styles.cont2}>
        <Pressable onPress={handleSubmit}>
          <Text style={styles.button}>Check</Text>
        </Pressable>

        {mensaje !== "" && (
          <View style={styles.resultadoContainer}>
            {resaltado !== "" ? (
              <Text style={[styles.resultado, { color: colors.mensaje_color }]}>
                <Text>{mensaje.split(resaltado)[0]}</Text>
                <Text style={[styles.resaltado, { color: colors.resaltado_color }]}>{resaltado}</Text>
                <Text>{mensaje.split(resaltado)[1]}</Text>
              </Text>
            ) : (
              <Text style={[styles.resultado, { color: colors.mensaje_color }]}>{mensaje}</Text>
            )}
          </View>
        )}
      </View>

      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={ToggleTheme}>
          <Ionicons name={dark ? "sunny-outline" : "moon-sharp"} size={38} color={dark ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPadre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "DynaPuff-Bold",
    fontSize: 30,
    textShadowRadius: 10,
  },

  input: {
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "#e8e8e8",
    padding: 15,
    fontFamily: "DynaPuff-Regular",
    fontSize: 16,
    marginTop: 30,
  },

  cont1: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#D6CFE2",
    borderRadius: 10,
    fontFamily: "DynaPuff-Regular",
    fontSize: 18,
    height: 40,
    width: 90,
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    marginBottom: 30,
  },

  resultadoContainer: {
    alignItems: "center",
  },

  resultado: {
    fontFamily: "DynaPuff-Regular",
    fontSize: 18,
    paddingHorizontal: 20,
  },

  resaltado: {
    fontFamily: "DynaPuff-Bold",
  },

  cont2: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
