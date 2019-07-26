import React from 'react'
import { Text } from 'react-native'

export default class CampaignList extends React.PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('param'),
            headerTintColor: 'black',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }
    }

    render() {
        return (
            <Text>CampaignList By Category</Text>
        )
    }
}