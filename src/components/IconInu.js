import React from 'react'
import { Animated } from 'react-native'

export function IconInu (props) {
  const code = {
    'icon-pmi-menu': '',
    'icon-pmi-relawan-regist': '',
    'icon-pmi-riwayat-donasi': '',
    'icon-pmi-back': '',
    'icon-add-photo': '',
    'icon-pmi-profil': '',
    'icon-pmi-donatur-regist': '',
    'icon-pmi-channel-siaga': '',
    'icon-riwayat-donasi-barang': '',
    'icon-pmi-home': '',
    'icon-pmi-laporan-darurat': '',
    'icon-riwayat-donasi-uang': ''

  }
  const { size, color } = props
  const fontSize = size || 26
  return (
    <Animated.Text style={{ fontFamily: 'fontello', fontSize, color }}>{code[props.name]}</Animated.Text>
  )
}
