import React from 'react'
import { Screen, CampaignCard } from 'src/components'
import { View, FlatList } from 'react-native'
import Axios from 'axios'

export default class CampaignListScreen extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			title: '...',
			type: null,
			campaignList: [],
		}

		this.getCampaignList = this.getCampaignList.bind(this)
		this.navigateToCampaignDetail = this.navigateToCampaignDetail.bind(this)
	}

	componentDidMount() {
		const { title, type } = this.props.navigation.state.params
		this.setState({ title, type })
		this.getCampaignList()
	}

	getCampaignList() {
		Axios.get('http://test-donatur.test/api/app/campaigns?t='+this.props.navigation.state.params.type)
			.then(res => {
				const campaignList = res.data.data.data
				this.setState({ campaignList })
			})
	}

	navigateToCampaignDetail(id) {
		this.props.navigation.navigate('Campaign', {id})
	}

	render () {
		return (
      <Screen title={this.state.title} back>
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
							percentage={10}
						/>
					}
				/>
			</Screen>
		)
	}
}