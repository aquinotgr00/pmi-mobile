import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import CampaignCard from 'src/screens/Campaign/CampaignCard'
import { getCampaignListApi } from 'src/services/api'
import { withNavigation } from 'react-navigation'

class RecentCampaigns extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      campaigns: [],
      error: null
    }

    this.navigateToCampaignList = this.navigateToCampaignList.bind(this)
  }

  componentDidMount () {
    const { campaignType, donationType } = this.props
    this.getCampaignList(campaignType, donationType)
  }

  componentDidUpdate (prevProps) {
    const { campaignType: prevCampaignType, donationType: prevDonationType } = prevProps
    const { campaignType, donationType } = this.props
    if ((prevCampaignType !== campaignType) || (prevDonationType !== donationType)) {
      this.setState({ isLoading: true, campaigns: [], error: null })
      this.getCampaignList(campaignType, donationType)
    }
    console.log(this.props.campaignType, this.props.donationType)
  }

  async getCampaignList (campaignType, fundraising) {
    const campaignParams = new URLSearchParams()
    campaignParams.append('t', campaignType)
    if (fundraising !== undefined) {
      campaignParams.append('f', fundraising)
    }
    this.setState({ isLoading: true, campaigns: [], error: null })
    try {
      const response = await getCampaignListApi(campaignParams)
      const { status } = response.data

      if (status === 'success') {
        const { data } = response.data
        const { data: campaigns } = data
        this.setState({ isLoading: false, campaigns })
      } else {
        // TODO: handle error
      }
    } catch (error) {
      this.setState({ isLoading: false, error })
      // TODO: handle error
    }
  }

  navigateToCampaignList () {
    const { title, campaignType } = this.props
    this.props.navigation.navigate('CampaignList', { title, campaignType })
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
        {this.state.isLoading
          ? <View style={{ height: '10%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
          : <FlatList
            horizontal
            data={this.state.campaigns.slice(0, this.props.numberOfCampaigns)}
            style={{ marginBottom: 25, paddingBottom: 10 }}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={(item) =>
              <CampaignCard
                {...item}
                width={245}
              />
            }
          />
        }
      </>
    )
  }
}

export default withNavigation(RecentCampaigns)
