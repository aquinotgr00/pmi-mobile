import React from 'react'
import { Image } from 'react-native'

class AppLogo extends React.PureComponent {
    render() {
        return (
            <Image
                source={require('../assets/images/logo-pmi-splash-2x.png')}
                style={{
                    width: 180,
                    height: 40,
                    resizeMode: 'contain',
                    alignSelf: 'center'
                }}
            />
        )
    }
}

export default AppLogo