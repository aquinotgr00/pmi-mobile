import React from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { Text } from 'native-base'
import Color from 'src/constants/Color'

export default function HorizontalScroller(props) {
  return (
    <>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10
      }}>
        <Text style={{ fontWeight: '500', fontSize: 17 }}>{props.title}</Text>
        <TouchableOpacity
          onPress={props.onShowMore}
          style={{ justifyContent: 'center' }}
        >
          <Text style={{ color: Color.red, fontSize: 12, fontWeight: '500' }}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      {props.isLoading
        ? <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        : <FlatList
            horizontal
            data={props.data}
            style={{ marginBottom: 25, paddingBottom: 10 }}
            keyExtractor={item => `${item.id}`}
            renderItem={props.renderItem}
          />
      }
    </>
  )
}
