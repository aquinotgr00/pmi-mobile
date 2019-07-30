import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { Card, CardItem, Left, Right } from 'native-base'
import { ProgressBar } from 'src/components/ProgressBar'
import { daysRemaining } from 'src/utils'

export const CampaignCard = (props) => {
  const days = daysRemaining(props.item.finish_campaign)
  const { fundraising } = props.item
  return (
    <Card
      style={{
        marginRight: 15,
        marginLeft: 0,
        borderRadius: 5,
        shadowOffset: { width: 3, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 1,
        width: props.width
      }}>
      <TouchableOpacity onPress={() => props.link(props.item.id)}>
        <View style={{ borderRadius: 5 }}>
          <Image
            source={{ uri: props.item.image }}
            style={{
              width: '100%',
              height: 150,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5
            }}
          />
        </View>
        <CardItem>
          <Left style={{ paddingHorizontal: 10 }}>
            <Text numberOfLines={2} style={{ fontWeight: '500', minHeight: 30, lineHeight: 20 }}>{props.item.title}</Text>
          </Left>
        </CardItem>
        <View style={{ marginHorizontal: 25 }}>
          <ProgressBar left={20} height={10} percentage={props.item.amount_real / props.item.amount_goal * 100} />
        </View>
        <CardItem>
          <Left style={{ paddingHorizontal: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: 'grey' }}>Terkumpul</Text>
              <Text style={{ fontWeight: '500' }}>Rp. {props.item.amount_real ? props.item.amount_real : 0}</Text>
            </View>
          </Left>
          <Right style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 11, color: 'grey' }}>Sisa Hari</Text>
            <Text style={{ fontWeight: '500' }}>{isNaN(days) ? '-' : days}</Text>
          </Right>
        </CardItem>
        <CardItem style={{
          paddingTop: 0,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          marginHorizontal: 20,
          opacity: 0.1
        }} />
        <TouchableOpacity
          onPress={() => props.linkForm(props.item.id, fundraising)}
          style={{
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingVertical: 18
          }}
        >
          <Text style={{ color: 'red', textAlign: 'center', fontWeight: '500' }}>Berdonasi</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  )
}
