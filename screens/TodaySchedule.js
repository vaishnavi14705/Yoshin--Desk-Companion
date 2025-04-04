import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const TodaySchedule = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim().length > 0) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        text: newTask,
        status: 'upcoming'
      }]);
      setNewTask('');
    }
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'upcoming' ? 'open' : 'upcoming'
        };
      }
      return task;
    }));
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity 
      style={[styles.taskItem, item.status === 'open' && styles.taskItemOpen]}
      onPress={() => toggleTaskStatus(item.id)}
    >
      <View style={styles.taskContent}>
        <Text style={styles.taskText}>{item.text}</Text>
        <Text style={styles.taskStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add new task"
          placeholderTextColor="#808080"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    color: '#FFFFFF',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#B4FF39',
    borderRadius: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#1E1E1E',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  taskItemOpen: {
    backgroundColor: '#3A3A3A',
  },
  taskContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  taskStatus: {
    color: '#B4FF39',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

export default TodaySchedule;