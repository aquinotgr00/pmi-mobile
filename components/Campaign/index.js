import React, { PureComponent } from 'react'
import {
    Text
} from 'react-native'
import styles from './styles'

export default class Campaign extends PureComponent {
    static navigationOptions = {
        headerTitle: 'Detail'
    }
    render() {
        return (
            <Text>Campaign Detail</Text>
        )
    }
}