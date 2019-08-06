import React from 'react'
import { View } from 'react-native'
import { Button, Input, Text } from 'native-base'
import { connect } from 'formik'
import { FormField } from 'src/components'
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
    const { itemId, formik } = this.props
    const { handleBlur, handleChange, values } = formik
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

export default connect(DonationItem)
