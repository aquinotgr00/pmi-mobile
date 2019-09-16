import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import CampaignCard from 'src/screens/Campaign/CampaignCard'
import { cancellableRequest, getCampaignListApi } from 'src/services/api'
import { withNavigation } from 'react-navigation'
import axios from 'axios'
import HorizontalScroller from './HorizontalScroller'

class RecentCampaigns extends Component {
  constructor (props) {
    super(props)

    this.source = undefined
    this.state = {
      isLoading: true,
      campaigns: [],
      error: null
    }

    this.navigateToCampaignList = this.navigateToCampaignList.bind(this)
  }

  componentDidMount () {
    this.getCampaignList(this.props.campaignType)
  }

  componentDidUpdate (prevProps) {
    const { campaignType: prevCampaignType, lastUpdate: prevLastUpdate } = prevProps
    const { campaignType, lastUpdate } = this.props
    if ((prevCampaignType !== campaignType) || (prevLastUpdate !== lastUpdate)) {
      this.setState({ isLoading: true, campaigns: [], error: null })
      this.getCampaignList(campaignType)
    }
  }

  async getCampaignList (campaignType) {
    const campaignParams = new URLSearchParams()
    campaignParams.append('t', campaignType)
    campaignParams.append('page', 1)
    this.setState({ isLoading: true, campaigns: [], error: null })
    try {
      this.source && this.source.cancel()
      this.source = cancellableRequest()
      const response = await getCampaignListApi(campaignParams, this.source.token)
      const { status } = response.data

      if (status === 'success') {
        const { data } = response.data
        const { data: campaigns } = data
        this.setState({ isLoading: false, campaigns })
      } else {
        // TODO: handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        // TODO: handle error
        this.setState({ isLoading: false, error })
      }
    }
  }

  navigateToCampaignList () {
    const { title, campaignType } = this.props
    this.props.navigation.navigate('CampaignList', { title, campaignType })
  }

  render () {
    return (
      <HorizontalScroller
        title={this.props.title}
        onShowMore={this.navigateToCampaignList}
        isLoading={this.state.isLoading}
        data={this.state.campaigns.slice(0, this.props.numberOfCampaigns)}
        renderItem={ (item) => <CampaignCard {...item} width={245} /> }
      />
    )
  }
}

export default withNavigation(RecentCampaigns)
