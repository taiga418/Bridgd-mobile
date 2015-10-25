let { StyleSheet } = require('react-native');

var st = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    //position: "absolute",
    fontSize: 20,
    textAlign: 'center',
   // top: 10,
  },
  button: {
    borderWidth: 1, 
    borderColor: 'gray',
    height: 40,
  },
  textInput: {
    height: 40,
    borderColor: "gray", 
    borderWidth: 1
  }
});

module.exports = st;