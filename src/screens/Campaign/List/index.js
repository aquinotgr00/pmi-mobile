import React from 'react'
import { IconInu, Screen } from 'src/components'
import { Text } from 'react-native'

export default class CampaignListScreen extends React.Component {
	static navigationOptions = {
		drawerLabel: 'List Campaign',
		drawerIcon: ({ tintColor }) => (
			<IconInu name='icon-pmi-donatur-regist' color={tintColor} />
		),
	}

	render () {
		return (
      <Screen title='List Campaign' back>
				<Text>Detail Campaign</Text>
			</Screen>
		)
	}
}