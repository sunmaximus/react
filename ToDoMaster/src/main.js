import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage

} from 'react-native';

module.exports = React.createClass({

  getInitialState: function(){
    return ({
      tasks: ['take out the trash', 'get groceries', 'practice piano'],
      completedTasks: [],
      task: ''
    });
  },

  // Should be call when the state is changed.
  // Ideally, when new tasks or completed tasks is created.
  setStorage: function(){
    //JSON.stringify() will convert any array or object
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
  },

// Problem with AsyncStorage keep giving error with Null if AsyncStorage value
// is not saved properly.
// Lecture 18: Using Async Storage
//https://www.udemy.com/react-native-build-your-own-mobile-apps/learn/v4/t/lecture/5536200?start=30
// Initial Thread: "Cannot read property 'map' of null" by Yogie
// Solution:
// Richard
// Hi guys,
//
// I'm getting the same error.
// The reason it is happening is if you refresh the app without saving any to
// AsyncStorage, when you refresh you will setStorage, which will get null items
// that haven't been set. Then you will try to map over this null object,
// which will crash.
//
// All you need to do is return an empty array if AsyncStorage returns null:
//
// AsyncStorage.getItem('tasks')
//     .then((response) => {
//       if(response) return this.setState({tasks: JSON.parse(response)})
//       return []
//     })

  componentWillMount: function(){
    AsyncStorage.getItem('tasks')
      .then((response) => {
        if(response)
          return this.setState({tasks: JSON.parse(response)})
        return []
      });
    AsyncStorage.getItem('completedTasks')
      .then((response) => {
        if(response)
          return this.setState({completedTasks: JSON.parse(response)})
        return []
      });
  },

  // What ever you place in this function will be call whenever the state is
  // being updated. By doing this, you don't have to call this.setStorage() on
  // other methods that has the ability to change the state.
  // Since most react method are async, the problem become when the the state
  // is being update and storing the data at the same time. Look at
  // Lecture: 19. Grasping  Asynchrous JS and componentDidUpdate.
  componentDidUpdate: function(){
    this.setStorage();
  },

  renderList: function(tasks){
    return (
      tasks.map( (task, index) => {
        return (
          <View key={task} style={styles.task}>
            <Text>
              {task}
            </Text>
            <TouchableOpacity
              onPress={()=>this.completeTask(index)}
            >
              <Text>
                  &#10003;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  completeTask: function(index){
    console.log('complete task ', this.state.tasks[index]);
    let tasks = this.state.tasks;
    // The line below bassically combine from two new array without the element
    // that the user want to eliminate by using indexes.
    tasks = tasks.slice(0, index).concat(tasks.slice(index+1));

    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.concat([this.state.tasks[index]]);

    this.setState({
      tasks,
      completedTasks
    }); //ES16. Don't need to have a key and value if they
        // have the same name, just use 1 variable
  },

  renderCompleted: function(tasks){
    return (
      tasks.map((task, index) => {
        return (
          <View key={task} style={styles.task}>
            <Text style={styles.completed}>
              {task}
            </Text>
            <TouchableOpacity
              onPress={() => this.deleteTask(index)}
            >
              <Text>
                &#10005;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  deleteTask: function(index){
    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.slice(0, index).concat(completedTasks.slice(index+1));
    this.setState({completedTasks});

  },

  addTask: function(){
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({tasks: tasks});
    console.log('Am I adding?');

  },
  deleteAllCompleteTasks: function(){
    this.setState({completedTasks: []});
  },

  render: function(){
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          To-Do Master
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={ () => this.deleteAllCompleteTasks() }
        >
          <Text>
            Clear All Completed Tasks Button
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder='Add a task...'
          onChangeText={(text) => {
            this.setState({task: text});
          }}
          onEndEditing={()=>this.addTask()}
        />
        <ScrollView>
          {this.renderList(this.state.tasks)}
          {this.renderCompleted(this.state.completedTasks)}
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    margin: 30,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18
  },
  task: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    margin: 10
  },
  completed: {
    color: '#555',
    textDecorationLine: 'line-through'
  }

});
