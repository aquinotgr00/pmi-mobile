import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    textRight: {
        textAlign: 'right'
    },
    listItemContainer: {
        borderRadius: 8,
        width: 275,
        marginRight: 20,
        marginBottom: 20,
        minHeight: 365,
        shadowColor: 'black',
        shadowOffset: {width:5, height:8},
        shadowOpacity: .03
    },
    listItemDetail: {
        paddingHorizontal:25,
        paddingTop:15,
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
        marginBottom: 20,
        minHeight: 35
    },
    campaignCardImage: {
        width: 275,
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
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
        fontWeight: 'bold'
    },
    campaignCardMuteText: {
        fontSize: 11,
        color: '#696969',
        width: '50%'
    }
})

export default styles