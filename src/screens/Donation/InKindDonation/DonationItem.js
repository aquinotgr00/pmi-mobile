import React from 'react'
import { View } from 'react-native'
import { Button, Input, Text } from 'native-base'
import { connect } from 'formik'
import { FormField, FormInput } from 'src/components'
import Color from 'src/constants/Color'

class DonationItem extends React.Component {
  constructor (props) {
    super(props)

    this.removeItem = this.removeItem.bind(this)
  }

  removeItem () {
    this.props.onRemove(this.props.itemId)
  }

  render () {
    const { itemId, item } = this.props
    const { type, name, amount } = item
    return (
      <View style={{ borderRadius: 10, borderWidth: 1, borderColor: Color.lightGray, padding: 5, marginVertical: 10 }}>
        <FormField label='Jenis'>
          <FormInput
            autoCapitalize='none'
            name={`items[${itemId}].type`}
            value={type}
          />
        </FormField>
        <FormField label='Nama'>
          <FormInput
            autoCapitalize='none'
            name={`items[${itemId}].name`}
            value={name}
          />
        </FormField>
        <FormField label='Jumlah'>
          <FormInput
            autoCapitalize='none'
            name={`items[${itemId}].amount`}
            value={amount}
          />
        </FormField>
        <Button small transparent full onPress={this.removeItem}>
          <Text style={{ color: Color.red }}>Hapus</Text>
        </Button>
      </View>
    )
  }
}

export default connect(DonationItem)
