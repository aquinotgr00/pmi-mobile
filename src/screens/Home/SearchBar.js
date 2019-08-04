import React from 'react'
import { Button, Icon, Text } from 'native-base'
import { withNavigation } from 'react-navigation'
import Color from 'src/constants/Color'

function SearchBar (props) {
  return (
    <Button
      small
      iconLeft
      rounded
      bordered
      style={{ borderColor: Color.lightGray, justifyContent: 'flex-start', marginBottom: 20 }}
      onPress={() => props.navigation.navigate('SearchCampaign')}
    >
      <Icon name='search' style={{ color: Color.lightGray }} />
      <Text style={{ color: Color.lightGray }}>Cari Donasi</Text>
    </Button>
  )
}

export default withNavigation(SearchBar)
