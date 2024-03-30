import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

const AddTask = ({ onPress }) => {
  const [task, setTask] = useState("");
  const handleAddTask = () => {
    onPress(task);
    setTask("");
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a new task"
        onChangeText={setTask}
        value={task}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    fontSize: 17,
    borderRadius: 14,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 17,
    color: "#558CFE",
    fontWeight: "bold",
  },
});

export default AddTask;
