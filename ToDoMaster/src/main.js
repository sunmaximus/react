import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

module.exports = React.createClass({

  getInitialState: function(){
    return ({
      tasks: ['take out the trash', 'get groceries', 'practice piano'],
      task: ''
    });
  },

  renderList: function(tasks){
    return (
      tasks.map( (task) => {
        return (
          <View key={task} style={styles.task}>
            <Text>
              {task}
              Did it reload
            </Text>
          </View>
        )
      })
    )
  },
  addTask(){
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({tasks: tasks});
    console.log('Am I adding?');

  },
  render: function(){
    return (
        <View style={styles.container}>
          <Text style={styles.header}>
            To-do Master
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Add a task ...'
            onChangeText={(text) => {
                           this.setState({task: text});
                           console.log(this.state.task);
                         }}
            onEndEditing={ ()=>this.addTask() }
          />

          {this.renderList(this.state.tasks)}

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
  header: {
    margin: 30,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18
  },
  task: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    margin: 10
  }

});
