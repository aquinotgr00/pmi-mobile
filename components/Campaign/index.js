import React, { PureComponent } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    Animated,
    StatusBar,
    StyleSheet
} from 'react-native'
import ImageHeader from './ImageHeader'
import styles from './styles'
import CollapsibleToolbar from 'react-native-collapsible-toolbar'

const Header_Maximum_Height = 200;
//Max Height of the Header
const Header_Minimum_Height = 60;
//Min Height of the Header

export default class Campaign extends PureComponent {
    constructor(props) {
        super(props)

        this.AnimatedHeaderValue = new Animated.Value(0)
        // this.AnimateHeaderOpacity = this.AnimatedHeaderValue.interpolate({
        //     inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
        //     outputRange: [0, 1],
        //     extrapolate: 'clamp',
        // })
        // this.AnimateHeaderFadeBackgroundOut = this.AnimatedHeaderValue.interpolate({
        //     inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
        //     outputRange: [1, 0],
        //     extrapolate: 'clamp',
        // })
        // this.AnimateHeaderLeftButtonMargin = this.AnimatedHeaderValue.interpolate({
        //     inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
        //     outputRange: [115, 0],
        //     extrapolate: 'clamp',
        // })
        // this.AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
        //     inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
        //     outputRange: [Header_Maximum_Height, Header_Minimum_Height],
        //     extrapolate: 'clamp',
        // })
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
        }
    }

    static navigationOptions = ({navigation}) => {
        // const { AnimateHeaderOpacity, AnimateHeaderHeight, AnimateHeaderFadeBackgroundOut, AnimateHeaderLeftButtonMargin} = navigation.state.params
        return {
            header: null
            // headerTitle: <AnimatedHeader params={{AnimateHeaderOpacity, AnimateHeaderHeight}} />,
            // headerBackground: <ImageHeader />,
            // headerBackground: (
            //     <View style={{width:'100%', height:'100%', backgroundColor: 'red'}}>
            //     <Image
            //         source={{uri: 'https://via.placeholder.com/350'}}
            //         style={[StyleSheet.absoluteFill]}
            //     /></View>
            // ),
            // title: 'Detail Campaign',
            // headerTitleStyle: {
            //     color: 'black',
            //     opacity: AnimateHeaderOpacity
            // },
            // headerTitleContainerStyle: {
                // backgroundColor: 'red',
            // },
            // headerStyle: {
            //     height: AnimateHeaderHeight,
            //     backgroundColor: 'red',
            //     borderBottomWidth: 0
            // },
            // headerLeftContainerStyle: {
            //     marginLeft: 15,
            //     height: AnimateHeaderLeftButtonMargin
            // }
        }
    }

    renderNavBar = () => {
        const AnimateHeaderOpacity = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
            outputRange: ['red', 'white'],
            extrapolate: 'clamp',
        })
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                {/* <NavBackButton title='' /> */}
                <Text style={{ textAlign: 'center', color: '#000' }}>Title</Text>
            </View>
        )
    }

    renderContent = () => {
        const { navigation } = this.props
        const {
            title,
            description,
            amount_real,
            closed,
            get_donations
        } = navigation.getParam('items')

        return (
        <View style={{
            marginHorizontal: 20,
            marginBottom: 300
        }}>
            <Text style={{marginVertical:25}}>{title}</Text>
            <View style={[styles.progressBar, {height: 13,marginBottom: 25}]}>
                <View style={styles.filler} />
            </View>
            <View style={{flex: 1}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 15,
                }}>
                    <Text style={[styles.campaignCardMuteText]}>Terkumpul</Text>
                    <Text style={[styles.campaignCardMuteText, styles.textRight]}>Sisa Hari</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 20,
                }}>
                    <Text style={[styles.campaignCardBoldText]}>Rp. {amount_real ? amount_real:'0'}</Text>
                    <Text style={[styles.campaignCardBoldText, styles.textRight]}>{closed}</Text>
                </View>
                <Text style={{marginTop: 20}}>{description}</Text>
                <Text style={{marginTop: 30,fontSize: 16,fontWeight: '500'}}>List Donatur</Text>
                <TouchableOpacity style={{
                    marginTop: 15,
                    marginBottom: 10,
                    backgroundColor: 'red',
                    paddingVertical: 15,
                    borderRadius: 30
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '500'
                    }}>Berdonasi</Text>
                </TouchableOpacity>
                <FlatList
                    data={get_donations}
                    renderItem={({item}) => (
                        <View style={{flex: 1,flexDirection: 'row',marginVertical: 15}}>
                            <Image style={{width: 50,height: 50,borderRadius: 40}} source={{uri: item.image}} />
                            <View style={{marginLeft: 15}}>
                                <View style={{flex: 1,flexDirection: 'row',marginBottom: 10}}>
                                    <Text style={{width: '42%',fontSize: 16}}>{item.name}</Text>
                                    <Text style={{width: '50%',fontSize: 11,color: 'grey',textAlign: 'right'}}>2.16 PM</Text>
                                </View>
                                <Text style={{fontSize: 11,color: 'grey'}}>Jumlah Donasi</Text>
                                <Text style={{fontSize: 16,fontWeight: '500'}}>Rp. {item.amount}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
        )
    }

    render() {
        const { image } = this.props.navigation.getParam('items')
        return (
            // <ScrollView style={{flex: 1}}
            //     scrollEventThrottle={16}
            //     onScroll={Animated.event([
            //             { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } },
            //         ],
            //     )}
            // >
            <CollapsibleToolbar
                renderContent={this.renderContent}
                renderNavBar={this.renderNavBar}
                imageSource={image}
                collapsedNavBarBackgroundColor='#fff'
                translucentStatusBar
                showsVerticalScrollIndicator={false}
                toolBarHeight={200}
            />
            //</ScrollView>
        )
    }
}