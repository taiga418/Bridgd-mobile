
var React = require('react-native');

window.navigator.userAgent = 'react-native';
var io = require('socket.io-client/socket.io');

var ScrollableTabView = require('react-native-scrollable-tab-view');

var { AppRegistry, Text, View, TextInput, ListView, Image, TouchableHighlight } = React;

var styles = require('./styles.js')
var { apiParams, searchURL, config } = require('./config.js')
var Search = require('./components/search');
var Queue = require('./components/queue');

const searchString = searchURL;

var BridgdMobile = React.createClass({

  getInitialState: function(){
    return{
      currentVideo: null,
      queue: null,
      errors: []
    }
  },

  componentWillMount: function(){
    this.socket = io('http://localhost:3000', {jsonp: false});
    this.socket.emit('joined');

    this.socket.on('queueUpdate', queue =>{
      console.log('updated queu')
      this.setState({queue: queue})
    })

    this.socket.on('newVideo', vid =>{
      this.setState({currentVideo: vid})
    })

  },

  componentDidMount: function(){
    fetch(config.url + 'queue')
    .then((data) => data.json())
    .then((response) => {
      this.setState({queue: response.queue.queue})
    }, err => {
      let errors = this.state.errors.push(err)
      this.setState({ error: errors})
    })
  },

  render: function() {
    const{currentVideo, queue, errors} = this.state;
    return (
      <ScrollableTabView>
        <Search tabLabel="Search"/>
        <Queue currentVideo={currentVideo} queue={queue} errors={errors} tabLabel="Queue"/>
      </ScrollableTabView>
    ); 
  }
});



AppRegistry.registerComponent('BridgdMobile', () => BridgdMobile);
