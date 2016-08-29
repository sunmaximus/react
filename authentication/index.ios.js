import React from 'react';
import {
  Text,
  View,
  MapView,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} from 'react-native';

var Main = require('./src/main');

AppRegistry.registerComponent('authentication', () => Main);
