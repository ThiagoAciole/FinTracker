import { StyleSheet, View, Image } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import Logo from "../../../assets/logo.png";
import axios from "axios";
import qs from "qs";

import { AsyncStorage } from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  /*
  useEffect(async () => {
    let auth = "";
    if (Platform.OS === "web") {
      auth = localStorage.getItem("auth");
    } else {
      auth = await AsyncStorage.getItem("auth");
    }
    if (auth === "true") {
      navigation.navigate("Main");
    }
  }, [navigation]);
*/

  async function handleLogin() {
    if (Platform.OS === "web") {
      try {
        const response = await axios.post(
          "http://localhost:8080/users/login",
          qs.stringify({
            email: email,
            password: password,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.status === 200) {
          const username = response.data.username;
          const userId = response.data.userId;
          const auth = response.data.authenticated;

          if (Platform.OS === "web") {
            localStorage.setItem("username", username);
            localStorage.setItem("userId", userId);
            localStorage.setItem("auth", auth);
          } else {
            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("username", username);
            await AsyncStorage.setItem("userId", userId);
            await AsyncStorage.setItem("auth", auth);
          }
        } else {
          setError("Falha na autenticação");
        }
      } catch (error) {
        setError("Erro na autenticação");
      }
    } else {
      navigation.navigate("Main");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={{ width: 300, height: 100, resizeMode: "contain" }}
      />

      <TextInput
        textContentType="emailAddress"
        mode="outlined"
        label="Email"
        placeholder=""
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry
        mode="outlined"
        label="Senha"
        placeholder=""
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

      <Button
        mode="contained"
        onPress={handleLogin}
        buttonColor="#4169E1"
        style={{ marginTop: 20 }}
      >
        Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 18,
  },
});
