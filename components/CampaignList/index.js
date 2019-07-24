import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  Button,
  ImageBackground,
  ActivityIndicator
} from 'react-native'

import LogoTitle from '../AppLogo'
import axios from 'axios'
import styles from './styles'
import CampaignCard from '../CampaignCard'
import { TouchableOpacity } from 'react-native'

export default class CampaignList extends PureComponent {
  state = {
    bulanDana: [],
    generalCampaign: [],
    specialCampaign: [],
    loading: true
  }
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      // backgroundColor: 'pink',
      borderBottomWidth: 0
    }
  }

  async componentDidMount() {
    const bulanDanaUri = 'http://test-donatur.test/api/app/campaigns?t=3&ob=created_at&od=desc'
    const generalCampaignUri = 'http://test-donatur.test/api/app/campaigns?t=1&ob=created_at&od=desc'
    const specialCampaignUri = 'http://test-donatur.test/api/app/campaigns?t=2&ob=created_at&od=desc'
    try {
      const bulanDana = await axios.get(bulanDanaUri)
      const generalCampaign = await axios.get(generalCampaignUri)
      const specialCampaign = await axios.get(specialCampaignUri)
      this.setState({
        bulanDana: bulanDana.data.data.data,
        generalCampaign: generalCampaign.data.data.data,
        specialCampaign: specialCampaign.data.data.data,
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
      <View style={{marginLeft:15}}>
        <ScrollView>
          <Text style={styles.campaignTitleList}>Donasi Umum</Text>
          {loading
            ? <ActivityIndicator />
            : <FlatList
                style={styles.campaignListContainer}
                horizontal={true}
                data={generalCampaign}
                renderItem={(data) => <CampaignCard {...data.item} navigation={navigation} />}
                keyExtractor={(item) => item.title}
              />
          }

          <Text style={styles.campaignTitleList}>Donasi Khusus</Text>
          {loading
            ? <ActivityIndicator />
            : <FlatList
                style={styles.campaignListContainer}
                horizontal={true}
                data={specialCampaign}
                renderItem={(data) => <CampaignCard {...data.item} navigation={navigation} />}
                keyExtractor={(item) => item.title}
              />
          }

          <View>
            <ImageBackground
              source={{ uri: 'https://via.placeholder.com/350' }}
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

          <Text style={styles.campaignTitleList}>Bulan Dana</Text>
          {loading
            ? <ActivityIndicator />
            : <FlatList
                style={styles.campaignListContainer}
                horizontal={true}
                data={bulanDana}
                renderItem={(data) => <CampaignCard {...data.item} navigation={navigation} />}
                keyExtractor={(item) => item.title}
              />
          }
        </ScrollView>
      </View>
    )
  }
}