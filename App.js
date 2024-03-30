import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const onAddTaskPress = async (task) => {
    const updatedItems = [
      ...taskItems,
      { text: task, isCompleted: false, isDeleted: false },
    ];
    if (task != "") {
      setTaskItems(updatedItems);
      saveTasks(updatedItems);
    }
  };
  const [taskItems, setTaskItems] = useState([]);

  const saveTasks = async (task) => {
    try {
      await AsyncStorage.setItem("ToDo", JSON.stringify(task));
    } catch (error) {
      console.log("Error fetching tasks from AsyncStorage: ", error);
    }
  };

  function checkCompleted(task) {
    return task.isCompleted;
  }

  function checkUncompleted(task) {
    return !task.isCompleted;
  }

  function checkUndeleted(task) {
    return !task.isDeleted;
  }

  const onTaskPress = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    const completedTasks = updatedTasks.filter(checkCompleted);
    const uncompletedTasks = updatedTasks.filter(checkUncompleted);
    const updatedTasks2 = [...uncompletedTasks, ...completedTasks];
    setTaskItems(updatedTasks2);
    saveTasks(updatedTasks2);
  };

  const onDeletePress = (index) => {
    const updatedItems = [...taskItems];
    updatedItems[index].isDeleted = !updatedItems[index].isDeleted;
    const undeletedItems = updatedItems.filter(checkUndeleted);
    setTaskItems(undeletedItems);
    saveTasks(undeletedItems);
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("ToDo");
        if (storedTasks != null) {
          setTaskItems(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.log("Error loading tasks from AsyncStorage: ", error);
      }
    };

    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <StatusBar style="auto" />
        <FlatList
          style={styles.items}
          data={taskItems}
          renderItem={({ item, index }) => (
            <Task
              key={index}
              text={item.text}
              onPress={() => onTaskPress(index)}
              onPress2={() => onDeletePress(index)}
              isCompleted={item.isCompleted}
              isDeleted={item.isDeleted}
            />
          )}
          keyExtractor={(_, i) => i}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addTaskContainer}
      >
        <AddTask onPress={onAddTaskPress} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
    alignItems: "left",
    justifyContent: "flex-start",
    borderWidth: 1,
  },
  taskWrapper: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 70,
    marginHorizontal: 20,
    marginBottom: 110,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  items: {
    marginTop: 32,
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});
