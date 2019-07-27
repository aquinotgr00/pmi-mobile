import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Card, CardItem, Left, Right } from 'native-base';
import { ProgressBar } from 'src/components'
import { CampaignCard } from './CampaignCard'

export { CampaignCard } from './CampaignCard'

export default class CampaignList extends Component {
	constructor (props) {
		super(props)

		this.state = {
			percentage: 20
		}

		this.navigateToDetailCampaign = this.navigateToDetailCampaign.bind(this)
		this.navigateToCampaignList = this.navigateToCampaignList.bind(this)
	}

	navigateToDetailCampaign() {
		this.props.navigation.navigate('Campaign')
	}
	navigateToCampaignList() {
		this.props.navigation.navigate('CampaignList', {title:this.props.title})
	}

	render () {
		return (
			<>
				<View style={{
					flex:1,
					flexDirection: 'row',
					marginBottom: 15,
				}}>
					<Text style={{width:'50%',fontWeight:'500',fontSize:17}}>{this.props.title}</Text>
					<TouchableOpacity
						onPress={this.navigateToCampaignList}
						style={{width:'50%',justifyContent:'center'}}
					>
						<Text style={{textAlign:'right',color:'red',fontSize:12,fontWeight:'500'}}>Lihat Semua</Text>
					</TouchableOpacity>
				</View>

				<FlatList
					data={this.props.data}
					style={{marginBottom:25,paddingBottom:10}}
					horizontal
					renderItem={(item) =>
						<CampaignCard
							{...item}
							width={245}
							link={this.navigateToDetailCampaign}
							percentage={this.state.percentage}
						/>
					}
				/>
			</>
		)
	}
}