import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Color from 'src/constants/Color'

export default function DonationTypeButton (props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.isActive ? styles.buttonPressed : styles.buttonUnpressed]}
      onPress={() => props.onPress(props.buttonId)}
    >
      <Image source={props.buttonImage} style={{ marginVertical: 5 }} />
      <Text style={{ marginVertical: 3 }}>{props.buttonText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.5
  },
  buttonUnpressed: {
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5
  },
  buttonPressed: {
    borderWidth: 1,
    borderColor: Color.red,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 2
  }
})
