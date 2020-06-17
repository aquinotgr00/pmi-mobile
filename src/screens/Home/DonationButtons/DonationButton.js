import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

export default withNavigation(function DonationButton (props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => props.navigation.navigate(props.donationForm)}
    >
      <Image source={props.buttonImage} style={{ marginVertical: 5 }} />
      <Text style={{ marginVertical: 3 }}>{props.buttonText}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { height: 1, width: .2 },
    shadowRadius: 7
  }
})
