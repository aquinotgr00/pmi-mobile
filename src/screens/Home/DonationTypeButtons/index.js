import React from 'react'
import { View } from 'react-native'
import Constant from 'src/constants/Image'
import DonationTypeButton from './DonationTypeButton'

export default function DonationTypeButtons (props) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, alignSelf: 'center' }}>
      {[
        {
          id: 0,
          image: Constant.DonasiBarang,
          text: 'Donasi Barang',
          isActive: props.activeButton === 0
        },
        {
          id: 1,
          image: Constant.DonasiUang,
          text: 'Donasi Uang',
          isActive: props.activeButton === 1
        }
      ].map((button, i) => (
        <DonationTypeButton
          buttonId={button.id}
          buttonImage={button.image}
          buttonText={button.text}
          isActive={button.isActive}
          onPress={props.onChange}
          key={`${i}`}
        />
      ))}
    </View>
  )
}
