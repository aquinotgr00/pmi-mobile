import React from 'react'
import { ProgressBar } from 'src/components'
import { Text, View, TouchableOpacity, FlatList, Animated, ScrollView, Dimensions } from 'react-native'
import { Card, CardItem, Thumbnail, Body, Container, Content } from 'native-base'
import HTML from 'react-native-render-html'
import { BackButton } from 'src/components/HeaderButtons'
import { getCampaignDetail } from 'src/services/api'
import { daysRemaining } from 'src/utils/'
import Modal from "react-native-modal"
import Config from 'react-native-config'

const Header_Maximum_Height = 200
const Header_Minimum_Height = Math.round(Dimensions.get('window').height * (1 / 9))

export default class CampaignScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      percentage: 0,
      days: 0,
      lineNumber: 9,
      showReadMore: false,
      readMoreText: 'Baca Selengkapnya',
      showAllDonationsText: false,
      donatorListModalVisible: false,
      id: this.props.navigation.state.params.id,
      image: '',
      title: '...',
      description: 'loading...',
      loading: true,
      amount_goal: 0,
      amount_real: 0,
      get_donations: [],
      finish_campaign: '',
      type_id: 0,
			modalVisible: false,
			fundraising: 1,
    }

    this.getDetailCampaign = this.getDetailCampaign.bind(this)
    this.toggleReadMoreBtn = this.toggleReadMoreBtn.bind(this)
		this.setModalVisible = this.setModalVisible.bind(this)
		this.navigateToDonationScreen = this.navigateToDonationScreen.bind(this)

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
    this.animatedBackColor = this.animatedHeight.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: ['white', 'black'],
      extrapolate: 'clamp'
    })
  }

  componentDidMount () {
    this.getDetailCampaign()
  }

  async getDetailCampaign () {
    try {
      const response = await getCampaignDetail(this.state.id)
      const { status } = response.data
      if(status==='success') {
        const { image, title, description, amount_goal, amount_real, get_donations, finish_campaign, type_id, fundraising } = response.data.data
        const days = daysRemaining(finish_campaign)
        const percentage = amount_real/amount_goal*100
        const loading = false
        const showAllDonationsText = get_donations.length > 4 ? true:false 
        this.setState({
          image, title, description, amount_goal, amount_real, get_donations, finish_campaign, type_id, fundraising, days, percentage, loading, showAllDonationsText
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  toggleReadMoreBtn = () => {
    if (this.state.lineNumber !== 999) {
      this.setState({ lineNumber: 999, readMoreText: 'Persingkat' })
    } else if (this.state.lineNumber === 999) {
      this.setState({ lineNumber: 9, readMoreText: 'Baca Selengkapnya' })
    }
  }

  setModalVisible(visible) {
    this.setState({donatorListModalVisible: visible});
	}
	
	navigateToDonationScreen () {
    const { id, fundraising, type_id } = this.state
    let routeName = 'InKindDonationForm'
    if (fundraising) {
      routeName = 'FundDonation'
    }
    this.props.navigation.navigate(routeName, { id, type_id })
  }

  render () {
    return (
      <>
        <Animated.View>
          <Animated.Image
            source={{ uri: Config.SERVER_URL + '/' + this.state.image }}
            style={{
			      width: 380,
			      height: this.animatedHeaderHeight,
			      opacity: this.animatedImageOpacity,
			      position: 'relative'
			    }}
			  />
          <TouchableOpacity
            onPress={() => { this.props.navigation.goBack() }}
            style={{
			      position: 'absolute',
			      top: Math.round(Dimensions.get('window').height * (1 / 24)),
			      left: 15
			    }}>
            <BackButton color={this.animatedBackColor} />
          </TouchableOpacity>
          <Animated.View style={{
            position: 'absolute',
            top: Math.round(Dimensions.get('window').height * (1 / 17)),
            left: 50,
            width: '100%',
            opacity: this.animatedTitleOpacity
          }}>
            <Animated.Text
              numberOfLines={1}
              style={{
                textAlign: 'left',
                fontSize: 16,
                width: '80%'
              }}
            >
              {this.state.title}
            </Animated.Text>
          </Animated.View>
        </Animated.View>

        <ScrollView
          scrollEventThrottle={14}
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
					{/* <Container> */}
            {/* <Content> */}
            <Text style={{ marginBottom: 10 }}>{this.state.title}</Text>

            <ProgressBar left={0} height={12} width={335} percentage={this.state.percentage} />

            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, color: 'grey' }}>Terkumpul</Text>
                <Text style={{ fontWeight: '500' }}>Rp. {this.state.amount_real ? this.state.amount_real : 0}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 11, color: 'grey' }}>Sisa Hari</Text>
                <Text style={{ fontWeight: '500' }}>{isNaN(this.state.days) ? '-':this.state.days}</Text>
              </View>
            </View>

            {/* {!this.state.loading && 
              // <Text
              //   numberOfLines={this.state.lineNumber}
              //   style={{ marginBottom: 20 }}
              //   onLayout={(ev) => { 
              //     if (this.state.lineNumber !== 999)
              //       this.setState({
              //         showReadMore: ev.nativeEvent.layout.height > 16*this.state.lineNumber ? true:false
              //       })
              //   }}
              // >
              // </Text>
            } */}
            <HTML
              baseFontStyle={{fontSize:17}}
              customWrapper={content => <View>{content}</View>}
              html={this.state.description}
            />

            {this.state.showReadMore &&
              <View style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: 'rgba(60, 58, 57, 0.15)',
                  marginBottom: 35,
                }}
              >
                <TouchableOpacity onPress={this.toggleReadMoreBtn}>
                  <Text style={{ textAlign: 'center', paddingVertical: 20, color: 'red', fontWeight: '500' }}>
                    {this.state.readMoreText}
                  </Text>
                </TouchableOpacity>
              </View>
            }

            <Text style={{fontWeight:'500',fontSize:16,marginVertical:15}}>List Donatur</Text>

            <FlatList
              style={{ marginBottom:this.state.showAllDonationsText ? 0:45 }}
              data={this.state.get_donations.slice(0, 4)}
              renderItem={({ item }) =>
                <Card transparent>
                  <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Thumbnail source={item.image === null ? require('assets/images/avatar-default.png'):{ uri: item.image }} />
                    <Body style={{ marginLeft: 20 }}>
                      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ flex: 1 }}>{item.name}</Text>
                        <Text style={{ flex: 1, textAlign: 'right', color: 'grey', fontSize: 11 }}>2:16 PM</Text>
                      </View>
                      <Text style={{ color: 'grey', fontSize: 11 }}>Jumlah Donasi</Text>
                      <Text note>Rp. {item.amount}</Text>
                    </Body>
                  </CardItem>
                </Card>
              }
            />

            {this.state.showAllDonationsText &&
              <View style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'rgba(60, 58, 57, 0.15)',
                marginBottom: 45
              }}>
                {/* <TouchableOpacity onPress={() => this.setModalVisible(true)}> */}
                <TouchableOpacity onPress={() => this.setState({modalVisible:true})}>
                  <Text style={{ textAlign: 'center', paddingVertical: 20, color: 'red', fontWeight: '500' }}>
                  Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>
            }

            <Modal
              isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setState({ modalVisible: false })}
              style={{width: '100%',marginHorizontal:0, marginBottom:0, marginTop:260}}
              swipeDirection='down'
              propagateSwipe={true}
            >
              <View style={{
                  bottom:0,
                  height:550,
                  // marginTop:200,
                  marginBottom:0,
                  paddingHorizontal: 15,
                  backgroundColor:'white',
                  shadowOffset: { width: 3, height: -5 },
                  shadowOpacity: .5,
                  shadowRadius: 8,
                  elevation: 1,
                }}
              >
                  <Text style={{fontWeight:'500',fontSize:16,marginVertical:15}}>List Donatur</Text>
                  <FlatList
                    data={this.state.get_donations}
                    renderItem={({ item }) =>
                      <Card transparent>
                        <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                          <Thumbnail source={item.image === null ? require('assets/images/avatar-default.png'):{ uri: item.image }} />
                          <Body style={{ marginLeft: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                              <Text style={{ flex: 1 }}>{item.name}</Text>
                              <Text style={{ flex: 1, textAlign: 'right', color: 'grey', fontSize: 11 }}>2:16 PM</Text>
                            </View>
                            <Text style={{ color: 'grey', fontSize: 11 }}>Jumlah Donasi</Text>
                            <Text note>Rp. {item.amount}</Text>
                          </Body>
                        </CardItem>
                      </Card>
                    }
                  />
              </View>
            </Modal>
            {/* </Content> */}
					{/* </Container> */}
        </ScrollView>

        <View style={{backgroundColor: 'white', bottom: 15}}>
          <TouchableOpacity
            onPress={this.navigateToDonationScreen}
            style={{
              backgroundColor:'red',
              borderRadius:60,
              paddingVertical:15,
              marginVertical:5,
              marginHorizontal: 15,
            }}
          >
            <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Berdonasi</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}
