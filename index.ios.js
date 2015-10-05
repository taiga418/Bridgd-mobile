/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var React = require('react-native');
var request = new XMLHttpRequest();

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  Image,
  TouchableHighlight
} = React;

var apiParams = {
  key: 'AIzaSyA-2P-UjlhcwiMC4P6z0z9f-SU7s4FMIJQ',
  type: 'video',
  maxResults: '8',
  part: 'id,snippet',
  fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
}

var querystring = Object.keys(apiParams)
  .map(key => key + '=' + encodeURIComponent(apiParams[key]))
  .join('&');

const searchString = 'https://www.googleapis.com/youtube/v3/search?' + querystring;

var BridgdMobile = React.createClass({

  getInitialState: function(){
    return {
      results: null
    }
  },

  search: function(query) {
    if(query.length > 2){
      console.log(query)
      var qer = '&q=' + encodeURIComponent(query);
      var s = searchString
      s += qer
      fetch(s).then(response => response.json())
        .then(responseData => this.setState({results: responseData.items}));
    }
   
  },

  onPress: function(video) {
    //console.log(typeof video, video)
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
      console.log('her her ehere',this.state.results[0] )
      return(
        <ListView
         dataSource={dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}>
        </ListView>
      )
     
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
       <TextInput
          style={{height: 40, borderColor: "gray", borderWidth: 1}}
          onChangeText={(text) => this.search(text)}/>
        {this.getResults()}
      </View>
      
    ); 
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    borderWidth: 1, 
    borderColor: 'blue'
  }
});

AppRegistry.registerComponent('BridgdMobile', () => BridgdMobile);
