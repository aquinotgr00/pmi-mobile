import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native'
import { Card, CardItem, Left } from 'native-base'
import { withNavigation } from 'react-navigation'

class RsvpCard extends React.Component {
  constructor (props) {
    super(props)
    this.navigateToRsvpDetailScreen = this.navigateToRsvpDetailScreen.bind(this)
  }

  navigateToRsvpDetailScreen () {
    const { rsvpId } = this.props.item
    this.props.navigation.navigate('RsvpDetail', { rsvpId })
  }

  render () {
    const { title, image_url: uri } = this.props.item
    return (
      <Card
        style={[styles.card, { width: this.props.width }]}>
        <TouchableOpacity onPress={this.navigateToRsvpDetailScreen}>
          <View style={{ borderRadius: 5 }}>
            <Image source={{ uri }} style={styles.cardImage} />
          </View>
          <CardItem>
            <Left style={{ paddingHorizontal: 10 }}>
              <Text numberOfLines={2} style={{ fontWeight: '500', minHeight: 30, lineHeight: 20 }}>{title}</Text>
            </Left>
          </CardItem>
          <CardItem style={styles.cardItem} />
          <TouchableOpacity onPress={this.navigateToRsvpDetailScreen} style={styles.cardButton} >
            <Text style={styles.cardButtonText}>Baca Selengkapnya</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Card>
    )
  }
}

export default withNavigation(RsvpCard)

const styles = StyleSheet.create({
  card: {
    marginRight: 15,
    marginLeft: 0,
    borderRadius: 5,
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  cardItem: {
    paddingTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginHorizontal: 20,
    opacity: 0.1
  },
  cardButton: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 18
  },
  cardButtonText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: '500'
  }
})
