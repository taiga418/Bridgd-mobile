var React = require('react-native');
var styles = require('../styles.js')
var { apiParams, searchURL } = require('../config.js')
var { AppRegistry, Text, View, TextInput, ListView, Image, TouchableHighlight, PropTypes } = React;


var QueueView = React.createClass({

  getInitialState: function(){
    return{
      queue: null,
      errors: []
    }
  },

  componentDidMount: function(){
    fetch('http:localhost:3000/queue')
    .then((data) => data.json())
    .then((response) => {
      this.setState({queue: response.queue.queue})
    }, err => {
      let errors = this.state.errors.push(err)
      this.setState({ error: errors})
    })
  },

  renderRow: function(item){
    return(
      <TouchableHighlight>
        <View>
          <Text>{item.snippet.title}</Text>
          <Text>id : {item.id.videoId}</Text> 
          <Image source={{uri:item.snippet.thumbnails.default.url}}
          style={{width: 100, height: 100}}/>
        </View>
      </TouchableHighlight>   
    )
  },


  render: function(){
    const{queue, errors} = this.state;
    if(errors.length >1){
      return(
        <View style={styles.container}>
          <Text>Errors</Text>
        </View>
      )
    }
    if(!queue){
      return(
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }else{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let dataSource =  ds.cloneWithRows(queue);
      return(
        <View style={styles.container}>
          <Text>Queue</Text>
          <ListView
            dataSource={dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}>
          </ListView>
        </View>
      )
    }
  
  }

})

AppRegistry.registerComponent('QueueView', () => QueueView);

module.exports = QueueView;
