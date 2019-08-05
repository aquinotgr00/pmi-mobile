import React from 'react'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Button, CheckBox, Icon, Input, Picker, Text } from 'native-base'
import { Formik, FieldArray } from 'formik'
import { FormField, FormSectionTitle, RedButton, Screen } from 'src/components'
import { getCampaignDetail, storeFundDonation } from 'src/services/api'
import Color from 'src/constants/Color'

class InKindDonationFormScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (values) {
    console.log(values)
    const { campaignId: campaign_id, name, email, phone, deliveryMethod: pick_method, anonym, items: donation_items } = values
    try {
      this.setState({ isLoading: true })
      const response = await storeFundDonation({ campaign_id, name, email, phone, pick_method, anonym, donation_items, category: 1, amount: 0 })
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
    const campaignId = navigation.getParam('id', '1')
    return (
      <Screen title='Berdonasi Barang' back>
        <Formik
          initialValues={{ campaignId, name: '', email: '', phone: '', deliveryMethod: '', anonym: false, items: [] }}
          onSubmit={this.handleFormSubmit}
        >
          {props => (
            <View style={{ paddingBottom: 30 }}>
              <FormSectionTitle text='Informasi Donasi' />
              <FormField label='Nama'>
                <Input
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                  autoCapitalize='words'
                />
              </FormField>
              <FormField label='Email'>
                <Input
                  keyboardType='email-address'
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  autoCapitalize='none'
                />
              </FormField>
              <FormField label='Nomor HP'>
                <Input
                  keyboardType='phone-pad'
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={props.values.phone}
                />
              </FormField>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='arrow-down' />}
                placeholder='Metode Penyerahan'
                placeholderStyle={{ color: Color.darkGray, paddingLeft: 2 }}
                placeholderIconColor='#007aff'
                style={{ marginVertical: 15, width: undefined, borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                onValueChange={props.handleChange('deliveryMethod')}
                selectedValue={props.values.deliveryMethod}
              >
                <Picker.Item label='Barang dikirim' value='Kirim' />
                <Picker.Item label='Barang diantar' value='Antar' />
              </Picker>
              <FormSectionTitle text='Barang Donasi' />
              <FieldArray
                name='items'
                render={arrayHelpers => (
                  <View>
                    { props.values.items.map((item, index) => (
                      <DonationItem
                        formikProps={props}
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
              <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                <CheckBox
                  checked={props.values.anonym}
                  color={Color.red}
                  style={{ borderRadius: 3 }}
                  onPress={() => props.setFieldValue('anonym', !props.values.anonym)}
                />
                <TouchableWithoutFeedback onPress={() => props.setFieldValue('anonym', !props.values.anonym)}>
                  <Text style={{ marginLeft: 20, paddingVertical: 10 }}>Sembunyikan nama saya (Anonim)</Text>
                </TouchableWithoutFeedback>
              </View>
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

class DonationItem extends React.Component {
  constructor (props) {
    super(props)

    this.removeItem = this.removeItem.bind(this)
  }

  removeItem () {
    this.props.onRemove(this.props.itemId)
  }

  render () {
    const { itemId, formikProps } = this.props
    const { handleBlur, handleChange, values } = formikProps
    const { items } = values
    return (
      <View style={{ borderRadius: 10, borderWidth: 1, borderColor: Color.lightGray, padding: 5, marginVertical: 10 }}>
        <FormField label='Jenis'>
          <Input
            onChangeText={handleChange(`items[${itemId}].type`)}
            onBlur={handleBlur(`items[${itemId}].type`)}
            value={items[itemId].type}
            autoCapitalize='none'
          />
        </FormField>
        <FormField label='Nama'>
          <Input
            onChangeText={handleChange(`items[${itemId}].name`)}
            onBlur={handleBlur(`items[${itemId}].name`)}
            value={items[itemId].name}
            autoCapitalize='none'
          />
        </FormField>
        <FormField label='Jumlah'>
          <Input
            keyboardType='number-pad'
            onChangeText={handleChange(`items[${itemId}].amount`)}
            onBlur={handleBlur(`items[${itemId}].amount`)}
            value={items[itemId].amount}
          />
        </FormField>
        <Button small transparent full onPress={this.removeItem}>
          <Text style={{ color: Color.red }}>Hapus</Text>
        </Button>
      </View>
    )
  }
}
