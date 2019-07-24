import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Button
} from 'react-native'
import styles from './styles'

const CampaignCard = ({title, amount_donation, navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Campaign', {title})}>
            <View style={styles.listItemContainer}>
                <Image
                    style={styles.campaignCardImage}
                    source={{uri:'https://via.placeholder.com/275x150'}}
                />
                <View style={styles.listItemDetail}>
                    <Text style={styles.campaignCardTitle}>{title}</Text>
                    <View style={styles.progressBar}>
                        <View style={styles.filler} />
                    </View>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={styles.campaignCardMuteText}>Terkumpul</Text>
                        <Text style={[styles.campaignCardMuteText, styles.textRight]}>Sisa Hari</Text>
                    </View>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={styles.campaignCardBoldText}>Rp. {amount_donation}</Text>
                        <Text style={[styles.campaignCardBoldText, styles.textRight]}>-</Text>
                    </View>
                    <View
                        style={styles.campaignCardHr}
                    />
                    <Button title='Berdonasi' color='red' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CampaignCard