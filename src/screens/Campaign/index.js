import React from 'react'
import { ProgressBar } from 'src/components'
import { Text, View, TouchableOpacity, FlatList, Animated, ScrollView, Dimensions } from 'react-native'
import { Card, CardItem, Thumbnail, Body } from 'native-base'
import { BackButton } from 'src/components/HeaderButtons'
import Axios from 'axios'
export { CampaignListScreen } from './List'

const Header_Maximum_Height = 200
const Header_Minimum_Height = Math.round(Dimensions.get('window').height * (1 / 9))

export default class CampaignScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      percentage: 80,
      lineNumber: 9,
      id: this.props.navigation.state.params.id,
      image: '',
      title: '...',
      description: 'loading...',
      amount_goal: 0,
      amount_real: 0,
      get_donations: [],
      finish_campaign: '',
      type_id: 0,
      data: [
        { key: 'a' },
        { key: 'b' },
        { key: 'c' },
        { key: 'd' },
        { key: 'e' },
        { key: 'f' },
        { key: 'g' }
      ]
    }

    this.getDetailCampaign = this.getDetailCampaign.bind(this)

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

  getDetailCampaign () {
    Axios.get('http://test-donatur.test/api/app/campaigns/' + this.state.id)
      .then(res => {
        const { image, title, description, amount_goal, amount_real, get_donations, finish_campaign, type_id } = res.data.data
        this.setState({
          image, title, description, amount_goal, amount_real, get_donations, finish_campaign, type_id
        })
      })
  }

  render () {
    return (
      <>
        <Animated.View>
          <Animated.Image
            source={{ uri: this.state.image }}
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
			      top: Math.round(Dimensions.get('window').height * (1 / 22)),
			      left: 15
			    }}>
            <BackButton color={this.animatedBackColor} />
          </TouchableOpacity>
          <Animated.View style={{
			    position: 'absolute',
			    top: Math.round(Dimensions.get('window').height * (1 / 16)),
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
          <Text style={{ marginBottom: 10 }}>{this.state.title}</Text>

          <ProgressBar left={0} height={12} width={335} percentage={this.state.percentage} />

          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 5, fontSize: 11, color: 'grey' }}>Terkumpul</Text>
              <Text style={{ fontWeight: '500' }}>Rp. {this.state.amount_real ? this.state.amount_real : 0}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ marginBottom: 5, fontSize: 11, color: 'grey' }}>Sisa Hari</Text>
              <Text style={{ fontWeight: '500' }}>-</Text>
            </View>
          </View>

          <Text numberOfLines={this.state.lineNumber} style={{ marginBottom: 20 }}>
            {this.state.description}
          </Text>

          <View style={{
			    borderTopWidth: 1,
			    borderBottomWidth: 1,
			    borderColor: 'rgba(60, 58, 57, 0.15)',
			    marginBottom: 35
			  }}>
            <Text style={{ textAlign: 'center', paddingVertical: 20, color: 'red', fontWeight: '500' }}>
						Baca Selengkapnya
            </Text>
          </View>

          <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 15 }}>List Donatur</Text>
          <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 60, paddingVertical: 15, marginBottom: 10 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Berdonasi</Text>
          </TouchableOpacity>

          <FlatList
            data={this.state.get_donations.slice(0, 4)}
            renderItem={({ item }) =>
              <Card transparent>
                <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Thumbnail source={{ uri: item.image }} />
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

          <View style={{
			    borderTopWidth: 1,
			    borderBottomWidth: 1,
			    borderColor: 'rgba(60, 58, 57, 0.15)',
			    marginBottom: 35
			  }}>
            <Text style={{ textAlign: 'center', paddingVertical: 20, color: 'red', fontWeight: '500' }}>
						Lihat Semua
            </Text>
          </View>
        </ScrollView>
      </>
    )
  }
}
