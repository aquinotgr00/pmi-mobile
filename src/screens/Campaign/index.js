import React from 'react'
import { ProgressBar } from 'src/components'
import { Text, View, TouchableOpacity, FlatList, Animated, ScrollView, Dimensions } from 'react-native'
import { Card, CardItem, Thumbnail, Body } from 'native-base';
export { CampaignListScreen } from './List'
import { BackButton } from 'src/components/HeaderButtons'

const Header_Maximum_Height = 200
const Header_Minimum_Height = Math.round(Dimensions.get('window').height*(1/9))

export default class CampaignScreen extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			percentage: 80,
			lineNumber: 9,
			data: [
				{key:'a'},
				{key:'b'},
				{key:'c'},
				{key:'d'},
				{key:'e'},
				{key:'f'},
				{key:'g'},
			],
		}

		this.animatedHeight = new Animated.Value(0)
		this.animatedHeaderHeight = this.animatedHeight.interpolate({
			inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
			outputRange: [Header_Maximum_Height, Header_Minimum_Height],
			extrapolate: 'clamp'
		})
		this.animatedImageOpacity = this.animatedHeight.interpolate({
			inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
			outputRange: [1, 0],
			extrapolate: 'clamp'
		})
		this.animatedTitleOpacity = this.animatedHeight.interpolate({
			inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
			outputRange: [0, 1],
			extrapolate: 'clamp'
		})
	}

	render () {
		return (
			<>
			<Animated.View>
				<Animated.Image
					source={{uri: 'https://via.placeholder.com/380x200'}}
					style={{
						width:380,
						height:this.animatedHeaderHeight,
						opacity:this.animatedImageOpacity,
						position: 'relative'
					}}
				/>
				<TouchableOpacity
				onPress={() => { this.props.navigation.goBack()}}
				style={{
					position:'absolute',
					top: Math.round(Dimensions.get('window').height*(1/22)),
					left: 15,
				}}>
					<BackButton />
				</TouchableOpacity>
				<Animated.View style={{
					position:'absolute',
					top: '55%',
					left: 0,
					width: '100%',
					opacity: this.animatedTitleOpacity
				}}>
					<Animated.Text numberOfLines={1} style={{textAlign:'center',fontSize:16}}>
						title
					</Animated.Text>
				</Animated.View>
			</Animated.View>
			<ScrollView
				scrollEventThrottle={16}
				style={{ padding: 20 }}
				onScroll={Animated.event([
					{
						nativeEvent: {
							contentOffset: {
								y: this.animatedHeight
							}
						}
					}
				])}
			>
				<Text style={{marginBottom:10}}>Judul</Text>

				<ProgressBar left={0} height={12} width={335} percentage={this.state.percentage} />

				<View style={{flex:1,flexDirection:'row',marginTop:10,marginBottom:20}}>
					<View style={{flex:1}}>
						<Text style={{marginBottom:5,fontSize:11,color:'grey'}}>Terkumpul</Text>
						<Text style={{fontWeight:'500'}}>Rp. 1000</Text>
					</View>
					<View style={{flex:1,alignItems:'flex-end'}}>
						<Text style={{marginBottom:5,fontSize:11,color:'grey'}}>Sisa Hari</Text>
						<Text style={{fontWeight:'500'}}>-</Text>
					</View>
				</View>

				<Text numberOfLines={this.state.lineNumber} style={{marginBottom:20}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus ut faucibus pulvinar elementum integer enim neque. Nulla pellentesque dignissim enim sit amet venenatis urna. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Curabitur vitae nunc sed velit dignissim. Nunc id cursus metus aliquam eleifend. Vitae et leo duis ut diam quam nulla. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Egestas tellus rutrum tellus pellentesque. Tortor consequat id porta nibh venenatis cras sed felis eget. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh sit amet commodo nulla facilisi nullam vehicula. Nulla facilisi etiam dignissim diam quis.

					Elit ut aliquam purus sit amet luctus venenatis lectus. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Faucibus ornare suspendisse sed nisi lacus sed. Pharetra vel turpis nunc eget lorem dolor. Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum. Nunc faucibus a pellentesque sit amet porttitor eget. Vehicula ipsum a arcu cursus vitae. Pharetra sit amet aliquam id diam. Tortor consequat id porta nibh venenatis. Varius vel pharetra vel turpis nunc eget lorem. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Pellentesque sit amet porttitor eget dolor morbi non arcu.
				</Text>

				<View style={{
					borderTopWidth:1,
					borderBottomWidth:1,
					borderColor:'rgba(60, 58, 57, 0.15)',
					marginBottom:35
				}}>
					<Text style={{textAlign:'center',paddingVertical:20,color:'red',fontWeight:'500'}}>
						Baca Selengkapnya
					</Text>
				</View>

				<Text style={{fontWeight:'500',fontSize:16,marginBottom:15}}>List Donatur</Text>
				<TouchableOpacity style={{backgroundColor:'red',borderRadius:60,paddingVertical:15,marginBottom:10}}>
					<Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Berdonasi</Text>
				</TouchableOpacity>

				<FlatList
					data={this.state.data.slice(0,3)}
					renderItem={({item}) =>
					<Card transparent>
						<CardItem style={{paddingLeft:0,paddingRight:0}}>
                <Thumbnail source={{uri: 'https://via.placeholder.com/50'}} />
                <Body style={{marginLeft:20}}>
									<View style={{flex:1,flexDirection:'row',marginBottom:10}}>
										<Text style={{flex:1}}>Donatur 1</Text>
										<Text style={{flex:1,textAlign:'right',color:'grey',fontSize:11}}>2:16 PM</Text>
									</View>
                  <Text style={{color:'grey',fontSize:11}}>Jumlah Donasi</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
            </CardItem>
					</Card>
					}
				/>

				<View style={{
					borderTopWidth:1,
					borderBottomWidth:1,
					borderColor:'rgba(60, 58, 57, 0.15)',
					marginBottom:35
				}}>
					<Text style={{textAlign:'center',paddingVertical:20,color:'red',fontWeight:'500'}}>
						Lihat Semua
					</Text>
				</View>
			</ScrollView>
			</>
		)
	}
}