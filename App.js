import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bancoExterno } from "./firebaseConnection";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export default function App() {
  const [nome, setNome] = useState("Carregando...");
  const [nome2, setNome2] = useState(" ");
  const [nome3, setNome3] = useState("");

  useEffect(() => {
    async function pegarDados() {
      const referencia = doc(bancoExterno, "aparelhos", "1");

      getDoc(referencia)
        .then((snap) => {
          setNome(snap.data()?.TV);
        })

        .catch((erro) => {
          console.log(erro);
        });

      onSnapshot(doc(bancoExterno, "aparelhos", "1"), (snap) => {
        setNome2(snap.data()?.Geladeira);
      });

      const referencia2 = collection(bancoExterno, "aparelhos");
      getDocs(referencia2)
        .then((snap) => {
          let lista = [];
          snap.forEach((doc) => {
            lista.push({
              id: doc.id,
              tv: doc.data()?.TV,
              geladeira: doc.data()?.Geladeira,
              fogao: doc.data()?.Fogão,
            });
          });
          let info = lista[3].tv;
          setNome3(info);
        })
        .catch((erro) => {
          console.log(erro);
        });
    }
    pegarDados();
  }, []);

  async function addBancoExterno() {
    await setDoc(doc(bancoExterno, "aparelhos", "3"), {
      TV: "Sony",
      Geladeira: "Continental",
      Fogão: "Consul",
    });
  }

  async function addBancoExterno2() {
    await addDoc(collection(bancoExterno, "aparelhos"), {
      TV: "AOC",
      Geladeira: "Dako",
      Fogão: "Dako",
    });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>GetDoc: {nome}</Text>
      <Text style={{ fontSize: 25 }}>OnSnapshot: {nome2}</Text>
      <Text style={{ fontSize: 25 }}>GetDocs: {nome3} </Text>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={addBancoExterno}
        style={{ backgroundColor: "#F50" }}
      >
        <Text style={{ fontSize: 20, paddingHorizontal: 15 }}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "#AFF" }}
        onPress={addBancoExterno2}
      >
        <Text style={{ fontSize: 20, paddingHorizontal: 15 }}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
