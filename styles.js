let { StyleSheet } = require('react-native');

var st = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',

  },

  container: {
    flex: 1,
     justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },

  button: {
    borderWidth: 1, 
    borderColor: 'gray',
    height: 40,
  },

  textInput: {
    flex: 2,
    height: 40,
    borderColor: "gray", 
    borderWidth: 1
  },

  controlsContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  searchContainer: { 
    flex: 1,
  },

  results: {
    // justifyContent: 'space-between',
     flex: 10,
     flexDirection: 'row'
  }

});

module.exports = st;