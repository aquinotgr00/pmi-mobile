import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Button
} from 'react-native'
import styles from './styles'

const CampaignCard = ({items, navigation}) => {
    const { title, image, amount_donation } = items
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Campaign', {items})}>
            <View style={styles.listItemContainer}>
                <Image
                    style={styles.campaignCardImage}
                    source={{uri:image}}
                />
                <View style={styles.listItemDetail}>
                    <Text numberOfLines={2} renderTruncatedFooter={() => '...'} style={styles.campaignCardTitle}>{title}</Text>
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
                    <TouchableOpacity style={{paddingVertical: 10}}>
                        <Text style={{color: 'red',fontWeight: '500',textAlign: 'center'}}>Berdonasi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CampaignCard