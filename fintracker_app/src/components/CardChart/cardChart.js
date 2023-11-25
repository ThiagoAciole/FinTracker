import React from "react";
import { View, StyleSheet } from "react-native";
import { Divider, Card, Text } from "react-native-paper";
import { ProgressCircle } from "react-native-svg-charts";
import { useState, useEffect } from "react";

const ProgressCircleChart = ({ ganhos, gastos }) => {
  const [percentualGastos, setPercentualGastos] = useState(0);
  const [percentualGanhos, setPercentualGanhos] = useState(0);

  useEffect(() => {
    calcularPercentuais();
  }, [ganhos, gastos]);

  const calcularPercentuais = () => {
    if (ganhos === 0 && gastos === 0) {
      setPercentualGastos(0);
      setPercentualGanhos(0);
      return;
    }
    const percentualGastos = (gastos / ganhos) * 100;
    const percentualGanhos = 100 - percentualGastos;

    setPercentualGastos(percentualGastos);
    setPercentualGanhos(percentualGanhos);
  };

  const colorProgress = () => {
    if (percentualGastos > 80) {
      return "#FF0000";
    } else {
      return "#4169E1";
    }
  };

  const data = [percentualGastos / 100, percentualGanhos / 100];

  return (
    <Card style={styles.container}>
      <View style={styles.circleContainer}>
        <ProgressCircle
          style={styles.progressCircle}
          progress={data[0]}
          progressColor={colorProgress()}
          cornerRadius={180}
          strokeWidth={30}
          startAngle={-Math.PI * 0.7}
        >
          <View style={styles.circleText}>
            <Text
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: `${colorProgress()}`,
              }}
            >
              {percentualGastos.toFixed(1)}%
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#909090",
                width: 100,
                textAlign: "center",
              }}
            >
              Gasto dos Ganhos Totais
            </Text>
          </View>
        </ProgressCircle>
      </View>

      <Divider />

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>R$ {ganhos}</Text>
          <Text style={styles.detailText}>Ganhos</Text>
        </View>

        <Text style={styles.dividerText}>|</Text>

        <View style={styles.detailItem}>
          <Text style={styles.detailText}>R$ {gastos}</Text>
          <Text style={styles.detailText}>Gastos</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    justifyContent: "center",
  },

  containerText: {
    position: "absolute",
    top: 40,
  },

  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },

  progressCircle: {
    width: 250,
    height: 250,
  },

  circleText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  detailItem: {
    flexDirection: "column",
    alignItems: "center",
  },

  detailText: {
    fontSize: 14,
  },

  dividerText: {
    fontSize: 14,
    color: "#909090",
  },
});

export default ProgressCircleChart;
