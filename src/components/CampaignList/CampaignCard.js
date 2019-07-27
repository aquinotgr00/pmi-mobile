import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { Card, CardItem, Left, Right } from 'native-base'
import { ProgressBar } from 'src/components/ProgressBar';

export const CampaignCard = (props) => {
	return (
		<Card style={{
			marginRight:15,
			marginLeft:0,
			borderRadius:5,
			shadowOffset: { width: 3, height: 10 },
			shadowOpacity: .05,
			shadowRadius: 8,
			elevation: 1,
			width: props.width,
		}}>
			<TouchableOpacity onPress={props.link}>
				<View style={{borderRadius:5}}>
					<Image
						source={{uri: 'https://via.placeholder.com/250x150'}}
						style={{
							width: '100%',
							height:150,
							borderTopRightRadius:5,
							borderTopLeftRadius:5
						}}
					/>
				</View>
				<CardItem>
					<Left style={{paddingHorizontal:10}}>
						<Text style={{fontWeight:'500',marginTop:5}}>{props.item.key}</Text>
					</Left>
				</CardItem>
				<View style={{marginHorizontal:25}}>
					<ProgressBar left={20} height={10} percentage={props.percentage} />
				</View>
				<CardItem>
					<Left style={{paddingHorizontal:10}}>
						<View style={{flex:1}}>
							<Text style={{fontSize:11,color:'grey'}}>Terkumpul</Text>
							<Text style={{fontWeight:'500'}}>Rp. 1000</Text>
						</View>
					</Left>
					<Right style={{paddingHorizontal:10}}>
						<Text style={{fontSize:11,color:'grey'}}>Sisa Hari</Text>
						<Text style={{fontWeight:'500'}}>-</Text>
					</Right>
				</CardItem>
				<CardItem style={{
					paddingTop: 0,
					borderBottomWidth:1,
					borderBottomColor:'black',
					marginHorizontal:20,
					opacity:.1
				}} />
				<TouchableOpacity style={{
					borderBottomLeftRadius:5,
					borderBottomRightRadius:5,
					paddingVertical:18
				}}>
					<Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>Berdonasi</Text>
				</TouchableOpacity>
			</TouchableOpacity>
		</Card>
	)
}