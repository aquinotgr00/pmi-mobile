import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'

import { getCampaignListApi } from 'src/services/api'
import CampaignCard from 'src/screens/Campaign/CampaignCard'

class CampaignSearchResult extends Component {
  constructor (props) {
    super(props)
    this.state = {
      campaignType: undefined,
      fundraising: undefined,
      keywords: undefined,
      campaignList: [],
      loading: true
    }

    this.getCampaignList = this.getCampaignList.bind(this)
  }

  componentDidMount () {
    const { campaignType, fundraising, keywords } = this.props
    this.getCampaignList(campaignType, fundraising, keywords)
  }

  componentDidUpdate (prevProps) {
    const { campaignType: prevCampaignType, fundraising: prevFundraising, keywords: prevKeywords } = prevProps
    const { campaignType, fundraising, keywords } = this.props
    if ((prevCampaignType !== campaignType) || (prevFundraising !== fundraising) || (prevKeywords !== keywords)) {
      this.setState({ campaignList: [], loading: true })
      this.getCampaignList(campaignType, fundraising, keywords)
    }
  }

  async getCampaignList (campaignType, fundraising, keywords) {
    const campaignParams = new URLSearchParams()
    if (campaignType) {
      campaignParams.append('t', campaignType)
    }
    if (fundraising) {
      campaignParams.append('f', fundraising)
    }
    if (keywords) {
      campaignParams.append('s', keywords)
    }

    try {
      const response = await getCampaignListApi(campaignParams)
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        const { data: campaignList } = data
        this.setState({ campaignType, fundraising, keywords, campaignList, loading: false })
      } else {
        // TODO : handle error
        this.setState({ loading: false })
      }
    } catch (err) {
      console.log(err)
      // TODO : handle error
      this.setState({ loading: false })
    }
  }

  render () {
    return (
      <>
        {this.state.loading
          ? <ActivityIndicator />
          : <FlatList
            data={this.state.campaignList}
            ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={(item) =>
              <CampaignCard
                {...item}
                width={'100%'}
                key={item.index}
              />
            }
          />
        }
      </>
    )
  }
}

export default withNavigation(CampaignSearchResult)
