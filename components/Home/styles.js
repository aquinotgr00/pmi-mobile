import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    whiteButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 11
    },
    campaignTitleList: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: .5,
    },
    campaignListContainer: {
        marginBottom: 15,
    },
    homeBanner: {
        height: 160,
        width: '100%',
        position: 'relative', // because it's parent
        borderRadius: 10
    },
    homeBannerTextContainer: {
        fontWeight: 'bold',
        position: 'absolute', // child
        bottom: 18, // position where you want
        left: 20,
    },
    homeBannerSubHeading: {
        color: 'white',
        marginBottom: 3,
        fontSize: 11
    },
    homeBannerHeading: {
        color:'white',
        fontSize:15,
        fontWeight:'bold',
        marginBottom: 8,
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