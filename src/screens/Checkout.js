import React, { Component } from 'react'
import { Form, Item, Input, Label } from 'native-base'
import { RedButton, Screen } from 'src/components'
import PaymentGateway from 'react-native-payment-gateway'
import Config from 'react-native-config'

export default class Checkout extends Component {
  constructor (props) {
    super(props)

    this.pay = this.pay.bind(this)
  }

  pay () {
    const { navigation } = this.props
    const donation = navigation.getParam('donation')
    const { name: fullName, email, phone: phoneNumber, amount } = donation
    const optionConect = {
      clientKey: Config.MIDTRANS_CLIENT_KEY,
      urlMerchant: Config.SERVER_URL,
      sandbox: true
    }

    const transRequest = {
      transactionId: btoa(Math.random()).slice(0, 5),
      totalAmount: donation.amount
    }

    const itemDetails = [
      { id: 'PMI', price: donation.amount, qty: 1, name: 'Donasi PMI' }
    ]

    const creditCardOptions = {
      saveCard: false,
      saveToken: false,
      paymentMode: 'Normal',
      secure: false
    }

    const userDetail = {
      fullName,
      email,
      phoneNumber,
      userId: 'U01',
      address: '-',
      city: '-',
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
    const { navigation } = this.props
    const donation = navigation.getParam('donation')
    console.log(donation)
    return (
      <Screen title='Konfirmasi Donasi' back>
        <Form>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input disabled value={donation.name} />
          </Item>
          <Item stackedLabel>
            <Label>Email</Label>
            <Input disabled value={donation.email} />
          </Item>
          <Item stackedLabel>
            <Label>Phone</Label>
            <Input disabled value={donation.phone} />
          </Item>
          <Item stackedLabel>
            <Label>Amount</Label>
            <Input disabled value={`${donation.amount}`} />
          </Item>
        </Form>
        <RedButton text='Lanjutkan Pembayaran' onPress={this.pay} style={{ marginTop: 40 }} />
      </Screen>
    )
  }
}
