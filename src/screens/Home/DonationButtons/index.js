import React from 'react'
import { View } from 'react-native'
import Image from 'src/constants/Image'
import DonationButton from './DonationButton'

export default function DonationButtons (props) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, alignSelf: 'center' }}>
      {[
        {
          image: Image.DonasiBarang,
          text: 'Donasi Barang',
          donationForm: 'InKindDonationForm'
        },
        {
          image: Image.DonasiUang,
          text: 'Donasi Uang',
          donationForm: 'FundDonation'
        }
      ].map((button, i) => (
        <DonationButton
          buttonImage={button.image}
          buttonText={button.text}
          donationForm={button.donationForm}
          key={`${i}`}
        />
      ))}
    </View>
  )
}
