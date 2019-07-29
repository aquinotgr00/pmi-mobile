import React from 'react'
import { Screen, CampaignCard } from 'src/components'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { getCampaignListApi } from 'src/services/api'

export default class CampaignListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '...',
      type: null,
      campaignList: [],
      loading: true
    }

    this.getCampaignList = this.getCampaignList.bind(this)
    this.navigateToCampaignDetail = this.navigateToCampaignDetail.bind(this)
    this.navigateToInputDonation = this.navigateToInputDonation.bind(this)
  }

  componentDidMount () {
    const { title, type } = this.props.navigation.state.params
    this.setState({ title, type })
    this.getCampaignList()
  }

  async getCampaignList () {
    const campaignParams = new URLSearchParams()
    campaignParams.append('t', this.props.navigation.state.params.type)
    try {
      const response = await getCampaignListApi(campaignParams)
      const { status } = response.data
      if(status==='success') {
        const { data } = response.data
        const { data:campaignList } = data
        this.setState({campaignList, loading: false})
      }
    } catch (err) {
      console.log(err)
    }
  }

  navigateToCampaignDetail (id) {
    this.props.navigation.navigate('Campaign', { id })
  }
	navigateToInputDonation(id) {
		this.props.navigation.navigate('FundDonation', {id})
	}

  render () {
    return (
      <Screen title={this.state.title} back>
        {this.state.loading
        ? <ActivityIndicator />
        :
          <FlatList
            data={this.state.campaignList}
            ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
            keyExtractor={(item, index) => item.id}
            renderItem={(item) =>
              <CampaignCard
                {...item}
                width={'100%'}
                key={item.index}
                link={this.navigateToCampaignDetail}
                linkForm={this.navigateToInputDonation}
              />
            }
          />
        }
      </Screen>
    )
  }
}
