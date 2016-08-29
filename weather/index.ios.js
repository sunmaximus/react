import React from 'react';

import {
  Text,
  View,
  MapView,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} from 'react-native';

var Api = require('./src/api');

var Weather = React.createClass({
  getInitialState: function(){
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  },

  render: function(){

    return <View style={styles.container}>

      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.map}>
      </MapView>

      <View style={styles.textWrapper}>
        <Text style={styles.text}>{this.state.city}</Text>
        <Text style={styles.text}>{this.state.temperature}</Text>
        <Text style={styles.text}>{this.state.description}</Text>
      </View>

    </View>

  },

  // This Function is only called when user is interaction with the screen.
  // This function help re-rendering the pin on the map by update the State of
  // the Component.
  //Note: react-native onRegionChangeComplete vs onRegionChange
  //      onRegionChangeComplete help limit the API request. Best practice is to
  //      limit request.
  onRegionChangeComplete: function(region){
    //console.log(region);

    // Updating new pin location
    this.setState({
      pin:{
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});


AppRegistry.registerComponent('weather', () => Weather);
