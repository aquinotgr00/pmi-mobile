import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

class ImageHeader extends React.Component {
  render() {
    return (
      <Image
        source={{uri:'https://via.placeholder.com/350'}}
        style={StyleSheet.absoluteFill}
      />
    );
  }
}

export default ImageHeader