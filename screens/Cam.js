import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Linking } from "react-native";
import { Header, Button } from "react-native-elements";
import "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Cam({ navigation }) {
  const [permission, setpermission] = useState(null);
  const [scan, setscan] = useState(true);
  const [data, setdata] = useState("nothing found .. ");
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setpermission(status === "granted");
    })();
  }, []);
  function pres() {
    setdata("nothing found .. ");
    setscan(true);
  }
  function scanner({ type, data }) {
    setscan(false);

    setdata(data);
  }
  function pressed() {
    Linking.openURL(data);
  }
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="black"
        centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
      />
      <TouchableWithoutFeedback onPress={pressed}>
        <Text style={data == "nothing found .. " ? styles.normal : styles.link}>
          {data}
        </Text>
      </TouchableWithoutFeedback>
      <Text style={styles.scanit}>Scan it</Text>
      <BarCodeScanner
        style={styles.cam}
        onBarCodeScanned={scan ? scanner : undefined}
      />
      <Button
        title="Rescan"
        onPress={pres}
        buttonStyle={styles.butto}
        titleStyle={styles.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  normal: {
    marginTop: 30,
    fontSize: 30,
    color: "black",
    marginBottom: 10,
  },
  scanit: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  link: {
    marginTop: 30,
    fontSize: 30,
    color: "darkblue",
    marginLeft: 15,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  butto: {
    marginTop: 30,
    alignItems: "center",
    borderRadius: 35,
    height: 60,
  },
  title: {
    padding: 40,
    fontSize: 15,
  },

  cam: {
    marginTop: 20,
    marginBottom: 5,
    width: "70%",
    height: "50%",
  },
});
