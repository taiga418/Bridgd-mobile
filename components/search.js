
var React = require('react-native');
var styles = require('../styles.js')
var { apiParams, searchURL } = require('../config.js')
var { AppRegistry, Text, View, TextInput, ListView, Image, TouchableHighlight } = React;

const searchString = searchURL;

var SearchView = React.createClass({
  //proptypes!!!
  
  getInitialState: function(){
    return {
      results: null
    }
  },

  search: function(search) {
    if(search.length > 2){
      var query = '&q=' + encodeURIComponent(search);
      fetch(searchString + query).then(response => response.json())
        .then(responseData => this.setState({results: responseData.items}));
    }
   
  },

  onPress: function(video) {
    fetch('http:localhost:3000/enqueue', {
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
      <TouchableHighlight onPress={() => this.onPress(item)}>
        <View>
          <Text>{item.snippet.title}</Text>
          <Text>id : {item.id.videoId}</Text> 
          <Image source={{uri:item.snippet.thumbnails.default.url}}
          style={{width: 100, height: 100}}/>
        </View>
      </TouchableHighlight>   
    )
  },

  getResults: function(){
    if(this.state.results){
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource =  ds.cloneWithRows(this.state.results);
      return(
        <View style={styles.container}>
          <ListView
           dataSource={dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}>
          </ListView>
        </View>

      )
     
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text>Search for songs</Text>
        <TextInput
          style={{height: 40, borderColor: "gray", borderWidth: 1}}
          onChangeText={(text) => this.search(text)}/>
        {this.getResults()}
      </View>
      
    ); 
  }
});

AppRegistry.registerComponent('SearchView', () => SearchView);

module.exports = SearchView;
