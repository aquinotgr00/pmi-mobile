import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Thumbnail, Left, Button } from 'native-base'
import { Screen } from 'src/components'

export default class ManualTransferScreen extends React.Component {
	state = {
		title: 'Manual Transfer'
	}

	render () {
		return (
			<Screen title={this.state.title} back>
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
				<Button rounded style={styles.button}>
					<Text style={styles.textButton}>Upload Bukti Transfer</Text>
				</Button>
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
		backgroundColor: 'red',
		marginBottom: 50
	},
	textButton: {
		width: '100%',
		textAlign: 'center',
		color: 'white',
		fontWeight: '600',
		fontSize: 16,
	}
})