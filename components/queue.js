var React = require('react-native');
var styles = require('../styles.js')
var { apiParams, searchURL, config } = require('../config.js')
var { AppRegistry, Text, View, TextInput, ListView, Image, TouchableHighlight, PropTypes } = React;


var QueueView = React.createClass({

  // componentDidMount: function(){
  //  //
  // },

  onPressHandler: function(video){
    fetch(config.url + 'load', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(video)
    })
  },

  renderRow: function(item){
    return(
      <TouchableHighlight onPress={this.onPressHandler.bind(null, item)}>
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
    const {currentVideo, queue,errors} = this.props;
    let title;
    if(currentVideo){
      title = currentVideo.snippet.title
      console.log(currentVideo.snippet.title)
    }
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
          <Text>Current: {title}</Text>
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
