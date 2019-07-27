import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    textRight: {
        textAlign: 'right'
    },
    listItemContainer: {
        borderRadius: 6,
        width: 245,
        marginRight: 20,
        minHeight: 355,
        shadowColor: 'black',
        shadowOffset: {width:5, height:8},
        shadowOpacity: .04
    },
    listItemDetail: {
        paddingHorizontal:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    progressBar: {
        position: 'relative',
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
    campaignCardTitle: {
        marginBottom: 13,
        lineHeight: 20,
        minHeight: 40
    },
    campaignCardImage: {
        width: 245,
        height: 135,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    campaignCardHr: {
        borderBottomColor: '#d3d3d3',
        marginTop: 20,
        marginBottom: 7,
        borderBottomWidth: 1,
        opacity: .4
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