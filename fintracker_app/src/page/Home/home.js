import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import CardChart from "../../components/CardChart/cardChart";
import Historic from "../../components/HistoricDespesas/historic";
import FormsDialog from "../../components/FormsDialog/FormsDialog";
import CardHistoric from "../../components/HistoricDespesas/CardHistoric/CardHistoric";
import Empty from "../../../assets/empty.png";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [entries, setEntries] = useState([]);
  const [ganhos, setGanhos] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [username, setUsername] = useState("ThiagoAciole");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  

  useEffect(() => {
    entries.map((e) => {
      if (e.type === "Ganho") {
        setGanhos(ganhos + parseFloat(e.value));
      } else {
        setDespesas(despesas + parseFloat(e.value));
      }
    });
  }, [entries]);

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text
            variant="headlineSmall"
            style={{ color: "#909090", fontWeight: 700 }}
          >
            Bem Vindo,
          </Text>
          <Text variant="headlineMedium" style={{ fontWeight: 700 }}>
            {username}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <CardChart ganhos={ganhos} gastos={despesas} />
          <View>
            <Text style={styles.text}>Ganhos e Despesas </Text>
            {entries.length === 0 && (
              <Image
                source={Empty}
                width={100}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                  height: 100,
                }}
              />
            )}
            {entries.map((e) => (
              <CardHistoric
                title={e.type}
                description={e.description}
                value={e.value}
              />
            ))}
          </View>
        </View>
        <FormsDialog
          visible={visible}
          hideDialog={hideDialog}
          addEntry={addEntry}
        />
      </ScrollView>
      <IconButton
        style={{
          margin: 10,
          alignSelf: "flex-end",
          position: "absolute",
          bottom: 0,
          right: 0,

          backgroundColor: "#4169E1",
        }}
        icon="plus"
        mode="contained"
        iconColor="#fff"
        size={48}
        onPress={showDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
});
