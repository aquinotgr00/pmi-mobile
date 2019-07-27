import React from 'react'
import { Screen, CampaignCard } from 'src/components'
import { View, FlatList } from 'react-native'

export default class CampaignListScreen extends React.Component {
	constructor (props) {
		super(props)
		const { navigation } = this.props
		this.state = {
			title: navigation.getParam('title'),
			data: [
				{key:'a'},
				{key:'b'},
				{key:'c'},
				{key:'d'},
			]
		}

		this.navigateToCampaignDetail = this.navigateToCampaignDetail.bind(this)
	}

	navigateToCampaignDetail() {
		this.props.navigation.navigate('Campaign')
	}

	render () {
		return (
      <Screen title={this.state.title} back>
				<FlatList
					data={this.state.data}
					ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
					renderItem={(item) =>
						<CampaignCard
							{...item}
							width={'100%'}
							link={this.navigateToCampaignDetail}
							percentage={10}
						/>
					}
				/>
			</Screen>
		)
	}
}