import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import { Formik, FieldArray } from 'formik'
import { FormCheckBox, FormField, FormInput, FormSectionTitle, FormSelect, RedButton, Screen } from 'src/components'
import DonationItem from './DonationItem'
import InKindDonationSchema from 'src/validators/InKindDonation'
import { getCampaignDetail, storeFundDonation } from 'src/services/api'
import Color from 'src/constants/Color'
import CampaignPicker from 'src/screens/Donation/CampaignPicker'

class InKindDonationFormScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (values) {
    const { campaign_id, name, email, phone, deliveryMethod: pick_method, anonym, items: donation_items } = values
    try {
      this.setState({ isLoading: true })
      const response = await storeFundDonation({ campaign_id, name, email, phone, pick_method, anonym, donation_items })
      const { status } = response.data
      this.setState({ isLoading: false })
      if (status === 'success') {
        this.props.navigation.navigate('ThankYou', { title: `Metode ${values.deliveryMethod}` })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO : handle error
    }
    // const { token } = this.props.user
  }

  render () {
    const { navigation } = this.props
    const campaign_id = navigation.getParam('id', '')
    return (
      <Screen title='Berdonasi Barang' back>
        <Formik
          initialValues={{ campaign_id, name: '', email: '', phone: '', deliveryMethod: '', anonym: false, items: [] }}
          validationSchema={InKindDonationSchema}
          onSubmit={this.handleFormSubmit}
        >
          {props => (
            <View style={{ paddingBottom: 30 }}>
              <FormSectionTitle text='Informasi Donasi' />
              <CampaignPicker fundraising={false} enabled={!campaign_id} />
              <FormField label='Nama' name='name' autoCapitalize='words' />
              <FormField label='Email' name='email' keyboardType='email-address' autoCapitalize='none' />
              <FormField label='Nomor HP' name='phone' keyboardType='phone-pad' />
              <FormSelect
                placeholder='Metode Penyerahan'
                style={{ marginVertical: 15, width: undefined, borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                options={[
                  { value: 'Kirim', label: 'Barang dikirim' },
                  { value: 'Antar', label: 'Barang diantar' }
                ]}
                name='deliveryMethod'
              />

              <FormSectionTitle text='Barang Donasi' />
              <FieldArray
                name='items'
                render={arrayHelpers => (
                  <View>
                    { props.values.items.map((item, index) => (
                      <DonationItem
                        itemId={index}
                        item={item}
                        key={`${index}`}
                        onRemove={index => arrayHelpers.remove(index)}
                      />
                    ))}
                    <Button transparent full onPress={() => arrayHelpers.push({ type: '', name: '', amount: '1' })}>
                      <Text style={{ color: Color.red }}>Tambah Barang +</Text>
                    </Button>
                  </View>
                )}
              />
              <FormCheckBox
                label='Sembunyikan nama saya (Anonim)'
                style={{ marginVertical: 10 }}
                name='anonym'
              />

              { props.values.items.length > 0 &&
                <RedButton
                  onPress={props.handleSubmit}
                  text='Lanjutkan'
                  style={{ marginTop: 30 }}
                  disabled={this.state.isLoading}
                />
              }
            </View>
          )}
        </Formik>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(InKindDonationFormScreen)
