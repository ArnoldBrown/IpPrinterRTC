import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
// We are importing the native Java module here
import {NativeModules} from 'react-native';
var HelloWorld = NativeModules.PrinterModule;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipAddress: '',
      port: '',
      isLoading: false,
    };
  }

  // async function to call the Java native method
  sayHiFromJava() {
    // HelloWorld.sayHi(
    //   err => {
    //     console.log(err);
    //   },
    //   msg => {
    //     console.log(msg);
    //   },
    // );

    if (this.state.ipAddress.length > 0 && this.state.port.length > 0) {
      this.setState({isLoading:true})
      HelloWorld.printQR(
        this.state.ipAddress,
        this.state.port,
        'www.platinumcode.com',
        'TAB 123',
      );
    } else {
      this.setState({isLoading:false})
      Toast.showWithGravity(
        'Enter both Ip Address and Port Number',
        Toast.LONG,
        Toast.TOP,
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>IP Address</Text>

        <TextInput
          underlineColorAndroid="#000"
          keyboardType="decimal-pad"
          onChangeText={text => (this.state.ipAddress = text)}></TextInput>

        <Text style={{marginTop: 10}}>Port Number</Text>

        <TextInput
          underlineColorAndroid="#000"
          keyboardType="number-pad"
          onChangeText={text => (this.state.port = text)}></TextInput>

        <TouchableOpacity onPress={() => this.sayHiFromJava()}>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 40,
              backgroundColor: '#000',
              color: '#fff',
              paddingBottom: 10,
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            Print
          </Text>
        </TouchableOpacity>

        {this.state.isLoading ? (
          <ActivityIndicator size="large" color={'#000'} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#F5FCFF',
  },
});
