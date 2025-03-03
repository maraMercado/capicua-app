import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

const removeAccents = (str: string) => {
  return str
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
  .replace(/ñ/g, "ñ"); // Corrige la ñ si fue afectada
};

const esCapicua = (strCheck: string) => {
  // Normalizamos la cadena.
  let strNorm = strCheck.toLowerCase().trim(); // En minúsculas y sin espacios extremos
  strNorm = removeAccents(strNorm); // Quitamos tildes.
  strNorm = strNorm.replace(/[^a-zñ\d]/g, ""); // Conservamos sólo letras y números

  // Validamos que la cadena siga teniendo contenido
  if (strNorm.length === 0) {
    return { mensaje: "Por favor ingresa al menos una letra o número.", palabra: "" };
  }

  const esCapicua = strNorm === strNorm.split("").reverse().join("");
  const esSoloNumeros = (str: string): boolean => !isNaN(Number(str));

  const mensaje = `${esSoloNumeros(strNorm) ? "El número" : "La palabra"} ${strCheck} ${esCapicua ? "es  capicúa 🥳🥳🥳" : "no es capicúa 😞"}`;

  return { mensaje, palabra: strCheck};

};

export default function Index() {
  const [palabra, setPalabra] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [resaltado, setResaltado] = useState("");

  const handleSubmit = () => {
    const resultado = esCapicua(palabra);
    setMensaje(resultado.mensaje);
    setResaltado(resultado.palabra);
  }
  
  return (
    <View style={styles.containerPadre}>

      <View style={styles.cont1}>
        <Text style={styles.title}>Capicúa Checker</Text>

        <TextInput 
          value={palabra} 
          placeholder="Ingresa una palabra" 
          onChangeText={setPalabra} 
          onEndEditing={handleSubmit} 
          onSubmitEditing={handleSubmit}
          style={styles.input}
        />
      </View>
      
      <View style={styles.cont2}>
        <Pressable onPress={handleSubmit}>
          <Text style={styles.button}>Check</Text>
        </Pressable>

        {mensaje && (
          <Text style={styles.resultado}>
            {resaltado ? (
              <>
                {mensaje.split(resaltado)[0]}
              <Text style={styles.resaltado}>{resaltado}</Text>
              {mensaje.split(resaltado)[1]}
              </>
            ) : (
              mensaje
            )}
            
            </Text>
            )}
      </View>

      <View style={{ flex: 2 }} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  containerPadre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontFamily: "DynaPuff-Bold", 
    fontSize: 30,
    color: "#4E3C69",
    textShadowRadius: 10,
    textShadowColor: "#D6CFE2"
  },

  input: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#705697",
    padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "DynaPuff-Regular",
    fontSize: 16,
    marginTop: 30
  },

  cont1: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30
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
    marginBottom: 30
  },
  
  resultado: {
    fontFamily: "DynaPuff-Regular",
    fontSize: 18,
    paddingHorizontal: 20,
  },

  resaltado: {
    color: "#705697",
    fontFamily: "DynaPuff-Bold",
  },

  cont2: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  }
})
