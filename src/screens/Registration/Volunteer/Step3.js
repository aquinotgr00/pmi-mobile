import React from 'react'
import { Image, ActivityIndicator } from 'react-native'
import { IconInu } from 'src/components'
import { View, Button, Text } from 'native-base'
import Wizard from './Wizard'
import Color from 'src/constants/Color'

function Step2 (props) {
	return (
		<Wizard.Page>
			
			{props.photo === null
			? props.loading
				? <ActivityIndicator />
				: <Button transparent style={{
						backgroundColor: Color.pink,
						height:'auto',
						alignSelf: 'center',
						marginBottom: 20,
						padding: 40,
						height: 155,
						borderRadius: 150,
					}} onPress={props.handleChoosePhoto}>
						<IconInu color='red' name='icon-add-photo' size={65} />
					</Button>
			:
				<Image
					style={{
						width: '100%',
						height: 200,
					}}
					source={{ uri: props.photo.uri }}
				/>
			}

			<View style={{ textAlign: 'center', padding: 10 }}>
				<Text style={{ textAlign: 'center', color: Color.darkGray }}>
					Upload foto diri kamu untuk mempermudah kami dalam mengenali kamu.
				</Text>
			</View>
		</Wizard.Page>
	)
}

export default Step2