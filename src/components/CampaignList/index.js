import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Card, CardItem, Left, Right } from 'native-base';
import { ProgressBar } from 'src/components'

export default class CampaignList extends Component {
	constructor (props) {
		super(props)

		this.state = {
			percentage: 50
		}

		this.navigateToDetailCampaign = this.navigateToDetailCampaign.bind(this)
	}

	navigateToDetailCampaign() {
		this.props.navigation.navigate('Campaign')
	}
	navigateToCampaignList() {
		this.props.navigation.navigate('CampaignList')
	}

	render () {
		return (
			<>
				<View style={{
					flex:1,
					flexDirection: 'row',
					marginBottom: 15,
				}}>
					<Text style={{width:'50%',fontWeight:'500'}}>{this.props.title}</Text>
					<TouchableOpacity onPress={this.navigateToDetailCampaign} style={{width:'50%'}}>
						<Text style={{textAlign:'right',color:'red',fontSize:12}}>Lihat Semua</Text>
					</TouchableOpacity>
				</View>

				<FlatList
					data={this.props.data}
					style={{marginBottom:25,paddingBottom:10}}
					horizontal
					renderItem={({item}) =>
						<Card style={{
							marginRight:15,
							marginLeft:0,
							borderRadius:5,
							shadowOffset: { width: 3, height: 10 },
							shadowOpacity: .05,
							shadowRadius: 8,
							elevation: 1,
						}}>
							<TouchableOpacity onPress={this.navigateToDetailCampaign}>
							<View style={{borderRadius:5}}>
								<Image
									source={{uri: 'https://via.placeholder.com/250x150'}}
									style={{width:245,height:150,borderTopRightRadius:5,borderTopLeftRadius:5}}
								/>
							</View>
							<CardItem>
								<Left>
									<Text style={{fontWeight:'500',marginTop:5}}>{item.key}</Text>
								</Left>
							</CardItem>
							<ProgressBar left={20} height={10} width={205} percentage={this.state.percentage} />
							<CardItem>
								<Left>
									<View style={{flex:1,marginLeft:10}}>
										<Text style={{marginBottom:5,fontSize:11,color:'grey'}}>Terkumpul</Text>
										<Text style={{fontWeight:'500'}}>Rp. 1000</Text>
									</View>
								</Left>
								<Right>
									<Text style={{marginRight:10,marginBottom:5,fontSize:11,color:'grey'}}>Sisa Hari</Text>
									<Text style={{marginRight:10,fontWeight:'500'}}>-</Text>
								</Right>
							</CardItem>
							<CardItem style={{
								borderBottomWidth:1,
								borderBottomColor:'black',
								marginHorizontal:20,
								opacity:.1
							}} />
							<TouchableOpacity style={{
								borderBottomLeftRadius:5,
								borderBottomRightRadius:5,
								paddingVertical:15
							}}>
								<Text style={{color:'red',textAlign:'center'}}>Berdonasi</Text>
							</TouchableOpacity>
							</TouchableOpacity>
						</Card>
					}
				/>
			</>
		)
	}
}