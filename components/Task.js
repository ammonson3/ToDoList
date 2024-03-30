import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  const { text, isCompleted, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.square}>
          {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <Text
          style={[styles.itemText, isCompleted ? styles.completedText : null]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 16,
    width: 350,
    shadowRadius: 14,
    shadowOpacity: 0.1,
    shadowColor: "black",
    backgroundColor: "#FFF",
    borderRadius: 14,
  },
  itemText: {
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 17,
    color: "#000",
  },
  square: {
    width: 24,
    height: 24,
    opacity: 0.4,
    margin: 16,
    backgroundColor: "#8DDFDA",
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
    alignSelf: "center",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleted: {
    margin: 16,
    marginLeft: 175,
  },
});

export default Task;
