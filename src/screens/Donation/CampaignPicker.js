import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { getCampaignListApi } from 'src/services/api'
import { FormSelect } from 'src/components/FormSelect'
import Color from 'src/constants/Color'

export default class CampaignPicker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      campaigns: []
    }

    this.getCampaigns = this.getCampaigns.bind(this)
  }

  componentDidMount () {
    this.getCampaigns(this.props.fundraising)
  }

  async getCampaigns (fundraisingOnly) {
		const campaignParams = new URLSearchParams()
		campaignParams.append('f', fundraisingOnly ? 1 : 0)
		if (this.props.type !== undefined) {
			campaignParams.append('t', this.props.type)
		}
    try {
      const response = await getCampaignListApi(campaignParams)
      const { status } = response.data
      if (status === 'success') {
				const { data: campaigns } = response.data
        this.setState({
          isLoading: false,
          campaigns: campaigns.map(campaign => ({ value: campaign.id, label: campaign.formatted_title }))
        })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO: handle error
      this.setState({ isLoading: false })
    }
  }

  render () {
    return (
      <View>

        <FormSelect
          placeholder='Disumbangkan untuk ...'
          style={{ marginVertical: 15, width: undefined, borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
          options={this.state.campaigns}
          name='campaign_id'
          enabled={this.props.enabled && !this.state.isLoading}
        />
        {this.state.isLoading && <ActivityIndicator size='small' color={Color.red} style={style.absoluteCenter} />}

      </View>
    )
  }
}

const style = StyleSheet.create({
  absoluteCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
