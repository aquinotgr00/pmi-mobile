import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'

import AppLogo from '../AppLogo'
import axios from 'axios'
import styles from './styles'
import CampaignCard from '../CampaignCard'

export default class Home extends PureComponent {
  state = {
    bulanDana: [],
    generalCampaign: [],
    specialCampaign: [],
    loading: true,
    search: ''
  }
  
  static navigationOptions = {
    headerTitle: (
      <View style={{flex: 1}}>
        <AppLogo />
      </View>
    ),
    headerStyle: {
      marginBottom: 10,
      borderBottomWidth: 0
    }
  }

  handleSearch = (value) => {
    console.log(value)
  }

  async componentDidMount() {
    const bulanDanaUri = 'http://773b14c2.ngrok.io/api/app/campaigns?t=3'
    const generalCampaignUri = 'http://773b14c2.ngrok.io/api/app/campaigns?t=1'
    const specialCampaignUri = 'http://773b14c2.ngrok.io/api/app/campaigns?t=2'
    try {
      const bulanDana = await axios.get(bulanDanaUri)
      const generalCampaign = await axios.get(generalCampaignUri)
      const specialCampaign = await axios.get(specialCampaignUri)
      this.setState({
        bulanDana: bulanDana.data.data.data.slice(0, 3),
        generalCampaign: generalCampaign.data.data.data.slice(0, 3),
        specialCampaign: specialCampaign.data.data.data.slice(0, 3),
        loading: false
      })
    } catch(err) {
      console.log('Error fetching data---------------', err)
    }
  }

  render() {
    const { bulanDana, generalCampaign, specialCampaign, loading } = this.state
    const { navigation } = this.props
    
    return (
      <View style={{marginHorizontal:15, marginBottom: 10}}>
        <ScrollView>
          <View style={{flex:1, flexDirection:'row',marginBottom:15}}>
            <Text style={[styles.campaignTitleList, {width: '50%'}]}>Donasi Umum</Text>
            <TouchableOpacity style={{width: '50%'}} onPress={() => navigation.navigate('CampaignList', {param: 'donasi-umum'})}>
              <Text style={{textAlign: 'right',color: 'red',fontSize: 13,fontWeight: '600'}}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          {loading
            ? <ActivityIndicator />
            : <FlatList
                style={styles.campaignListContainer}
                horizontal={true}
                data={generalCampaign}
                renderItem={(data) => <CampaignCard items={data.item} navigation={navigation} />}
                keyExtractor={(item) => item.title}
              />
          }

          <View style={{flex:1, flexDirection:'row',marginBottom:15}}>
            <Text style={[styles.campaignTitleList, {width: '50%'}]}>Donasi Khusus</Text>
            <TouchableOpacity style={{width: '50%'}}>
              <Text style={{textAlign: 'right',color: 'red',fontSize: 13,fontWeight: '600'}}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          {loading
            ? <ActivityIndicator />
            : <FlatList
                style={styles.campaignListContainer}
                horizontal={true}
                data={specialCampaign}
                renderItem={(data) => <CampaignCard items={data.item} navigation={navigation} />}
                keyExtractor={(item) => item.title}
              />
          }

          <View style={{marginBottom:40}}>
            <ImageBackground
              source={{ uri: 'https://via.placeholder.com/350x160' }}
              imageStyle={{borderRadius:5}}
              style={styles.homeBanner}
            >
              <View style={styles.homeBannerTextContainer}>
                <Text style={styles.homeBannerSubHeading}>
                  Bersama kita bantu sesama
                </Text>
                <Text style={styles.homeBannerHeading}>
                  Daftar menjadi relawan PMI sekarang!
                </Text>
                <TouchableOpacity style={styles.homeBannerButton}>
                  <Text style={styles.whiteButtonText}>DAFTAR SEKARANG</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={{flex:1, flexDirection:'row',marginBottom:15}}>
            <Text style={[styles.campaignTitleList, {width: '50%'}]}>Bulan Dana</Text>
            <TouchableOpacity style={{width: '50%'}}>
              <Text style={{textAlign: 'right',color: 'red',fontSize: 13,fontWeight: '600'}}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          {loading
            ? <ActivityIndicator />
            : <FlatList
                style={styles.campaignListContainer}
                horizontal={true}
                data={bulanDana}
                renderItem={(data) => <CampaignCard items={data.item} navigation={navigation} />}
                keyExtractor={(item) => item.title}
              />
          }
        </ScrollView>
      </View>
    )
  }
}