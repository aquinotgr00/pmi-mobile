import React, { Component } from 'react'
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import { BackButton } from 'src/components/HeaderButtons'
import Color from 'src/constants/Color'

export default class CollapsingToolbar extends Component {
  constructor (props) {
    super(props)

    this.animate = this.animate.bind(this)
  }

  render () {
    const { headerImage: uri, title } = this.props
    return (
      <Animated.View>
        <Animated.Image
          source={{ uri }}
          style={{
            width,
            height: this.animate(range.headerHeight),
            opacity: this.animate(range.fadeOut),
            position: 'relative'
          }}
        />

        <View style={styles.backButtonWrapper}>
          <BackButton color={this.animate(range.fadeToBlack)} shadow />
        </View>

        <Animated.View style={[styles.animatedToolbarTitleWrapper, { opacity: this.animate(range.fadeIn) }]}>
          <Text numberOfLines={1} style={styles.toolbarTitle}>{title}</Text>
        </Animated.View>

        <Animated.Text
          numberOfLines={1}
          style={[styles.animatedMainTitle, {
            top: this.animate(range.titlePosition),
            opacity: this.animate(range.fadeOut)
          }]}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    )
  }

  animate (outputRange) {
    return this.props.animatedHeight.interpolate({ ...extrapolation, outputRange })
  }
}

const { height, width } = Dimensions.get('window')
const headerMaxHeight = 200
const headerMinHeight = Math.round(height * (1 / 9))
const deltaHeaderHeight = headerMaxHeight - headerMinHeight
const extrapolation = { inputRange: [0, deltaHeaderHeight], extrapolate: 'clamp' }
const range = {
  headerHeight: [headerMaxHeight, headerMinHeight],
  titlePosition: [headerMaxHeight - 40, headerMinHeight - 20],
  fadeIn: [0, 1],
  fadeOut: [1, 0],
  fadeToBlack: ['white', 'black']
}

const styles = StyleSheet.create({
  backButtonWrapper: {
    position: 'absolute',
    top: Math.round(height * (1 / 24)),
    left: 15
  },
  animatedToolbarTitleWrapper: {
    position: 'absolute',
    top: Math.round(height * (1 / 17)),
    left: 50,
    width: '100%'
  },
  animatedMainTitle: {
    position: 'absolute',
    fontSize: 20,
    left: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: 'white'
  },
  toolbarTitle: {
    textAlign: 'left',
    fontSize: 16,
    width: '80%'
  }
})
