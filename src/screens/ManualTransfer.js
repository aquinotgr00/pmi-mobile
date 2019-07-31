import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Card, CardItem, Body, Thumbnail, Left, Button } from 'native-base'
import { Screen } from 'src/components'
import { uploadProofApi } from 'src/services/api'
import axios from 'axios'
import ImagePicker from 'react-native-image-picker'
import { IconInu } from 'src/components'

export default class ManualTransferScreen extends React.Component {
	static navigationOptions = {
		gesturesEnabled: false
	}

	state = {
		title: 'Manual Transfer',
    photo: null,
    // id: this.props.navigation.state.params.id,
    id:17
  }
  
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

	handleUpload = async () => {
    try {
      const response = await uploadProofApi({id:this.state.id,image:this.state.photo})
      this.props.navigation.navigate('ThankYou')
    } catch (err) {
      console.log(err)      
    }
	}

	render () {
		return (
			<Screen title={this.state.title}>
				<Text style={styles.heading}>Informasi Transfer</Text>
				<Text style={styles.desc}>Silahkan melakukan transfer dengan rekening tujuan dibawah ini:</Text>
				<View style={styles.bankContainer}>
					<Card style={styles.bankCard}>
            <CardItem header style={styles.bankCardHeader}>
							<Left>
                <Thumbnail style={styles.bankIcon} source={require('assets/images/mandiri.png')} />
                <Body>
									<Text style={{fontSize: 15}}>Bank Mandiri</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={styles.bankCardBody}>
              <Body>
								<View style={styles.flexRow}>
									<Text style={styles.textMute}>Nomor Rekening</Text>
									<Text style={[styles.textMute, {textAlign: 'right'}]}>Atas Nama</Text>
								</View>
								<View style={styles.flexRow}>
									<Text style={styles.textBold}>123 001709 1945</Text>
									<Text style={[styles.textBold, {textAlign: 'right'}]}>PMI DKI JAKARTA</Text>
								</View>
              </Body>
            </CardItem>
         </Card>
					<Card style={styles.bankCard}>
            <CardItem header style={styles.bankCardHeader}>
							<Left>
                <Thumbnail style={styles.bankIcon} source={require('assets/images/bca.png')} />
                <Body>
									<Text style={{fontSize: 15}}>BCA</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={styles.bankCardBody}>
              <Body>
								<View style={styles.flexRow}>
									<Text style={styles.textMute}>Nomor Rekening</Text>
									<Text style={[styles.textMute, {textAlign: 'right'}]}>Atas Nama</Text>
								</View>
								<View style={styles.flexRow}>
									<Text style={styles.textBold}>2063 8179 45</Text>
									<Text style={[styles.textBold, {textAlign: 'right'}]}>PMI DKI JAKARTA</Text>
								</View>
              </Body>
            </CardItem>
         </Card>
					<Card style={styles.bankCard}>
            <CardItem header style={styles.bankCardHeader}>
							<Left>
                <Thumbnail style={styles.bankIcon} source={require('assets/images/cimb.png')} />
                <Body>
									<Text style={{fontSize: 15}}>CIMB NIAGA</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={styles.bankCardBody}>
              <Body>
								<View style={styles.flexRow}>
									<Text style={styles.textMute}>Nomor Rekening</Text>
									<Text style={[styles.textMute, {textAlign: 'right'}]}>Atas Nama</Text>
								</View>
								<View style={styles.flexRow}>
									<Text style={styles.textBold}>800069514600</Text>
									<Text style={[styles.textBold, {textAlign: 'right'}]}>PMI DKI JAKARTA</Text>
								</View>
              </Body>
            </CardItem>
         </Card>
				</View>
				<Text style={styles.desc}>Jika anda mengirimkan lebih dari 1 donasi, jangan melakukan transfer dengan menggabungkan	total nilai donasi tersebut. Lakukan transfer terpisah untuk tiap-tiap donasi.</Text>
				<Text style={styles.heading}>Sudah Melakukan Transfer?</Text>
        <Text style={styles.desc}>Silahkan upload bukti transfer dibawah ini.</Text>
        <View style={{backgroundColor:'pink',alignItems:'center', paddingVertical: this.state.photo === null ? 30:0, marginBottom: 30}}>
          {this.state.photo === null
          ?  <Button transparent style={{height:'auto'}} onPress={this.handleChoosePhoto}>
              <IconInu color='red' name='icon-add-photo' size={55} />
            </Button>
          :
            <Image
              style={{
                width: '100%',
                height: 200,
              }}
              source={{ uri: this.state.photo.uri }}
            />
          }
        </View>
				<Button rounded disabled={this.state.photo === null ? true:false} style={[styles.button, {backgroundColor: this.state.photo === null ?'grey':'red'}]} onPress={this.handleUpload}>
					<Text style={styles.textButton}>Konfirmasi Donasi</Text>
				</Button>
        <View style={{marginBottom:70}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={{textAlign:'center',color:'red'}}>Lihat Riwayat Donasi</Text>
          </TouchableOpacity>
        </View>
			</Screen>
		)
	}
}

const styles = StyleSheet.create({
	heading: {
		fontWeight: '600',
		fontSize: 17,
		marginBottom: 25
	},
	desc: {
		marginBottom: 25,
		opacity: .7
	},
	bankContainer: {
		marginBottom: 10
	},
	bankCard: {
		borderRadius: 5,
		marginBottom: 20
	},
	bankIcon: {
		borderRadius: 0,
		height: 25,
		resizeMode: 'contain'
	},
	bankCardHeader: {
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		marginTop: 3,
		marginBottom: 0
	},
	bankCardBody: {
		paddingTop: 0,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5
	},
	flexRow: {
		flex: 1,
		flexDirection: 'row'
	},
	textMute: {
		width: '50%',
		fontSize: 11,
		opacity: .4,
		marginBottom: 5
	},
	textBold: {
		width: '50%',
		fontWeight: '500',
		marginBottom: 10
	},
	button: {
		marginBottom: 30
	},
	textButton: {
		width: '100%',
		textAlign: 'center',
		color: 'white',
		fontWeight: '600',
		fontSize: 16,
	}
})