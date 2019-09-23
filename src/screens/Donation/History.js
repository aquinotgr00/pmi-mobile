import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { IconInu, Screen } from 'src/components'
import { getDonatorProfileApi } from 'src/services/api'
import { Card, CardItem, Thumbnail, Body } from 'native-base'
import moment from 'moment'
import Color from 'src/constants/Color'

export default class History extends Component {
  static navigationOptions = {
    drawerLabel: 'Riwayat Donasi',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-riwayat-donasi' color={tintColor} />
    ),
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      donations: [],
    }

    this.getProfile = this.getProfile.bind(this)
    this.renderHistoryList = this.renderHistoryList.bind(this)
  }

  componentDidMount () {
    this.getProfile()
  }

  getProfile = async () => {
    try {
      const response = await getDonatorProfileApi()
      const { status, data } = response.data
      if (status === 'success') {
        this.setState({donations: data.donations})
      }
    } catch (err) {
      console.log(err.response)
    }
    this.setState({isLoading: false})
  }
  
  renderHistoryList = item => {
    let bgColor
    if (item.campaign.fundraising === 1) {
      bgColor =  Color.red
    } else if (item.campaign.fundraising === 0) {
      bgColor =  Color.brown
    }
    if (item.status === 4) {
      bgColor = Color.lightGray
    }
    return (
      <Card transparent>
        <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
          <View style={{
            backgroundColor: bgColor,
            padding: 15,
            borderRadius: 40}}
          >
            <IconInu
              name={`icon-riwayat-donasi-${item.campaign.fundraising === 1 ? 'uang':'barang'}`}
              color='white'
              size={32}
            />
          </View>
          <Body style={{ marginLeft: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 1 }} numberOfLines={3}>{item.campaign.title}</Text>
              <Text style={{ flex: 1, textAlign: 'right', color: 'grey', fontSize: 11 }}>{moment(item.created_at).format('DD MMM, hh:mm A')}</Text>
            </View>
            <Text style={{ color: 'grey', fontSize: 11 }}>{item.status_text}</Text>
            <Text note>Rp. {item.amount}</Text>
          </Body>
        </CardItem>
      </Card>
    )
  }

  render() {
    return (
      <Screen
        menu
        title='Riwayat Donasi'
        isLoading={this.state.isLoading}
      >
        <FlatList
          style={{ marginBottom:45 }}
          data={this.state.donations}
          renderItem={({item}) => this.renderHistoryList(item)}
        />
      </Screen>
    )
  }
}
