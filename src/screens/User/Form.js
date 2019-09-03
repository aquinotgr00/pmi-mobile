import React from 'react'
import { Screen } from 'src/components'
import { Text } from 'native-base'

export function UserFormScreen (props) {
	return (
		<Screen title={props.navigation.state.params.title} back>
			<Text>User Form</Text>
		</Screen>
	)
}