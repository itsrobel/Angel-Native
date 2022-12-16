// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.pink}>
//         Open up App.js to start working on your app!
//       </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// });

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState(null);
  const [text, setText] = useState("");

  const toggleRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") return;

    // this.setState({ isRecording: true });
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });

    if (isRecording) {
      // Stop recording
      const recording = await AudioRecorderPlayer.stopRecorder();
      setRecordingPath(recording.path);
      setIsRecording(false);
    } else {
      // Start recording
      const recording = await AudioRecorderPlayer.startRecorder();
      setRecordingPath(recording.path);
      setIsRecording(true);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ position: "absolute", top: 100, flexDirection: "row" }}>
        <TextInput
          keyboardAppearance="dark"
          style={{
            borderRadius: 10,
            fontSize: 24,
            height: 30,
            width: 300,
            backgroundColor: "white",
          }}
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Pressable onPress={toggleRecording}>
          <Icon name="microphone" size={32} color="#fff" />
        </Pressable>
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#282828",
    // alignItems: "center",
    // justifyContent: "center",
    textColor: "#fff",
  },
  pink: {
    color: "rgb(170, 132, 143)",
  },
});

export default App;
