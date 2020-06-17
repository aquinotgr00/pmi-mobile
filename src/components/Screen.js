import React from 'react'
import { Animated } from 'react-native'
import { Container, Content, Header, Left, Body, Right, Title } from 'native-base'
import { BackButton, MenuButton } from './HeaderButtons'
import { Loader } from 'src/components'
import CollapsingToolbar from './CollapsingToolbar'

export function Screen (props) {
  const {
    menu,
    back,
    title,
    right,
    refreshControl,
    isLoading,
    children,
    unpadded,
    verticalCenter,
    style,
    containerStyle,
    noBounce,
    headerImage,
    animatedHeight
  } = props
  const contentStyle = unpadded ? { paddingHorizontal: 15 } : { padding: 15 }
  const contentContainerStyle = verticalCenter ? { flexGrow: 1, justifyContent: 'center' } : containerStyle
  const shouldRenderHeader = !headerImage
  return (
    <Container>
      { shouldRenderHeader &&
        <Header transparent>
          <Left>
            { menu && <MenuButton /> }
            { back && <BackButton /> }
          </Left>
          <Body style={{ flex: 6 }}>
            { typeof title === 'string'
              ? <Title style={{ fontWeight: '600' }}>{title}</Title>
              : title
            }
          </Body>
          <Right>
            { right }
          </Right>
        </Header>
      }
      { headerImage &&
        <CollapsingToolbar title={title} headerImage={headerImage} animatedHeight={animatedHeight} />
      }
      <Content
        bounces={!noBounce}
        style={[contentStyle, style]}
        refreshControl={refreshControl}
        contentContainerStyle={contentContainerStyle}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: animatedHeight } } }
        ])}
      >
        {children}
      </Content>
      { isLoading && <Loader loading={isLoading} /> }
    </Container>
  )
}
