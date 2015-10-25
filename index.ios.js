
var React = require('react-native');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var { AppRegistry, Text, View, TextInput, ListView, Image, TouchableHighlight } = React;

var styles = require('./styles.js')
var { apiParams, searchURL } = require('./config.js')
var Search = require('./components/search');
var Queue = require('./components/queue');

const searchString = searchURL;

var BridgdMobile = React.createClass({

  render: function() {
    return (
      <ScrollableTabView>
        <Search tabLabel="Search"/>
      
        <Queue tabLabel="Queue"/>
      </ScrollableTabView>
    ); 
  }
});



AppRegistry.registerComponent('BridgdMobile', () => BridgdMobile);
