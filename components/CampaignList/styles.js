import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    whiteButtonText: {
        color: 'white',
        textAlign: 'center'
    },
    campaignTitleList: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
        marginTop: 20,
        marginBottom: 25
    },
    campaignListContainer: {
        marginBottom: 35
    },
    homeBanner: {
        height: 200,
        width: 345,
        position: 'relative', // because it's parent
        top: 2,
        left: 2,
        borderRadius: 10
    },
    homeBannerTextContainer: {
        fontWeight: 'bold',
        position: 'absolute', // child
        bottom: 20, // position where you want
        left: 20,
    },
    homeBannerSubHeading: {
        color: 'white',
        marginBottom: 3
    },
    homeBannerHeading: {
        color:'white',
        fontSize:15,
        fontWeight:'bold',
        marginBottom: 12,
    },
    homeBannerButton: {
        borderWidth: 2,
        borderColor: 'white',
        paddingVertical: 7,
        width: 150,
        marginTop: 5,
        borderRadius: 4
    }
})

export default styles