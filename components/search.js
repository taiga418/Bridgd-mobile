
var React = require('react-native');
var Button = require('react-native-button');
//var SearchBar = reqire('react-native-search-bar')
var styles = require('../styles.js')
var { apiParams, searchURL, config } = require('../config.js')
var { AppRegistry, Text, View, TextInput, ListView, Image, TouchableHighlight } = React;

const searchString = searchURL;

var SearchView = React.createClass({
  //proptypes!!!
  
  getInitialState: function(){
    return {
      results: null,
      search: null
    }
  },

  search: function() {
    let text = this.state.search
    if(text){
      let query = '&q=' + encodeURIComponent(text);
      fetch(searchString + query).then(response => response.json())
        .then(responseData => this.setState({results: responseData.items}));
    }
  },

  onPress: function(video) {
    fetch(config.url + 'enqueue', {
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
        <View style={styles.results}>
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
      <View style={styles.searchContainer}>
        <Text style={styles.header}>Search Youtube for Videos</Text>
        <View style={styles.controlsContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({search: text})}/>
          <Button style={styles.button} onPress={this.search}>Search</Button>
        </View>
        {this.getResults()}
      </View>

    ); 
  }
});

AppRegistry.registerComponent('SearchView', () => SearchView);

module.exports = SearchView;
