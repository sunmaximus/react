var formatTime = require('minutes-seconds-milliseconds');

// new syntax for 2015. Variable destructuring
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} from 'react-native';


// Create React Component
var StopWatch =  React.createClass({

  // run by React one time when the Component is created
  getInitialState: function(){
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },

  render: function(){
    return <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={styles.footer}>
        {this.laps()}
      </View>

    </View>
  },
  laps: function(){
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText} >
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton: function(){
    // New version of TouchableHighlight doesn't work unless you
    // provide a callback onPress
    //  If you use 'onPress={this.handleStartPress()}' it will immediately call
    //  the function the second that component is created.  You don't want to
    //  run the function right away, you want it to run only when the event
    //  occurs - that means we want to pass a *reference* to the function.
    //  You pass a reference to a function by not placing parens after it.

    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
            onPress={this.handleStartPress}
            underlayColor="gray"
            style={[styles.button, style ]}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
  },

  // This is a function that ran when the user pressed a button
  handleStartPress: function(){

    if(this.state.running){ //is the timer running?
      clearInterval(this.interval);
      this.setState({running:false});
      return   // Need to return so the rest of the code in this function won't
               // Keep on runnning
    }

    this.setState({startTime: new Date()});

    // var startTime = new Date();

    // setInterval is a native JavaScript function
    this.interval = setInterval(() => {

      // Never do!
      // this.state.timeElapsed = new Date();
      // Update our state with some new value
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
   }, 30);
  },

  lapButton: function(){
    return   <TouchableHighlight
              style={styles.button}
              underlayColor="gray"
              onPress={this.handleLapPress}>
               <Text>
                 Lap
               </Text>
             </TouchableHighlight>

  },
  handleLapPress: function(){
    var lap = this.state.timeElapsed;

    // Making the timer into 00:00:00  by getting the current time that will
    // update the timeElapsed that is being change in handleStartPress.
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },


  // border: function(color){
  //   return {
  //     borderColor: color,
  //     borderWidth: 4
  //   }
  // }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,  //Fill the entire screen
    alignItems: 'stretch'
  },
  header:{  //Yellow
    flex: 1
  },
  footer:{  //Blue
    flex: 1
  },
  timerWrapper:{  //Red
    flex: 5, // takes up 5/8ths of the available space
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper:{ //Green
    flex: 3, // takes up 5/10ths of the available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer:{
    fontSize: 60
  },
  button:{
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton:{
    borderColor: '#00CC00'
  },
  stopButton:{
    borderColor: '#CC0000'
  },
  lap:{
      justifyContent: 'space-around',
      flexDirection: 'row'
  },
  lapText:{
    fontSize: 30
  }

});


// --------------------------------------------------------------
// Show React Component on the screen
// AppRegistry.registerComponent('stopwatch', function(){
//   return StopWatch;
// });
//Using Es2015 syntax. Arrow syntax . The same as above
AppRegistry.registerComponent('stopwatch', () => StopWatch);
