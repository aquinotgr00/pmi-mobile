import React, { Component } from 'react'
import { Icon, Input, Item } from 'native-base'
import { Screen } from 'src/components'
import CampaignSearchResult from './CampaignSearchResult'
import Color from 'src/constants/Color'

export default class CampaignSearchScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchKeyword: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (searchKeyword) {
    this.setState({ searchKeyword })
  }

  render () {
    return (
      <Screen back title={
        <Item>
          <Input
            placeholder='Cari'
            placeholderTextColor={Color.lightGray}
            onChangeText={this.handleSearch}
            value={this.state.searchKeyword}
          />
          <Icon name='search' style={{ color: Color.lightGray }} />
        </Item>}
      >
        <CampaignSearchResult
          keywords={this.state.searchKeyword}
        />
      </Screen>
    )
  }
}
