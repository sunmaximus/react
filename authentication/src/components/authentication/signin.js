import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput
} from 'react-native';

var Button = require('../common/button');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      username: '',
      password: ''

    };
  },

  render: function(){
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>

        <Text style={styles.lable}>Username:</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          />

        <Text style={styles.lable}>Password:</Text>
        <TextInput
         secureTextEntry={true}
         style={styles.input}
         value={this.state.password}
         onChangeText={(text) => this.setState({password: text})}
         />

        <Button text={'Sign In' } onPress={this.onPress}/>
      </View>
    );
  },

  // Use Parse for authentication
  onPress: function(){
    // Log the user
    // this.setState({
    //   password: ''
    // });
  }

});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  lable: {
    fontSize: 18
  }
});
