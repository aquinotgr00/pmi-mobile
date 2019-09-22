import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'native-base'
import Color from 'src/constants/Color'

const HorizontalList = props => (
  <>
    {props.data.length === 0
      ? <View style={styles.emptyContainer}><Text style={{ color: Color.lightGray }}>Belum ada data</Text></View>
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

export default function HorizontalScroller (props) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        {props.data.length > 0 &&
          <TouchableOpacity onPress={props.onShowMore} style={{ justifyContent: 'center' }} >
            <Text style={styles.moreButton}>Lihat Semua</Text>
          </TouchableOpacity>
        }
      </View>
      {props.isLoading
        ? <View style={styles.emptyContainer}><ActivityIndicator /></View>
        : <HorizontalList data={props.data} renderItem={props.renderItem} />
      }
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    fontSize: 17,
    fontWeight: '500'
  },
  moreButton: {
    color: Color.red,
    fontSize: 12,
    fontWeight: '500'
  },
  emptyContainer: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
