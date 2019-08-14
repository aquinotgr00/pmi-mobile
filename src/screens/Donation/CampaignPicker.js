import React, { Component } from 'react'
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
    this.getCampaigns()
  }

  getCampaigns () {
    this.setState({
      isLoading: false,
      campaigns: [
        { value: '1', label: 'satu' },
        { value: '2', label: 'dua' },
        { value: '3', label: 'tiga' },
        { value: '4', label: 'empat' }
      ]
    })
  }

  render () {
    return (
      <FormSelect
        placeholder='Donasi untuk ...'
        style={{ marginVertical: 15, width: undefined, borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
        options={this.state.campaigns}
        name='campaignId'
        enabled={this.props.enabled}
      />
    )
  }
}
