import React from 'react';
import {Text,View} from 'react-native';

export default class SearchScreen extends React.Component{
    render(){
        return(
<View style={{justifyContent:'center',alignItems:'center',flex:1}}>
    <Text>Search for books</Text>
</View>
        );
    }
}