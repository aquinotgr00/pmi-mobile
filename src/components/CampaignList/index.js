import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { CampaignCard } from './CampaignCard'

export { CampaignCard } from './CampaignCard'

export default class CampaignList extends Component {
  constructor (props) {
    super(props)

    this.navigateToDetailCampaign = this.navigateToDetailCampaign.bind(this)
    this.navigateToCampaignList = this.navigateToCampaignList.bind(this)
    this.navigateToInputDonation = this.navigateToInputDonation.bind(this)
  }

  navigateToDetailCampaign (id) {
    this.props.navigation.navigate('Campaign', { id })
  }

  navigateToCampaignList () {
    const { title, type } = this.props
    this.props.navigation.navigate('CampaignList', { title, type })
  }

  navigateToInputDonation (id, fundraising) {
    let routeName = 'InKindDonationForm'
    if (fundraising) {
      routeName = 'FundDonation'
    }
    this.props.navigation.navigate(routeName, { id })
  }

  render () {
    return (
      <>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 15
        }}>
          <Text style={{ width: '50%', fontWeight: '500', fontSize: 17 }}>{this.props.title}</Text>
          <TouchableOpacity
            onPress={this.navigateToCampaignList}
            style={{ width: '50%', justifyContent: 'center' }}
          >
            <Text style={{ textAlign: 'right', color: 'red', fontSize: 12, fontWeight: '500' }}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.props.data}
          style={{ marginBottom: 25, paddingBottom: 10 }}
          horizontal
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={(item) =>
            <CampaignCard
              {...item}
              width={245}
              link={this.navigateToDetailCampaign}
              linkForm={this.navigateToInputDonation}
            />
          }
        />
      </>
    )
  }
}
