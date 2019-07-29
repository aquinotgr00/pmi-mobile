import React, { Component } from 'react'
import { Button, Screen } from 'src/components'
import PaymentGateway from 'react-native-payment-gateway'

export default class Checkout extends Component {
  constructor (props) {
    super(props)

    this.pay = this.pay.bind(this)
  }

  pay () {
    const optionConect = {
      clientKey: 'SB-Mid-client-5cSArh5V34nHg_JD',
      urlMerchant: 'https://webapi-develop-pmi-public.blm.solutions',
      sandbox: true
    }

    const transRequest = {
      transactionId: '0001',
      totalAmount: 4000
    }

    const itemDetails = [
      { id: '001', price: 1000, qty: 4, name: 'peanuts' }
    ]

    const creditCardOptions = {
      saveCard: false,
      saveToken: false,
      paymentMode: 'Normal',
      secure: false
    }

    const userDetail = {
      fullName: 'jhon',
      email: 'jhon@payment.com',
      phoneNumber: '0850000000',
      userId: 'U01',
      address: 'street coffee',
      city: 'yogyakarta',
      country: 'IDN',
      zipCode: '59382'
    }

    const optionColorTheme = {
      primary: '#c51f1f',
      primaryDark: '#1a4794',
      secondary: '#1fce38'
    }

    const optionFont = {
      defaultText: 'open_sans_regular.ttf',
      semiBoldText: 'open_sans_semibold.ttf',
      boldText: 'open_sans_bold.ttf'
    }

    const callback = (res) => {
      console.log(res)
    }

    PaymentGateway.checkOut(
      optionConect,
      transRequest,
      itemDetails,
      creditCardOptions,
      userDetail,
      optionColorTheme,
      optionFont,
      callback
    )
  }

  render () {
    return (
      <Screen title='Konfirmasi Donasi' back>
        <Button text='Lanjutkan Pembayaran' onPress={this.pay} />
      </Screen>
    )
  }
}
