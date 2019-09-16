import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { Card, CardItem, Left } from 'native-base'
import { withNavigation } from 'react-navigation'

class RsvpCard extends React.Component {
  constructor (props) {
    super(props)
    this.navigateToRsvpDetailScreen = this.navigateToRsvpDetailScreen.bind(this)
  }

  navigateToRsvpDetailScreen () {
    this.props.navigation.navigate('RsvpDetail', { id, type_id })
  }

  render () {
    const { rsvpId, title, image_url:uri} = this.props.item
    return (
      <Card
        style={{
          marginRight: 15,
          marginLeft: 0,
          borderRadius: 5,
          shadowOffset: { width: 3, height: 10 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 1,
          width: this.props.width
        }}>
        <TouchableOpacity onPress={this.navigateToDetailScreen}>
          <View style={{ borderRadius: 5 }}>
            <Image
              source={{ uri }}
              style={{
                width: '100%',
                height: 100,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5
              }}
            />
          </View>
          <CardItem>
            <Left style={{ paddingHorizontal: 10 }}>
              <Text numberOfLines={2} style={{ fontWeight: '500', minHeight: 30, lineHeight: 20 }}>{title}</Text>
            </Left>
          </CardItem>
          <CardItem style={{
            paddingTop: 0,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginHorizontal: 20,
            opacity: 0.1
          }} />
          <TouchableOpacity
            onPress={this.navigateToRsvpDetailScreen}
            style={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingVertical: 18
            }}
          >
            <Text style={{ color: 'red', textAlign: 'center', fontWeight: '500' }}>Baca Selengkapnya</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Card>
    )
  }
}

export default withNavigation(RsvpCard)
