import React from 'react';
import {Text,View,TouchableOpacity, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import  {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();    
    this.state ={
        hasCameraPermissions: null,
        scanned:false,
        scannedData:'',
        buttonState:'Normal',
    }
}

getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermissions: status === 'granted' });
  };

  handleBarCodeScanned = async({type,data}) =>{
      this.setState({
        scanned:true,
        scannedData: data,
        buttonState:'Normal'
      })
  }


    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned ;
        const buttonState = this.state.buttonState;
        if (buttonState === 'Clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned = {scanned? undefined : this.handleBarCodeScanned}                
                style={StyleSheet.absoluteFillObject}/>

            );
            }
            else if(buttonState === 'Normal'){            
        return(
            <View style={styles.container}>
            <Text style={styles.displayText}>{
                hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
            }</Text>
    <TouchableOpacity 
    onPress ={this.getCameraPermissions}
     style={styles.scanButton}>
        <Text style={styles.buttonText}>Scan QR Code</Text>
    </TouchableOpacity>
             </View>
        );
    }
}
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        flex:1,
        alignItems:'center',
    },
    displayText:{
        fontSize:20,
        textDecorationLine:"underline",
    },
    scanButton:{
        backgroundColor:'#2196F3',
        padding:10,
        margin:10,
    },
    buttonText:{
        fontSize:20
    }
})
