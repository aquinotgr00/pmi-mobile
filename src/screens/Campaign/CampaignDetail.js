import React from 'react'
import { Loader, ProgressBar, RedButton } from 'src/components'
import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card, CardItem, Thumbnail, Body, Container } from 'native-base'
import { BackButton } from 'src/components/HeaderButtons'
import { getCampaignDetail, getDonatorsByCampaignApi } from 'src/services/api'
import { daysRemaining } from 'src/utils/'
import Modal from "react-native-modal"
import moment from 'moment'
import 'moment/min/locales'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { formatCurrency } from 'src/utils'
import Image from 'src/constants/Image'
import Color from 'src/constants/Color'

const { height, width } = Dimensions.get('window')
const Header_Maximum_Height = 200
const Header_Minimum_Height = Math.round(height * (1 / 9))

const range = {
  headerHeight:[Header_Maximum_Height, Header_Minimum_Height],
  fadeIn:[0, 1],
  fadeOut:[1,0],
  fadeToBlack:['white','black']
}

const deltaHeaderHeight = Header_Maximum_Height-Header_Minimum_Height
const extrapolation = {inputRange: [0, deltaHeaderHeight], extrapolate: 'clamp'}

export default class CampaignScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      percentage: 0,
      days: 0,
      lineNumber: 9,
      showAllDonationsText: false,
      donatorListModalVisible: false,
      id: this.props.navigation.state.params.id,
      image_url: '',
      title: '...',
      description: 'loading...',
      loading: true,
      amount_goal: 0,
      amount_real: 0,
      get_donations: [],
      donators: [],
      finish_campaign: '',
      type_id: 0,
			modalVisible: false,
      fundraising: 1,
      modalPage: 1,
      modalLastPage: 999,
      webviewWidth: 0,
    }

    this.getDetailCampaign = this.getDetailCampaign.bind(this)
		this.setModalVisible = this.setModalVisible.bind(this)
    this.navigateToDonationScreen = this.navigateToDonationScreen.bind(this)
    this.fetchDonators = this.fetchDonators.bind(this)
    this.renderDonatorList = this.renderDonatorList.bind(this)

    this.animatedHeight = new Animated.Value(0)
  }

  componentDidMount () {
    this.getDetailCampaign()
    moment.locale('id', {
      calendar : {
        lastDay : '[Kemarin]',
        sameDay : 'LT',
        sameElse : 'L'
      }
    })
  }

  async getDetailCampaign () {
    try {
      const response = await getCampaignDetail(this.state.id)
      const { status } = response.data
      if(status==='success') {
        const { image_url, title, description, amount_goal, amount_real, get_donations, finish_campaign, type_id, fundraising } = response.data.data
        const days = daysRemaining(finish_campaign)
        const percentage = amount_real/amount_goal*100
        const loading = false
        const showAllDonationsText = get_donations.length > 4 ? true:false 
        this.setState({
          image_url, title, description, amount_goal, amount_real, get_donations, finish_campaign, type_id, fundraising, days, percentage, loading, showAllDonationsText
        })
      }
    } catch (err) {
      console.log(err)
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

  async fetchDonators () {
    if (this.state.modalPage < this.state.modalLastPage) {
      try {
        const response = await getDonatorsByCampaignApi(this.state.id, this.state.modalPage)
        const { status } = response.data
        if (status === 'success') {
          const { data, last_page } = response.data.data
          this.setState(prevState => ({
            modalPage: prevState.modalPage+1,
            donators: [...prevState.donators, ...data],
            modalLastPage: last_page
          }))
        }
      } catch (err) {
        console.log(err.response)
      }
    }
  }

  renderDonatorList = item => {
    return (
      <Card transparent>
        <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Thumbnail source={(item.anonym || item.guest === 1 || item.donator.image === null)
            ? Image.DefaultAvatar
            : { uri: item.donator.image_url }}
          />
          <Body style={{ marginLeft: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 1 }}>{item.anonym ? 'Anonim':item.name}</Text>
              <Text style={{ flex: 1, textAlign: 'right', color: 'grey', fontSize: 11 }}>{moment(item.created_at).calendar()}</Text>
            </View>
            {this.state.fundraising === 1 && (
              <>
                <Text style={{ color: 'grey', fontSize: 11 }}>Jumlah Donasi</Text>
                <Text note>{formatCurrency(item.amount)}</Text>
              </>
            )}
          </Body>
        </CardItem>
      </Card>
    )
  }

  render () {
    const { fundraising } = this.state
    return (
      <>
        <Loader loading={this.state.loading} />
        <Animated.View>
          <Animated.Image
            source={{ uri: this.state.image_url }}
            style={{
              width,
              position: 'relative',
              height: this.animate(range.headerHeight),
              opacity: this.animate(range.fadeOut)
            }}
          />
          { this.state.image_url !=='' && 
            <View style={styles.backButtonWrapper}>
              <BackButton color={this.animate(range.fadeToBlack)} shadow />
            </View>
          }
          <Animated.View style={[styles.animatedTitleWrapper,{opacity:this.animate(range.fadeIn)}]}>
            <Animated.Text numberOfLines={1} style={styles.animatedTitle} >
              {this.state.title}
            </Animated.Text>
          </Animated.View>
        </Animated.View>

        <ScrollView
          scrollEventThrottle={8}
          style={{ padding: 20 }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.animatedHeight } } },
          ])}
        >
					<Container style={{height:'100%', minHeight: 665}}>
            <Text style={{ marginBottom: 10 }}>{this.state.title}</Text>

            {fundraising === 1 &&
              <ProgressBar left={0} height={12} width={335} percentage={this.state.percentage} />
            }

            <View style={styles.donationProgress}
              onLayout={event => {
                this.setState({ webviewWidth: event.nativeEvent.layout.width });
              }}
            >
              {fundraising === 1 &&
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Terkumpul</Text>
                  <Text style={styles.bold}>{this.state.amount_real ? formatCurrency(this.state.amount_real) : 0}</Text>
                </View>
              }
              <View style={{ flex: 1, alignItems: fundraising === 1 ? 'flex-end':'' }}>
                <Text style={styles.label}>Sisa Hari</Text>
                <Text style={styles.bold}>{isNaN(this.state.days) ? '-':this.state.days}</Text>
              </View>
            </View>

            <AutoHeightWebView
              style={{width: this.state.webviewWidth}}
              source={{ html: this.state.description }}
              scrollEnabled={false}
            />

            <Text style={{fontWeight:'500',fontSize:16,marginVertical:15}}>List Donatur</Text>

            <FlatList
              style={{ marginBottom:this.state.showAllDonationsText ? 0:45 }}
              data={this.state.get_donations.slice(0, 4)}
              renderItem={({item}) => this.renderDonatorList(item)}
            />

            {this.state.showAllDonationsText &&
              <View style={styles.showAllDonationsWrapper}>
                <TouchableOpacity onPress={() => this.setState({modalVisible:true})}>
                  <Text style={styles.redLink}>Lihat Semua</Text>
                </TouchableOpacity>
              </View>
            }

            <Modal
              onShow={this.fetchDonators}
              isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setState({ modalVisible: false })}
              style={{
                marginHorizontal: 0,
              }}
              propagateSwipe={true}
            >
              <View style={styles.donatorListWrapper}>
                <Text style={{fontWeight:'500',fontSize:16,marginVertical:15}}>List Donatur</Text>
                <FlatList
                  onEndReached={this.fetchDonators}
                  onEndReachedThreshold={0.7}
                  data={this.state.donators}
                  renderItem={({item}) => this.renderDonatorList(item)}
                />
              </View>
            </Modal>
					</Container>
        </ScrollView>

        <View style={{backgroundColor: 'white', bottom: 15, paddingHorizontal:20}}>
          {!this.state.loading && <RedButton text='Berdonasi' onPress={this.navigateToDonationScreen} /> }
        </View>
      </>
    )
  }

  animate = outputRange => this.animatedHeight.interpolate({ ...extrapolation, outputRange })
}

const styles = StyleSheet.create({
  backButtonWrapper: {
    position: 'absolute',
    top: Math.round(height * (1 / 24)),
    left: 15
  },
  animatedTitleWrapper: {
    position: 'absolute',
    top: Math.round(height * (1 / 17)),
    left: 50,
    width: '100%'
  },
  animatedTitle: {
    textAlign: 'left',
    fontSize: 16,
    width: '80%'
  },
  donationProgress: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    maxHeight: 45,
  },
  label : {
    fontSize: 11,
    color: 'grey'
  },
  bold: {
    fontWeight: '500'
  },
  showAllDonationsWrapper:{
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(60, 58, 57, 0.15)',
    marginBottom: 45
  },
  redLink: {
    textAlign: 'center',
    paddingVertical: 20,
    color: Color.red,
    fontWeight: '500'
  },
  donatorListWrapper: {
    marginTop:200,
    paddingHorizontal: 15,
    backgroundColor:'white'
  }
})