import React from 'react'
import { Screen, CampaignList, HomeBanner } from 'src/components'
import { Image, StyleSheet, ActivityIndicator } from 'react-native'
import { getCampaignListApi } from 'src/services/api'

export default class HomeScreen extends React.Component {
  state = {
    loading: true,
    generalCampaigns: [],
    specialCampaigns: [],
    bulanDana: [],
    loading: true,
  }

  constructor(props) {
    super(props)
  
    this.getCampaignList = this.getCampaignList.bind(this)
  }

  componentDidMount () {
    this.getCampaignList(1)
    this.getCampaignList(2)
    this.getCampaignList(3)
  }

  async getCampaignList(t) {
    const campaignParams = new URLSearchParams()
    campaignParams.append('p', 1)  // published
    campaignParams.append('h', 0)  // visible
    campaignParams.append('t', t)
    try {
      const response = await getCampaignListApi(campaignParams)
      const { status } = response.data
      if(status==='success') {
        const { data } = response.data
        switch (t) {
          case 1:
            const { data:generalCampaigns } = data
            this.setState({generalCampaigns})
            break;
          case 2:
            const { data:specialCampaigns } = data
            this.setState({specialCampaigns})
            break;
          case 3:
            const { data:bulanDana } = data
            this.setState({bulanDana})
            break;
        
          default:
            break;
        }
        this.setState({ loading: false })
      }
      else {
        // TODO: handle error
      }
      
    } catch (error) {
      console.log(error);
      
      // TODO: handle error
    }
  }

  render() {

    return (
      <Screen title={<Image source={require('assets/images/logo-home.png')}/>} menu>
        {this.state.loading
        ? <ActivityIndicator />
        :
          <CampaignList
            type={1}
            title='Donasi Umum'
            data={this.state.generalCampaigns.slice(0, 3)}
            navigation={this.props.navigation}
          />
        }

        {this.state.loading
        ? <ActivityIndicator />
        :
          <CampaignList
            type={2}
            title='Donasi Khusus'
            data={this.state.specialCampaigns.slice(0, 3)}
            navigation={this.props.navigation}
          />
        }

        <HomeBanner navigation={this.props.navigation} />

        {this.state.loading
        ? <ActivityIndicator />
        :
          <CampaignList
            type={3}
            title='Bulan Dana'
            data={this.state.bulanDana.slice(0, 3)}
            navigation={this.props.navigation}
          />
        }
        
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  campaignTitleList: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: .5,
  },
})