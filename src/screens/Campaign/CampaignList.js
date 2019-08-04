import React from 'react'
import { Screen } from 'src/components'
import CampaignSearchResult from './CampaignSearchResult'

export default class CampaignList extends React.Component {
  render () {
    return (
      <Screen title={this.props.navigation.getParam('title')} back>
        <CampaignSearchResult
          campaignType={this.props.navigation.getParam('campaignType')}
        />
      </Screen>
    )
  }
}
