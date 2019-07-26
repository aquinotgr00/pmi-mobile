import { Text } from 'react-native'

export function DrawerIcon (props) {
  return (
    <Text style={{ fontFamily: 'fontello', color: props.tintColor }}>{props.icon}</Text>
  )
}
