import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from 'native-base';
import { Screen } from 'src/components'

export default class ThankYouScreen extends React.Component {
	state = {
		title: 'Berdonasi Uang'
	}

	render () {
		return (
			<Screen title={this.state.title}>
				<View styles={styles.container}>
					<View style={styles.imageWrapper}>
						<Image
							source={require('assets/images/terima-kasih.png')}
							style={styles.image}
						/>
					</View>
					<View style={styles.textWrapper}>
						<Text style={styles.heading}>Terima kasih Sudah Melakukan Donasi</Text>
						<Text style={styles.paragraph}>Bersama kita ringankan beban mereka agar memiliki kehidupan yang lebih baik.</Text>
					</View>
					<View style={styles.buttonWrapper}>
						<Button
							rounded
							onPress={() => this.props.navigation.navigate('Home')}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Kembali Ke Beranda</Text>
						</Button>
					</View>
				</View>
			</Screen>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	imageWrapper: {
		alignContent: 'center',
		alignItems: 'center',
		alignSelf:'center',
		marginTop: 40,
		height: Math.round(Dimensions.get('window').height*(1/4)),
	},
	textWrapper: {
		height: Math.round(Dimensions.get('window').height*(3/9)),
	},
	buttonWrapper: {
		alignContent: 'flex-end',
		height: 100
	},
	image: {
		resizeMode: 'contain',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf:'center'
	},
	heading: {
		textAlign: 'center',
		fontWeight: '500',
		fontSize: 17,
		marginBottom: 15
	},
	paragraph: {
		paddingHorizontal:25,
		textAlign: 'center'
	},
	button: {
		backgroundColor: 'red',
	},
	buttonText: {
		width: '100%',
		fontSize: 17,
		fontWeight: '600',
		color: 'white',
		textAlign: 'center'
	},
})