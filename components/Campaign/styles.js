import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    textRight: {
        textAlign: 'right'
    },
    progressBar: {
        // position: 'relative',
        height: 10,
        width: '100%',
        borderRadius: 50,
        backgroundColor: 'pink',
        marginBottom: 20
    },
    filler: {
        backgroundColor: 'red',
        height: '100%',
        width: '50%',
        borderRadius: 50,
    },
    campaignCardBoldText: {
        width: '50%',
        fontWeight: '500'
    },
    campaignCardMuteText: {
        fontSize: 11,
        color: '#696969',
        width: '50%'
    }
})

export default styles