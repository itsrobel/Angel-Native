import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  VirtualizedList,
} from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState(null);
  const [text, setText] = useState("");
  const [items, setItems] = useState(["I", "Am", "King"]);
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };
  const getItem = (_, index) => {
    return items[index] || index;
  };
  const getItemCount = () => {
    return items.length;
  };
  const handleSubmit = () => {
    setItems([...items, text]);
  };
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
    <View style={styles.container}>
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
              // position: "absolute",
            }}
            value={text}
            onChangeText={(text) => setText(text)}
            returnKeyType="send"
            onSubmitEditing={(event) => handleSubmit(event.nativeEvent.text)}
          />
          <Pressable onPress={toggleRecording}>
            <Icon name="microphone" size={32} color="#fff" />
          </Pressable>
        </View>
      </ScrollView>
      {/* <View style={{ height: 30 }} /> */}
      <VirtualizedList
        data={items}
        // style={}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.toString()}
        getItem={getItem}
        getItemCount={getItemCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
