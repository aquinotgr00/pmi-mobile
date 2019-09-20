import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { Card, CardItem, Left, Right } from 'native-base'
import { ProgressBar } from 'src/components/ProgressBar'
import { daysRemaining } from 'src/utils'
import { withNavigation } from 'react-navigation'

class CampaignCard extends React.Component {
  constructor (props) {
    super(props)
    this.navigateToDetailScreen = this.navigateToDetailScreen.bind(this)
    this.navigateToDonationScreen = this.navigateToDonationScreen.bind(this)
  }

  navigateToDetailScreen () {
    const { id } = this.props.item
    this.props.navigation.navigate('Campaign', { id })
  }

  navigateToDonationScreen () {
    const { id, fundraising, type_id } = this.props.item
    let routeName = 'InKindDonationForm'
    if (fundraising) {
      routeName = 'FundDonation'
    }
    this.props.navigation.navigate(routeName, { id, type_id })
  }

  render () {
    const {
      image_url,
      title,
      amount_real,
      amount_goal,
      finish_campaign: finishCampaign
    } = this.props.item
    const days = daysRemaining(finishCampaign)
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
              source={{ uri: image_url }}
              style={{
                width: '100%',
                height: 150,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5
              }}
            />
          </View>
          <CardItem style={{ paddingBottom: 5 }}>
              <Text numberOfLines={2} style={{
                paddingHorizontal: 10,
                fontWeight: '500',
                lineHeight: 20,
                minHeight: 40,
              }}>{title}</Text>
          </CardItem>
          <View style={{ marginHorizontal: 25 }}>
            <ProgressBar left={20} height={10} percentage={amount_real / amount_goal * 100} />
          </View>
          <CardItem>
            <Left style={{ paddingHorizontal: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, color: 'grey' }}>Terkumpul</Text>
                <Text style={{ fontWeight: '500' }}>Rp. {amount_real || 0}</Text>
              </View>
            </Left>
            <Right style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 11, color: 'grey' }}>Sisa Hari</Text>
              <Text style={{ fontWeight: '500' }}>{isNaN(days) ? '-' : days}</Text>
            </Right>
          </CardItem>
          <CardItem style={{
            paddingTop: 0,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginHorizontal: 20,
            opacity: 0.1
          }} />
          <TouchableOpacity
            onPress={this.navigateToDonationScreen}
            style={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingVertical: 18,
            }}
          >
            <Text style={{ color: 'red', textAlign: 'center', fontWeight: '500' }}>Berdonasi</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Card>
    )
  }
}

export default withNavigation(CampaignCard)
